const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const Patient = sequelize.define("Patient", {
  First_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Exercise_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Created_Date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  Update_date: {
    type: DataTypes.DATE,
  },
});

const Exercise = sequelize.define("Exercise", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
  },
  Created_Date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  Update_date: {
    type: DataTypes.DATE,
  },
  Status: {
    type: DataTypes.STRING,
  },
});

const ExerciseData = sequelize.define("ExerciseData", {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: "id",
    },
  },
  hash_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exercise_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Exercise,
      key: "id",
    },
  },
  x: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  y: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  z: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const PatientNotes = sequelize.define("PatientNotes", {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: "id",
    },
  },
  exercise_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Exercise,
      key: "id",
    },
  },
  Created_Date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  Update_date: {
    type: DataTypes.DATE,
  },
  Status: {
    type: DataTypes.STRING,
  },
  Description: {
    type: DataTypes.STRING,
  },
});

sequelize.sync();

module.exports = { sequelize, Patient, Exercise, ExerciseData, PatientNotes };
