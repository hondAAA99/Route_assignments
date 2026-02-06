import {dbo}from'../../DB/connection.js'

const insertOneDoc = async (req, res, next) => {
  try {
    await dbo.collection('book').insertOne(req.body);
    console.log();
    
    res.status(201).json({ mesage: "succeded" });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};
const insertManyDoc = async (req, res, next) => {
  try {    
    await dbo.collection('book').insertMany(req.body);

    res.status(201).json({ mesage: "succeded" });
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const updateFuture = async (req, res, next) => {
  try {
    await dbo.collection('book').updateMany(
      {
        title: "Future",
      },
      {
        $set: { year: 2022 },
      },
      (err, result) => {
        if (err) {
          console.log(err, result);
        }
      },
    );

    res.status(201).json({ mesage: "succeded" });
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const findWithTitle = async (req, res, next) => {
  try {
    const { title } = req.query;
    const result = await dbo.collection('book').findOne({
      title: title,
    });
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const findInDuration = async (req, res, next) => {
  const { from, to } = req.query;
  
  try {
    const result = dbo.collection('book').find({
      year: {
        $gt: from,
        $lt: to,
      },
    }).toArray() ;
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const findGenre = async (req, res, next) => {
  try {
    const { genre } = req.query;    
    const result = await dbo.collection('book')
      .find({
        generes: { $in: [genre] },
      })
      .toArray();
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const findScippedLimittedSorted = async (req, res, next) => {
  try {
    const result = dbo.collection('book').find(
      {},
      {
        skip: 2,
        limit: 3,
        sort: {year : -1},
      },
    ).toArray();
    res.status(201).json({ mesage: "succeded" });
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const checkYear = async (req, res, next) => {
  try {
    const result = await dbo.collection('book').find({
      age: { $type: "int" },
    }).toArray();
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
      console.log(err);
      res.status(401).json({ mesage: "failed" });
  }
};

const checkNorGeneres = async (req, res, next) => {
  try {
    const result = await dbo
      .collection("book")
      .find({
        generes : ["horror", "sciencs fiction"] ,
      })
      .toArray();
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
      console.log(err);
      res.status(401).json({ mesage: "failed" });
  }
};

const deleteBeforeYear = async (req, res, next) => {
  try {
    let result = await dbo.collection("book").deleteMany({
      year: { $lt: 2000 },
    });
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const aggr1 = async (req, res, next) => {
  try {
    const result = await dbo
      .collection("book")
      .aggregate([
        {
          $match: {
            year: {
              $gt: 2000,
            },
          },
        },
        {
          $sort: { year : -1 },
        }
      ])
      .toArray();
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const aggr2 = async (req, res, next) => {
  try {
    const result = await dbo
      .collection("book")
      .aggregate([
        {
          $match: {
            year: {
              $gt: 2000,
            },
          },
        },
        {
          $sort: {year : -1},
        },
      ])
      .toArray();
      console.log(result);
      
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const aggr3 = async (req, res, next) => {
  try {
    const result = await dbo
      .collection("book")
      .aggregate([
        {
          $match: {
            year: {
              $gt: 2000
            }}},
        {
          $project: {
            title: 1,
            author: 1,
            year: 1,
          }}]).toArray();
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

const aggr4 = async (req, res, next) => {
  try {
    const result = dbo
      .collection("book")
      .aggregate([
        {
          $lookup: {
            from: "log",
            localField: "id",
            foriegnKey: "id",
            as: "book_id",
          }
        },
      ])
      .toArray();
    res.status(201).json({ mesage: "succeded" , result : result});
  } catch (err) {
    if (err) {
      console.log( err);
      res.status(401).json({ mesage: "failed" });
    }
  }
};

export {
  aggr1,
  aggr2,
  aggr3,
  aggr4,
  insertManyDoc,
  insertOneDoc,
  updateFuture,
  deleteBeforeYear,
  checkNorGeneres,
  checkYear,
  findGenre,
  findInDuration,
  findScippedLimittedSorted,
  findWithTitle,
};
