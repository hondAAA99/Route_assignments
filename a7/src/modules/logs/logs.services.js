import {dbo} from '../../DB/connection.js'

const insertNewLog = async (req, res, next) => {
  try {
    let result = await dbo.collection("logs").insertOne(req.body);
    console.log("result");
    res.status(201).json({ mesage: "succeded" });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

export { insertNewLog };
