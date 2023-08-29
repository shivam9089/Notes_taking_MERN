const fs = require('fs'); //require is like import coming fom common js module system
const path=require('path');
function serveStaticFile(request, response){
    let currentUrl = request.url;
    if(request.url == '/'){
        currentUrl = '/index.html';
    }
    const parentDir = path.normalize(__dirname+"/..");
    const filepath  = path.join(parentDir, 'public', currentUrl);
 //const filepath = "C:\\Users\\91995\\Desktop\\Notes_app\\http-server\\public\\index.html";
fs.readFile(filepath, (err,content)=>{
   
    if(err){
        console.log('File Not Found...', err);
    }else{
        response.write(content); //write content to browser 
        response.end();
    }
})
}
module.exports = serveStaticFile;