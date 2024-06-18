require("dotenv").config(); // Load environment variables from .env file
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const crypto = require("crypto");
const moment = require("moment");
const {
  sequelize,
  Patient,
  Exercise,
  Data,
  PatientNotes,
  ExerciseData,
} = require("./models/dataModels");

const insertData = async (data) => {
  try {
    const patientId = 16; // Assuming you know the patient ID
    const exerciseType = "yoga"; // Replace with actual logic to determine exercise type

    // Find or create exercise type
    let exercise = await Exercise.findOne({ where: { Name: exerciseType } });
    if (!exercise) {
      exercise = await Exercise.create({
        Name: exerciseType,
        Description: "Exercise Description",
        Created_Date: new Date(),
        Status: "active",
      });
    }
    const exerciseId = exercise.id;
    // Create PatientNote once for this exercise and patient
    await PatientNotes.create({
      patient_id: patientId,
      exercise_id: exerciseId,
      Created_Date: new Date(),
      Status: "active",
      Description: "Note description",
    });
    for (const row of data) {
      const hash_key = crypto.randomBytes(16).toString("hex");
      const { date, x, y, z } = row;

      // Convert date to ISO format
      const formattedDate = moment(date, "YYYY-MM-DD HH:mm:ss").toISOString();

      console.log(
        `patient_id: ${patientId}, exercise_id: ${exerciseId}, x: ${x}, y: ${y}, z: ${z}, date: ${formattedDate}`
      );

      // Validate fields are not null or undefined
      if (
        x === undefined ||
        y === undefined ||
        z === undefined ||
        date === undefined
      ) {
        console.error("Invalid data:", row);
        continue; // Skip this row if any field is invalid
      }

      // Insert into Data table
      await ExerciseData.create({
        patient_id: patientId,
        hash_key,
        exercise_id: exerciseId,
        x,
        y,
        z,
        date: formattedDate,
      });
    }
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  }
};

const filePath = path.join(__dirname, "./Excel/exec1.csv"); // Correct path to your CSV file

const data = [];

fs.createReadStream(filePath)
  .pipe(
    csv({
      headers: ["date", "x", "y", "z"],
      mapValues: ({ header, index, value }) => {
        if (header === "date") {
          return value.trim();
        }
        return parseFloat(value.trim());
      },
    })
  )
  .on("data", (row) => {
    // Directly use the date field as it contains both date and time
    data.push(row);
  })
  .on("end", () => {
    sequelize
      .authenticate()
      .then(() => {
        insertData(data);
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  });

module.exports = insertData;
