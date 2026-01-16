import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const Users = sequelize.define(
  "Users",
  {
    name: {
      type: DataTypes.STRING,
      hooks: {
        beforeCreate(value) {
          return value.length > 2;
        },
      },
    },
    email: {
      type: DataTypes.INTEGER,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: (value) => {
        return value.length > 6;
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
    },
  },
  {
    tableName: "Users",
  }
);

export { Users };
