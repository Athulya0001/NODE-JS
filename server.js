const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    console.log(request.method, "Request Method")
    console.log(request.url, "Request URL")
    // response.end('<h1>Local Server</h1>')

    if (request.url === '/' && request.method === 'GET') {
        fs.readFile('./to-do.html', 'utf-8', (err, data) => {
            if (err) {
                console.log("File not found")
            }
            response.end(data)
        })
    }else if(request.url==='/style.css'&&request.method==='GET'){
        const cssPath = path.join(__dirname,request.url);
        fs.readFile(cssPath,'utf-8',(err,data)=>{
            if(err) {
                console.log("CSS file not found")
            }
            response.end(data)
        })
    }else if(request.url==='/script.js'&&request.method==='GET'){
        const jsPath = path.join(__dirname,request.url);
        fs.readFile(jsPath,'utf-8',(err,data)=>{
            if(err){
                console.log("JS file not found")
            }
            response.end(data)
        })
    }
})
server.listen(3000, () => {
    console.log("Server is running on port 3000")
})