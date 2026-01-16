import express from 'express'
import { check_connection, check_sync } from './DB/connection.js';
const app = express();
const port = 3000;


const bootstrap = ()=>{

    app.use(express.json());
    check_connection(); check_sync();

    app.get('/{*demo}', (req, res) => {
      res.send('Hello World!');
    });
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
}

export {bootstrap}