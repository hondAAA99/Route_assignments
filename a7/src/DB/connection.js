import { MongoClient } from "mongodb";

const connection = new MongoClient("mongodb://localhost:27017/",{serverSelectionTimeoutMS : 5000});

async function main (){
        await connection.connect();
        console.log('connected succfully to database');
}

const db_name = 'session_13';
const dbo = connection.db(db_name);

export { main ,dbo }