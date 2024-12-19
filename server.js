const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    console.log(request.method, "Request Method");
    console.log(request.url, "Request URL");

    const todoPath = path.join(__dirname, "/to-do.html");
    const scriptPath = path.join(__dirname, "/script.js");

    if (request.url === "/" && request.method === "GET") {
        fs.readFile(todoPath, "utf-8", (err, data) => {
            if (!err) {
                response.end(data);
            } else {
                response.end("Error loading page");
            }
        });
    } else if (request.url === "/script.js" && request.method === "GET") {
        fs.readFile(scriptPath, "utf-8", (err, data) => {
            if (!err) {
                response.end(data);
            } else {
                response.end("Error loading script");
            }
        });
    } else if (request.url === "/" && request.method === "POST") {
        let body = "";

        request.on("data", chunk => {
            body += chunk;
        });

        request.on("end", () => {
            const parseData = JSON.parse(body)
            console.log(parseData);
        });

    }
    });

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
