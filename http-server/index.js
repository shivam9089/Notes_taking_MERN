const http = require('http');
const serveStatic = require('./utils/static-file-serve');
function handleRequestAndResponse(request, response){
   // console.log('Request and Response... ');
   //response write on client 
//    response.write('<h1>Hello Client I am server<h1>');
//    response.write('<h2>Hello Client I am server<h2>');
//    response.write('<h3>Hello Client I am server<h3>');
//    response.end();
    serveStatic(request, response);
}
const server = http.createServer(handleRequestAndResponse);
server.listen(1234, (err)=>{
    if(err){
        console.log('Server Crash ', err);
    }
    else{
        console.log('Server Start ');
    }
})