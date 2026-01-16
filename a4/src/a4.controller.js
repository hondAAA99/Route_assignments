let express = require("express");

const app = express();
const port = 3000;

let BootStrap = function () {
  app.use(express.json());

  app.use("/user", userBlog);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

module.exports = { BootStrap };
