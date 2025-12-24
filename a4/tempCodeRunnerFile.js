function add_user(req,res){
  
  let data = '' ;
  req.on('data',(chunks)=>{
    console.log('*');
    data += chunks;
    })

    req.on('end',()=>{
      data = JSON.parse(data);
      let check = checkMail(data);
      data.id = add_id(data);        
        
      if (!check){
        let file = JSON.parse(fs.readFileSync(path.resolve('data.json')));
        file.push(data);
        fs.writeFileSync(path.resolve('data.json'),JSON.stringify(file,null,2.5))}})}