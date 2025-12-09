const path = require('node:path');
const fs = require('node:fs/promises');
const fsSync = require('node:fs');
const EVENT = require('node:events')
const os = require('node:os');
let event = new EVENT();

// 1 
let one = function() {
    return {__filename , __dirname }
}

// 2 

let two = function(p){
    return path.basename(p);
}

// 3 

let three = function (o){
    return path.format(o);
}

// 4

let four = function(p){
    return path.extname(p);
}

// 5

let five = function(p){
    return path.parse(p).name + ' ' + path.parse(p).ext ;
}

// 6 

let six = function(p){
    return path.isAbsolute(p);
}

// 7

let seven = function(...s){
    let a = s ;
    let r = '' ;
    for ( let e of a ){
        r = path.join(r,e);
    }
    return r ;
}

// 8 

let eight = function(p){
    return path.resolve(p);
}

// 9

let nine = function (p1,p2) {
    return path.join(p1,p2);
}

// 10 

let ten = async function (file){
    await fs.unlink(`${file}`);
    return "the file was deleted";
}

// 11 

let eleven = function (){
    return fsSync.mkdirSync(path.join(__dirname,'test'));
}

// 12

let twelve = function(){

    event.on("start",(e)=>{
        console.log('welcome event triger');
    });

    event.emit("start");
}

// 13

let third = function(){

    event.on('sayHi',(e)=>{
        console.log("user Logged in :" + e );
        
    });

    event.emit('sayHi','mohanad')
}

// 14

let fourth = function (p){
    let data = fsSync.readFileSync(p);
    console.log( "the file content => " + data );
    
}

// 15 

let fifth = async function(path,content){
    await fs.writeFile(path,content);
}

// 16

let sixth = function(dir){
    if ( path.dirname(dir) ) return true ;
    else return false ;
}

// 17

let seventh = function(){

    console.log({ platform : os.platform() , Arch : os.arch() });
    
}
