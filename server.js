
// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const dummy = require('./dummy.js');

import http from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, "todo.json");
const jsonUserPath = path.join(__dirname, "user.json");

async function readJsonFile() {
  try {
    if (!(await fs.stat(jsonPath).catch(() => false))) {
      await fs.writeFile(jsonPath, JSON.stringify([]));
    }
    const fileContent = await fs.readFile(jsonPath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
}

async function addData(todo) {
  try {
    await fs.writeFile(jsonPath, JSON.stringify(todo, null, 2));
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
}

async function readUserFile() {
  try {
    if (!(await fs.stat(jsonUserPath).catch(() => false))) {
      await fs.writeFile(jsonUserPath, JSON.stringify([]));
    }
    const userContent = await fs.readFile(jsonUserPath, "utf-8");
    return JSON.parse(userContent);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
}

async function addUserData(users) {
  try {
    await fs.writeFile(jsonUserPath, JSON.stringify(users, null, 2)); 
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
}

const server = http.createServer(async (request, response) => {
  console.log(request.method, "Request Method");
  console.log(request.url, "Request URL");

  const todoPath = path.join(__dirname, "to-do.html");
  const scriptPath = path.join(__dirname, "script.js");
  const userPath = path.join(__dirname, "usermanagement.html");
  const userScriptPath = path.join(__dirname, "userscript.js");



  if (request.url === "/todo" && request.method === "GET") {
    try {
      const data = await fs.readFile(todoPath, "utf-8");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    } catch (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Error loading page");
    }
  } else if (request.url === "/script.js" && request.method === "GET") {
    try {
      const data = await fs.readFile(scriptPath, "utf-8");
      response.writeHead(200, { "Content-Type": "application/javascript" });
      response.end(data);
    } catch (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Error loading script");
    }
  }else if (request.url === "/user" && request.method === "GET") {
    try {
      const data = await fs.readFile(userPath, "utf-8");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    } catch (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Error loading page");
    }
  } else if (request.url === "/userscript.js" && request.method === "GET") {
    try {
      const data = await fs.readFile(userScriptPath, "utf-8");
      response.writeHead(200, { "Content-Type": "application/javascript" });
      response.end(data);
    } catch (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Error loading script");
    }
  }
   else if (request.url === "/add" && request.method === "POST") {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", async () => {
      try {
        const todos = await readJsonFile();
        const parsedBody = JSON.parse(body);
        console.log(parsedBody, "parsed body")
        const newTodo = { todo: parsedBody.todo,
          id: Date.now()
        };
        todos.push(newTodo);

        await addData(todos);

        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Todo added successfully", todos }));
      } catch (error) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Failed to add todo", error }));
      }
    });
  } else if (request.url === "/getTodos" && request.method === "GET") {
    try {
      const data = await readJsonFile();
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(data));
    } catch (err) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Failed to fetch todos", error: err }));
    }
  }else if (request.url === "/addUser" && request.method === "POST") {
    let userBody = "";

    request.on("data", (chunkUser) => {
        userBody += chunkUser;
    });

    request.on("end", async () => {
        try {
            const users = await readUserFile(); 
            const parsedUserBody = JSON.parse(userBody); 
            console.log(parsedUserBody, "parsed user body");

            const newUserData = {
                Fullname: parsedUserBody.fullName,
                Email: parsedUserBody.emailId,
                password: parsedUserBody.password
            };

            users.push(newUserData);

            await addUserData(users);

            response.writeHead(201, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "User added successfully", users }));
        } catch (error) {
            console.error("Error adding user:", error);
            response.writeHead(500, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Failed to add user data", error: error.message }));
        }
    });
}
else if (request.url === "/getUsers" && request.method === "GET") {
    try {
      const dataUser = await readUserFile();;
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(dataUser));
    } catch (err) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Failed to fetch user data", error: err }));
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 Not Found");
  }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});