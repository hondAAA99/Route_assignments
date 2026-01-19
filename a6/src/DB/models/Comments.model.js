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
    paranoid: true,
  },
);

Posts.hasMany(Comments, {foreignKey : 'postID'});
Comments.belongsTo(Posts, { foreignKey: "postID" });

Users.hasMany(Comments, { foreignKey: "userID" });
Comments.belongsTo(Users, { foreignKey: "userID" });

export { Comments };
