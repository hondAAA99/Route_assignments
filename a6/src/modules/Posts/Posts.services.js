import { Posts } from "../../DB/models/posts.model.js";
import { Users } from "../../DB/models/users.model.js";
import { Comments } from "../../DB/models/Comments.model.js";

const createPost = async (req, res, next) => {
  const { title, content, userId } = req.body;

  try {
    const post = Posts.build({
      title: title,
      content: content,
      userId: userId,
    });
    await post.save();
    if (post) {
      return res.status(200).json({ message: "post added successfully" });
    } else return res.status(400).json({ message: "post added faild" });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: "process faild" });
    }
  }
};

const deletePost = async (req, res, next) => {
  let { postid } = req.params;
  let { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "please added your email and password" });
  } else if (email && password) {
    try {
      let user = await Users.findOne({
        where: {
          email: email,
          password: password,
        },
      });

      let post = await Posts.findByPk(postid);

      if (!post) return res.status(400).json({ message: "post has not found" });
      console.log("**************", post);

      if (post.userId != user.dataValues.id) {
        return res
          .status(400)
          .json({ message: "you are not authorized to delete this post" });
      } else {
        await Posts.destroy({
          where: {
            id: postid,
          },
        },{
        });
        return res.status(200).json({ message: "post deleted successfully" });
      }
    } catch (err) {
      if (err) console.log(err);
      res.status(404).json({ message: "proccess faild" });
    }
  }
};

const allPosts = async (req, res, next) => {

  const posts = await Posts.findAll({
    include: [Users,Comments]
  });

  return res.status(200).json(posts);
};

const countComments = async (req, res, next) => {
  const posts = await Posts.findAll({
    include: Comments
  });

  res.status(200).json(posts);
};

export { createPost, deletePost, allPosts, countComments };
