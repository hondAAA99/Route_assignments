import fs  from 'node:fs'
import path  from 'node:path'
import { createGzip } from 'node:zlib';
import url from 'node:url';
import http from 'node:http';
import { stringify } from 'node:querystring';

let Pa = path.resolve('./test.json');
let read = fs.createReadStream(Pa,{encoding : 'utf-8'});
let write = fs.createWriteStream(Pa,{encoding : 'utf-8'});

// part 1

// 1

read.on('data',(chunks)=>{
    console.log(chunks);
    
})

// 2 

read.on('data',(chunks)=>{
    write.write(chunks);
})

// 3 

read.pipe(createGzip()).pipe(write);





// part 2
// 1

let server = http.createServer((req,res)=>{
    respon(req,res);
});

let port = 3000 ;
let hostname = 'localhost'

server.listen(port,hostname,()=>{
    console.log('server is on http://localhost:3000');
    
})



function respon(request,respond){
    let parsed = url.parse(request.url,true);
    let pathname = parsed.pathname ;
    let query = parsed.query ;
    let method = request.method ;
    
    
    if ( method =='POST' && pathname == '/user'){
        respond.statusCode = 200 ;
        respond.setHeader('content-type','text/plain');
        respond.end(add_user(query));
        
    }
    else if ( method === 'PATCH' &&pathname.startsWith('/user/')) {
        const id = pathname.split('/')[2];

        respond.statusCode = 200;
        respond.setHeader('Content-Type', 'text/plain');
        respond.end(update(request, id));
        }

    else if ( method =='DELETE' && pathname.startsWith('/user/')){
        let id = pathname.split('/')[2];
        
        respond.statusCode = 200 ;
        respond.setHeader('content-type','text/plain');
        respond.end(delete_user(id));
        
        
    }
    else if ( method =='GET' && pathname == '/user'){
        respond.statusCode = 200 ;
        respond.setHeader('content-type','text/plain');
        respond.end(print());
    }
    else if ( method =='GET' && pathname.startsWith('/user/')){
        let id = pathname.split('/')[2];
        respond.setHeader('content-type','text/plain');
        respond.end(printById(id));

    }
    else {
        respond.statusCode = 404 ;
        respond.setHeader('content-type','text/plain');
        respond.end('you entered a wrong path')
    }
}


function add_user(q){
    let id = set_id();
    
    let obj = {name : q.name , age : q.age , email : q.email , id : id };
    let data = [] ;

    data = JSON.parse(fs.readFileSync('data.json'));

    if (!check_email(q.email,data)){

        data.push(obj);
        fs.writeFileSync('./data.json',JSON.stringify(data,null,2.5),'utf-8');
        return 'the user added';
    }
    else {
        return "this user is here"
    }
}

function set_id(){
    let data = JSON.parse(fs.readFileSync('./data.json'));
    let id = data.length++ ;   
    return id ;
}

function check_email(email,data){
    
    let d = data.find((e)=>{
        return e.email === email ;
    })

    if (!d) return false ;
    else return true ;
    
}


function update(query,id){    
    let data = [] ;
    const file = fs.readFileSync('./data.json').toString();
    data = JSON.parse(file);
    let {user,idx} = findUser(data,id);

    if ( query.name ) {user.name = query.name } 
    else if ( query.age ) {user.age = query.age }
    else if ( query.email ) {user.email = query.email }

    data[idx] = user ;
    fs.writeFileSync('./data.json',JSON.stringify(data,null,2.5));    
    
        return "updated successfully";

}

function findUser(data,id){
    let user = data.find((e)=>{
                return e.id == id ;
        })
    let idx = data.findIndex((e)=>{
        return e.id == id ;
    })

    return {user : user , idx : idx }
}


// 3

function delete_user(id){
    let data = [];
    try {

        data=JSON.parse(fs.readFileSync('./data.json'));
    }
    catch(e){
        if (e) console.log("there is no data to e sent");
    }

    let user ;

    user = data.findIndex((e)=>{
        return e.id == id 
    })

    if (user) return 'user is not here'
    

    data.splice(user,1)


    fs.writeFileSync('./data.json',JSON.stringify(data,null,2.5));

    return "user deleted successfully"

}

// 4

function print(){
    let data = JSON.parse(fs.readFileSync('./data.json'));

    if (!data){
        return "there is no data here"
    }

    return JSON.stringify(data,null,2);
}

// 5


function printById(id){
    let data = JSON.parse(fs.readFileSync('./data.json'));
    return data.find((e)=>{
        return e.id == id 
    })
}








