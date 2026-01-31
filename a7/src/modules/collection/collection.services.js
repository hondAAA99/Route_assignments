import { logsModel } from "../../DB/models/logs.model.js";
import {dbo} from '../../DB/connection.js'
const createBookCollection = async (req, res, next) => {
  try {
    const bookscollection = await dbo.createCollection("book", {
    validator: {
      $jsonSchema: {
        required: ["title"],
        properties: {
          title: {
            bsonType: 'string',
          },
          year : {
            bsonType : "int"
          },
          author : {
              bsonType : 'string'
            },
            generes : {
              bsonType : 'array'
            },
          }
        },
      },
    },
    
  );
    res.status(201).json({ mesage: "succeded" });
  } catch (err) {
    if (err) {
      console.log(`error is in ${__filename}`, err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const insertAuthorDoc = async (req, res, next) => {
  try {
    await dbo.collection("authors").insertOne(req.body);
    res.status(201).json({ message: "succeded" });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "failed" });
    }
  }
};

const createcappedCollection = async (req, res, next) => {
  try {
    await dbo.collection('logs').createIndex({title:1})
    res.status(201).json({ mesage: "succeded" });
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const createBookIndex = async (req, res, next) => {
  try {
    const booksCollection = dbo.collection('book')
    await booksCollection.createIndex({ title: 1 });
    res.status(201).json({ mesage: "succeded" });
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

export {
  createBookCollection,
  insertAuthorDoc,
  createBookIndex,
  createcappedCollection,
};
