import { response } from "../../common/response.js";
import {
  findById,
  findOne,
  insertOne,
  update,
  userDelete,
} from "../../DB/DB.services.js";
import { userModel } from "../../DB/models/users.js";
import { hash, genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  let { email, password, cpassword, userName, phone, age } = req.body;

  let { emailExists } = await findEmail(email);

  if (emailExists) throw { message: `${email} already exists`, cause: 304 };

  if (password != cpassword) throw { message: "invalid password", cause: 402 };

  let salt = await genSalt(16);
  let hashed = await hash(password, salt);
  let encryptedphone = phone;

  let newUser = await insertOne(userModel, {
    userName,
    email,
    password: hashed,
    phone: encryptedphone,
    age,
  });
  response(res, 201, newUser._doc);
};

async function findEmail(email) {
  let exists = await findOne(userModel, { email });

  if (exists) {
    return { emailExists: true, user: exists };
  } else {
    return { emailExists: false, user: {} };
  }
}

const login = async (req, res, next) => {
  let { email, password } = req.body;
  let { matched, user } = await correctPassword(email, password);

  if (!matched)
    throw {
      message: "you have entered incorrect password",
      cause: 301,
    };

  let emailExists = user;
  if (!emailExists)
    throw {
      message: `${email} doesn't exsits`,
      cause: 404,
    };

  let token = jwt.sign(
    {
      data: user._id.toString(),
    },
    "secret",
    { expiresIn: "1h" },
  );
  return response(res, 201, { token });
};

async function correctPassword(email, password) {
  let { user } = await findEmail(email);

  if (!user) return { message : 'email not found', matched: false, id: {}, user: {} };
  

  let matched = await compare(password, user.password);

  if (!matched) return { matched: matched };

  return { matched: matched, id: user._id.toString(), user };
}

const updateUser = async (req, res, next) => {
  const { email, userName, age, phone } = req.body;
  if (email) {
    let { emailExists } = await findEmail(email);

    if (emailExists) throw { message: "email exsits", cause: 304 };
  }

  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");

  await update(userModel, payload.data, {
    userName: userName,
    email: email,
    age: age,
    phone: phone,
  });

  response(res, 201);
};
const deleteUser = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  response(res, 200, userDelete(payload.data));
};
const getUserById = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  response(res, 200, findById(payload.data));
};

export { signup, login, updateUser, deleteUser, getUserById };
