import express from 'express'
import { connect } from "./DB/connection.js";
import { userRouter } from './modules/Users/users.controller.js';
import { noteRouter } from "./modules/notes/notes.controller.js";
const app = express();
const port = 3000;
const bootstrap = ()=>{

app.use(express.json())
connect();

app.use('/user', userRouter);

app.use("/note", noteRouter);

app.get('/{*demo}', (req, res) => {
  res.send('Hello World!');
});

app.use((err,req,res,next)=>{  
  console.error({message : err.message, stack : err.stack});
  res.status(500).json({msg: err.message , stack : err.stack})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})};
export {bootstrap}