const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    console.log(request.method, "Request Method")
    console.log(request.url, "Request URL")

    const todoPath = path.join(__dirname,"/to-do.html")

    if(request.url==="/" && request.method==="GET"){
        fs.readFile(todoPath,"utf-8",(err,data)=>{
            if(!err){
                response.end(data)
            }
        })
    }

})
server.listen(3000,()=>{
    console.log("Server running on port 3000")
})