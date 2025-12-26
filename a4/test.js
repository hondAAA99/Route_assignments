import express from 'express'

let app = express();
let port = 3000 ;

app.use('/path',(req,res)=>{
    console.log('hi');
})

app.listen(port,()=>{
    console.log('server is on');
    
})