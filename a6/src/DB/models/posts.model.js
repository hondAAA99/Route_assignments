import { DataTypes, Model } from "sequelize";
import { Users } from "./users.model.js";

class Posts extends Model {}

Posts.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    paranoid : true ,
    modelName: "posts",
  }
);

Users.hasMany(Posts, {
  foreignKey: "userId",
});
Posts.belongsTo(Users);

export { Posts };
