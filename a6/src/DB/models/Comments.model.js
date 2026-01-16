import { DataTypes, Model } from "sequelize";
import { Users } from "./users.model.js";

import { Posts } from "./posts.model.js";

class comments extends Model {}

comments.init(
  {
    content: {
      type: DataTypes.TEXT,
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "comments",
  });

Posts.hasMany(comments, {
  foreignKey: "postId",
});
comments.belongsTo(Posts);
Users.hasMany(comments, {
  foreignKey: "userId",
});
comments.belongsTo(Users);

export { comments };
