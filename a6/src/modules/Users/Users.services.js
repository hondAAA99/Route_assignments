import { Users } from "../../DB/models/users.model.js";

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    let user = Users.build({
      name: name,
      email: email,
      password: password,
      role: role,
    });
    console.log(user.email);
    await user.save();
    return res.status(200).send({ message: "users added successfully" });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({ message: "email already exists." });
    }
  }
};

const updateUser = async (req, res, next) => {

  let id = req.params.id;
  let { name, email, role } = req.body;
  let [user] = await Users.findOrCreate({
    where: {
      id: id,
    },
  }); 
  
  await user.update(
    {
      name : name ,
      email : email ,
      role : role
    },
    {
      validate: false,
    },
  );
  return res
    .status(200)
    .json({ message: "user updated or created successfully" });
};

const findUserByemail = async (req, res, next) => {
  const { email } = req.query ;
  const user = await Users.findOne({ where: { email: email } });  
  if (user) return res.status(200).json({ user: user });
  else return res.status(400).json({ message: "user not found" });
};

const findUser = async (req, res, next) => {
  let { id } = req.params;
  let user = await Users.findByPk(id, {
    attributes: {
      exclude: ["role", "password"],
    },
  });
  if (user) return res.status(200).json({ user: user });
  else return res.status(400).json({ message: "no user has found" });
};

export { createUser, updateUser, findUserByemail, findUser };
