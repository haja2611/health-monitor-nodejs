const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
  },
});
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
sequelize.sync();
module.exports = { sequelize, User };
