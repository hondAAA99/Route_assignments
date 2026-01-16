let add_user = () => {
  (req, res, next) => {
    let data = req.body;
    let check = checkMail(data.email);
    if (check == undefined) {
      next();
    } else {
      res.status(400).send("use anthor email");
    }
  },
    (req, res) => {
      let result = add_user(req, res);
      res.status(201).send(result);
    };
};

function checkMail(email) {
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let find = file.find((e) => {
    return e.email == email;
  });

  return find;
}

function add_user(req, res) {
  let data = req.body;
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let id = add_id(file);
  data.id = id;
  file.push(data);
  fs.writeFileSync(path.resolve("data.json"), JSON.stringify(file, null, 2));
  return "user added";
}

function add_id(data) {
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let id = file.length;
  if (id == -1) return 0;
  else return id++;
}

let edit_user = () => {
  (req, res) => {
    let result = update_user(req);
    res.status(200).send(result);
    res.end();
  };
};

function update_user(req) {
  let id = req.params.id;
  let update = Object.keys(req.body)[0];
  let data = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let user = data.findIndex((e) => {
    return e.id == id;
  });
  if (user === -1) {
    return "user is not found";
  } else {
    if (update == "name") {
      data[user].name = req.body.name;
    } else if (update == "age") {
      data[user].age = req.body.age;
    } else if (update == "email") {
      data[user].email = req.body.email;
    } else {
      return "cannot find property";
    }
    fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data), null, 2);

    return "user updated";
  }
}

let delete_user = (req, res) => {
  let result = delete_user(req);
  res.status(200).send(result);
};
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

let get_by_name = (req, res) => {
  let result = get_by_name(req);
  res.status(200).send(result);
};

function get_by_name(req) {
  let name = req.query.name;
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let user = file.find((e) => {
    return e.name == name;
  });
  return user;
}

let get_all_users = (req, res) => {
  let result = get_all_users(req);
  res.send(result);
};

function get_all_users(req) {
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  return JSON.stringify(file);
}

let filter_users = (req, res) => {
  let result = filter_users(req, res);
};
function filter_users(req, res) {
  let filter = req.query.MinAge;
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  file = file.filter((e) => {
    return filter == e.age;
  });

  res.status(200).send(file);
}

let user_by_id = (req, res) => {
  let result = get_user_by_id(req, res);
};

function get_user_by_id(req, res) {
  let id = req.params.id;
  let file = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  let user = file.find((e) => {
    return e.id == id;
  });
  res.status(200).send(user);
}

module.exports = {
  add_user,
  edit_user,
  delete_user,
  get_by_name,
  get_all_users,
  filter_users,
  user_by_id,
};
