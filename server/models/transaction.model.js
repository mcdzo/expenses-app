const { DataTypes } = require("sequelize");
const db = require("../db/database");
const User = require("./user.model");

const Transaction = db.define(
  "transaction",
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["income", "outcome"]],
      },
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Transaction;
