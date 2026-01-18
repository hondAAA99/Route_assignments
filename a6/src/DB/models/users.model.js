import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const Users = sequelize.define(
  "Users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        msg: "name is required feild",
      },
      hooks: {
        beforeCreate(value) {
          return value.length > 2;
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        msg: "email is required feild",
      },
      unique: true,
      validate: {
        isEmail: true ,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        msg: "password is required feild",
      },
      validate: (value) => {
        return value.length > 6;
      },
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: {
        msg: "role is required feild",
      },
      values: ["user", "admin"],
    },
  },
  {
    sequelize,
    tableName: "Users",
    paranoid : false 
  },
);

export { Users };
