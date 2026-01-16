const {
  add_user,
  edit_user,
  delete_user,
  get_by_name,
  get_all_users,
  filter_users,
  user_by_id,
} = require("./user.services.js");

import { Router } from "express";

let userBlog = Router();

userBlog.post("/user", add_user);

userBlog.patch("/user/:id", edit_user);

userBlog.delete("/user/:id", delete_user);

userBlog.get("/user/getByName", get_by_name);

userBlog.get("/user", get_all_users);

userBlog.get("/user/filter", filter_users);

userBlog.get("/user/:id", user_by_id);

module.exports = { userBlog };
