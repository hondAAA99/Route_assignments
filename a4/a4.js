import express from "express";
import path from "path";
import fs from "fs";
import e from "express";
import { resourceUsage } from "process";
const app = express();
const port = 3000;

app.use(express.json());

app.post("/user", (req, res) => {
  let result = add_user(req,res);

});

function add_user(req,res) {
  let data = req.body;
  let check = checkMail(data.email);
  if (!check){
    let file = JSON.parse(fs.readFileSync(path.resolve('data.json')));
    let id = add_id(file);
    data.id = id ;
    file.push(data);
    fs.writeFileSync(path.resolve('data.json'),JSON.stringify(file,null,2))
    res.status(200).send('user added');

    }
}

function checkMail(email) {
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let find = file.find((e) => {
    return e.email == email;
  });

  return find;
}

function add_id(data) {
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let id = file.length;
  if (id == -1) return 0;
  else return id++;
}

app.patch("/user/:id", (req, res) => {
  let result = update_user(req);
  res.status(200).send(result);
});

function update_user(req) {
  let id = req.params;
  let new_data = "";
  req.on("data", (chunks) => {
    new_data += chunks;
  });

  req.on("end", () => {
    new_data = JSON.parse(new_data);
    let data = JSON.parse(fs.readFileSync(path.resolve("data.json")));

    let idx = data.findIndex((e) => {
      return e.id == Object.values(id)[0];
    });
    if (idx != -1) {
      if (Object.keys(new_data)[0] == "name") {
        data[idx].name = new_data.name;
      } else if (Object.keys(new_data)[0] == "age") {
        data[idx].age = new_data.age;
      } else if (Object.keys(new_data)[0] == "email") {
        data[idx].email = new_data.email;
      }
      fs.writeFileSync(
        path.resolve("data.json"),
        JSON.stringify(data),
        null,
        2
      );

      return "user updated";
    } else {
      return "user not found";
    }
  });
}

app.delete("/user/:id", (req, res) => {
  let result = delete_user(req);
  res.status(200).send(result);
});

function delete_user(req) {
  let id = req.params.id;
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let idx = file.findIndex((e) => {
    return e.id == id;
  });

  file.splice(idx, 1);

  console.log(file);

  fs.writeFileSync(path.resolve("data.json"), JSON.stringify(file));
  return "user deleted";
}

app.get("/user/getByName", (req, res) => {
  let result = get_by_name(req);
  res.status(200).send(result);
});

function get_by_name(req) {
  let name = req.query.name;
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let user = file.find((e) => {
    return e.name == name;
  });
  return user;
}

app.get("/user", (req, res) => {
  let result = get_all_users(req);
  res.send(result);
});

function get_all_users(req) {
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  return JSON.stringify(file);
}

app.get("/user/filter", (req, res) => {
  let result = filter_users(req,res);
});

function filter_users(req,res){
  let filter = req.query.MinAge ;
  let file = JSON.parse(fs.readFileSync(path.resolve('data.json')));
  file = file.filter((e)=>{
    return filter == e.age
  })

  res.status(200).send(file);
}

app.get("/user/:id", (req, res) => {
  let result = get_user_by_id(req,res);
});

function get_user_by_id(req,res){
  let id = req.params.id ;
  let file = JSON.parse(fs.readFileSync(path.resolve('data.json')));
  let user = file.find((e)=>{
    return e.id == id ;
  })
  res.status(200).send(user);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

