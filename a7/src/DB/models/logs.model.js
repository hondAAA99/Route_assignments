import { dbo } from "../connection.js"


const logsModel = async ()=>{
    const logsCollection = await dbo.createCollection('logs',{capped : true , size : 125000 });
}

logsModel().catch((err)=>{
    console.log('error in logs model',err);
    
})

export { logsModel }