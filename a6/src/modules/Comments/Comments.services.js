import { sequelize } from "../../DB/connection.js";
import { Comments } from "../../DB/models/Comments.model.js";
import { Posts } from "../../DB/models/posts.model.js";
import { Users } from "../../DB/models/users.model.js";

const createBulk = async (req, res, next) => {
  try {
    const comments = await Comments.createBulk([req.body[0]]);
    res.status(200).json({ message: "coments created" });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "failed to add comments" });
    }
  }
};

const updateComment = async (req, res, next) => {
  let { commentId } = req.params;
  let { updated, userId } = req.body;
  try {
    await Comments.update(
      { content: updated },
      {
        where: {
          id: commentId,
          UserId: userId,
        },
      },
    );

    return res.status(201).json({ message: "updated comment successed" });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "failed to update comments" });
    }
  }
};

const findOrCreate = async (req, res, next) => {
  let { userId, postId, content } = req.body;
  try {
    let comment = await Comments.findOrCreate({
      where: {
        UserId: userId,
        postId: postId,
      },
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

const newestComments = async (req,res,next)=>{
    let {postId} = req.params ;


    try {
    const comments = await Comments.findByPk((postId),{
      order: ["createdAt"],
      limit: 3,
    });
    return res.status(200).json({comments : comments})
    }
    catch(err){
        if ( err ) {
            onsole.log(err);
            return res.status(404).json({message : 'failled to retrive data'})
        }
    }
}

const getComment = async (req,res,next)=>{
    let {commentId} = req.params ;
    try {
        let comment = Comments.findByPk(commentId,{
            include : Users,
            include : Posts
        });
        return res.status(201).json({ message: comment });
    }catch (err){
        if (err){
            console.log(err);
            return res.status(404).json({message : 'failed the operation'})
        }
    }
}

export {
  createBulk,
  updateComment,
  searchForWords,
  findOrCreate,
  newestComments,
  getComment,
};
