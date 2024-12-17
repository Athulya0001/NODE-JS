const http = require('http');
http.createServer((request,response)=>{
    response.end("This is from Node.js server")
}).listen(3000,()=>{
    console.log("Server is running on port 3000")
})