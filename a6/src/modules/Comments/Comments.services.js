import { Comments } from "../../DB/models/Comments.model.js";
import { Posts } from "../../DB/models/posts.model.js";
import { Users } from "../../DB/models/users.model.js";
import { Model, Op } from "sequelize";

const createBulk = async (req, res, next) => {
  try {
    const comments = await Comments.bulkCreate(req.body);
    res.status(200).json({ message: "coments created" });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "failed to add comments" });
    }
  }
};

const updateComment = async (req, res, next) => {
  let commentId = req.params.commentId;
  let { updated, UserId } = req.body;

  try {
    let post = await Comments.update(
      { content: updated },
      {
        where: {
          id: commentId,
          UserId: UserId,
        },
      },
    );

    if (!post[0])
      return res
        .status(400)
        .json({ message: "you are not authorized to edit this post" });

    return res.status(201).json({ message: "updated comment successed" });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "failed to update comments" });
    }
  }
};

const findOrCreate = async (req, res, next) => {
  let { UserId, postId, content } = req.body;
  try {
    let comment = await Comments.findOrCreate({
      where: {
        UserId: UserId,
        postId: postId,
      },
      defaults: content,
    });
    res.status(201).json({ comment: comment });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "faild to find or create the comment" });
    }
  }
};

const searchForWords = async (req, res, next) => {
  let { word } = req.query;
  try {
    const comments = await Comments.findAll({
      where: {
        content: { [Op.like]: `%${word}%` },
      },
    });
    return res.status(201).json({ count: comments.length, comments: comments });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(401).json({
        message: "failed to find comments",
      });
    }
  }
};

const newestComments = async (req, res, next) => {
  let { postID } = req.params;

  try {
    const comments = await Comments.findAll({
      where: {
        postId: postID,
      },
      order: ["createdAt"],
      limit: 3,
    });
    console.log(postID);

    return res.status(200).json({ comments: comments });
  } catch (err) {
    if (err) {
      onsole.log(err);
      return res.status(404).json({ message: "failled to retrive data" });
    }
  }
};

const getComment = async (req, res, next) => {
  let commentId = req.params.commentId;
  try {
    let comment = await Comments.findOne({
      where: {
        id: commentId,
      },
      include: [
        {
          model : Users,
          attributes : ['id','name','email']
        },
        {
          model : Posts,
        }
      ],
    });
    console.log(comment);
    

    return res.status(201).json({ message: comment });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: "failed the operation" });
    }
  }
};

export {
  createBulk,
  updateComment,
  searchForWords,
  findOrCreate,
  newestComments,
  getComment,
};
