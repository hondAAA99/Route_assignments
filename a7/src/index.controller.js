import express from "express";
import { main } from "./DB/connection.js";
import { collectionRoute } from "./modules/collection/collection.controller.js";
import { logRouter } from "./modules/logs/logs.controller.js";
import { bookRouter } from "./modules/books/books.controller.js";

const app = express();
const port = 3000;
const bootstrap = () => {
  app.use(express.json());
  main().catch((err) => {
    if (err) console.log(err);
  });

  app.use("/collection", collectionRoute);

  app.use("/book", bookRouter);

  app.use("/logs", logRouter);

  app.get("/{*demo}", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
export { bootstrap };
