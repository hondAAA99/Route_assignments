import { DataTypes, Model } from "sequelize";
import { Users } from "./users.model.js";
import { sequelize } from "../connection.js";
import { Posts } from "./posts.model.js";

class Comments extends Model {}

Comments.init(
  {
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "comments",
    paranoid: false,
  },
);

Posts.hasMany(Comments);
Comments.belongsTo(Posts);
Users.hasMany(Comments);
Comments.belongsTo(Users);

export { Comments };
