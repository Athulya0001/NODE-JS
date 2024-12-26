// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const dummy = require('./dummy.js');

import http from 'http';
import fs from 'fs';
import path from 'path';
import {todoData} from './todo.js'


// const jsonPath = path.join(__dirname,"todo.json");


async function readJsonFile(){
    if(!fs.existsSync(jsonPath)){
        fs.writeFileSync(jsonPath,JSON.stringify([]))
    }
    const fileContent= fs.readFileSync(jsonPath)
    const data =JSON.parse(fileContent);
    return data;
}


async function addData(todo){
    await fs.writeFileSync(jsonPath,JSON.stringify(todo, null, 2))

}

const server = http.createServer((request, response) => {
    console.log(request.method, "Request Method");
    console.log(request.url, "Request URL");

    const todoPath = path.join(__dirname, "to-do.html");
    const scriptPath = path.join(__dirname, "script.js");

    if (request.url === "/" && request.method === "GET") {
        fs.readFile(todoPath, "utf-8", (err, data) => {
            if (!err) {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end("Error loading page");
            }
        });
    } else if (request.url === "/script.js" && request.method === "GET") {
        fs.readFile(scriptPath, "utf-8", (err, data) => {
            if (!err) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.end(data);
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end("Error loading script");
            }
        });
    } else if (request.url === "/add" && request.method === "POST") {
        console.log("Enter function post")
        let body = "";
        

        request.on("data", (chunk) => {
            body += chunk;
            console.log(body,"Body data")
        });
        

        request.on("end", async() => {
            const todos= await readJsonFile()
            console.log(todos,'todo from function ===========')
           const newTodo={todo:JSON.parse(body)}
            console.log(newTodo,'new todo ===================')
            todos.push(newTodo)
    //         console.log(todos,"======================")
    
    await addData(todos)
        });
    }
     else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
