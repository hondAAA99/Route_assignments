import path from "node:path";
import url from "node:url";
import http from "node:http";
import fs from "node:fs";
import { gzip } from "node:zlib";
import { pipeline } from "node:stream";

// part 1
// 1
let Pa = path.resolve(path.resolve("data2.txt"));
let read = fs.createReadStream(Pa, {
  encoding: "utf-8",
});

read.on("data", (chunks) => {
  console.log(chunks);
});

read.on("end", () => {
  console.log("reading has ended");
});

// 2
let write = fs.createWriteStream(path.resolve(path.resolve('data3.txt')), {
  encoding: "utf-8",
  flags : 'w'
});
read.on("data", (chunks) => {
  write.write(chunks);
});

// 3
function zlip(){

  let gzib = createGzip();
  let ReadStream = fs.createReadStream(path.resolve("data2.txt"));
  let WriteStream = fs.createWriteStream(path.resolve("data2.txt"));
  
  pipeline(ReadStream,gzib,WriteStream,(e)=>{
    if (e) console.log(e);
    
  });

}

// part 2

let port = 3000;
let hostname = "localhost";
let server = http
  .createServer((req, res) => {
    respon(req, res);
  })
  .listen(port, hostname, () => {
    console.log("server is on http://localhost:3000");
  });

function respon(request, respond) {
  let method = request.method;
  let parsed = url.parse(request.url,true);
  let pathname = parsed.pathname ;
  let req = {};
  let data = "" ;

  // add
  if (method == "POST" && pathname == "/user") {

      request.on("data", (chunks) => {
        data +=  chunks ;
      });
      
      request.on("end", () => {
        data = JSON.parse(data);
        let result = add_user(data);
        respond.statusCode = 200;
        respond.setHeader("content-type", "text/plain");
        respond.end(result);
      });


    // return users
  } else if (method == "GET" && pathname == "/user" )  {
    respond.statusCode = 200;
    respond.setHeader("content-type", "text/plain");
    respond.end(print());
  
    // retunr user by id
  } else if (method == "GET" && pathname.startsWith("/user/") ) {
    let id = pathname.split("/")[2];
    let result = printById(id);

    respond.setHeader("content-type", "text/plain");
    respond.end(JSON.stringify(result,null,2));

    // edit by id
  } else if (method === "PATCH" && pathname.startsWith("/user/")) {
    const id = Number(pathname.split("/")[2])
    let data = '';
    request.on("data", (chunks) => {
      data += chunks;
    });

    request.on("end", () => {
      data = JSON.parse(data);
      let result = update(data,id);
      respond.statusCode = 200;
      respond.setHeader("Content-Type", "text/plain");
      respond.end(result);
    });
    
    
  } else if (method == "DELETE" && pathname.startsWith("/user/")) {
    let id = Number(pathname.split("/")[2]) ;
    respond.statusCode = 200;
    respond.setHeader("content-type", "text/plain");
    respond.end(delete_user(id));
  } else {

    respond.statusCode = 404;
    respond.setHeader("content-type", "text/plain");
    respond.end("you entered a wrong path");
  }
}

// 1
function add_user(request) {
  let { name, age, email } = request ;

  let data ;
  data = JSON.parse(fs.readFileSync(path.resolve(path.resolve("data.json"))));

  for ( let e = 0 ; e<data.length ; e++ ){
    if (data[e].email == email ) return "email is used"; 
  }

  let id = set_id(data);
  data.push({ id: id , name: name, age: age, email: email });
  console.log(data);


  fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data, null, 2));
  return "user added" ;
}

function set_id(data) {
  if (data.length === 0) return 0;
  return data[data.length - 1].id + 1;
}

// 2 
function update(body , id) {
  let data = [] ;
  const file = fs.readFileSync(path.resolve("data.json")).toString();
  data = JSON.parse(file);
  let { user, idx } = findUser( data, id);
    
if ( user ){

  if (body.name) {
    data[idx].name = body.name;
  } else if (body.age) {
    data[idx].age = body.age;
  } else if (body.email) {
    data[idx].email = body.email;
  }


  fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data, null, 2.5));
  return "updated successfully";

}
else {
  return "user has not found";
}
}

function findUser(data, id) {
  let user ;
  let idx ;
  for ( let e = 0 ; e<data.length ; e++ ){

    if ( data[e].id === id ){
      user = data[e] ;
      idx = e;
    }

  }  

  return { user: user, idx: idx };
}

// 3

function delete_user(id) {

  let data ;
    data = JSON.parse(fs.readFileSync(path.resolve("data.json")));

  data.splice( id , 1);
  fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data, null, 2.5));
  return "user deleted successfully";
}

// 4

function print() {
  let data = JSON.parse(fs.readFileSync(path.resolve("data.json")));

  if (!data) {
    return "there is no data here";
  }

  return JSON.stringify(data, null, 2);
}

// 5

function printById(id) {
  let data = JSON.parse(fs.readFileSync(path.resolve("data.json")));
  return data[id];
}

// part 3

