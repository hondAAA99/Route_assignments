import path from 'node:path'
import fs from 'node:fs'
import url from 'node:url';
import { AsyncLocalStorage } from 'node:async_hooks';

function response(req,res){
    let url = url.parse(req.url) ;
    let pathname = url.pathname ;
    let segs = pathname.split('/');
    let id = segs[segs.length-1];
    if ( pathname === 'DELETE/user/id'){
        return delete_user(id);
    }
    else return "sorry wrong page"
}


let P = path.resolve('./data.json');

function delete_user(id){
    try {

        let data = JSON.parse(fs.readFileSync(P));
    }
    catch(e){
        if (e) console.log("there is no data to e sent");
    }

    try {
    let user = data.find((e)=>{
        return e.id == id 
    })
    }catch(e){
        if (e) console.log("the user is not here");
        
    }

    data.splice(user,1);

    fs.writeFileSync(P,JSON.stringify(data));
    return "user deleted successfully"

}

console.log(delete_user(1));

