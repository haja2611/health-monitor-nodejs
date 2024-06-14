require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models/dataModels"); // Adjust the path as needed

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const exerciseRoutes = require("./routes/exercise");
const exerciseDataRoutes = require("./routes/exerciseData");
const patientNotesRoutes = require("./routes/patientNotes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/exerciseData", exerciseDataRoutes);
app.use("/api/patientNotes", patientNotesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Sync database and load data if not already loaded
sequelize
  .sync({ force: false }) // Set to true only during development
  .then(async () => {
    console.log("Database synchronized");

    // Load data only if the table is empty
    // const count = await Data.count();
    // if (count === 0) {
    //   await insertData();
    // }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error synchronizing the database:", err));

module.exports = app;
