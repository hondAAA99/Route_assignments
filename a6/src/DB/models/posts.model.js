import { DataTypes, Model } from "sequelize";
import { Users } from "./users.model.js";
import { sequelize } from "../connection.js";


class Posts extends Model {}

Posts.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId : DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: "posts",
    paranoid : true 
  }
);

Users.hasMany(Posts);
Posts.belongsTo(Users,{foreignKey : 'userId'});

export { Posts };
