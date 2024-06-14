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
sequelize.sync();
module.exports = { sequelize, Patient };
