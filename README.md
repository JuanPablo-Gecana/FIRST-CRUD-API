## Introduction
This repository consists of a simple CRUD API endpoints with express.js and swagger ui.<br>
<br>

## How to Use this Program

### 1. Download the necessary files on this repository <br>
This includes the 'package.json' and 'package-lock.json' aside from the needed files in order for this to work.

### 2. Install VScode and node.js <br>
Install VScode and node.js on the links below: <br>
Link for VScode: https://code.visualstudio.com/docs/setup/windows<br>
Link for Node.js: https://nodejs.org/en/download<br>

### 3. Install Code Runner <br>
Install Code Runner Extension by Jun Han through VScode. <br>
https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner<br>

### 4. Install express.js and swagger ui<br>
You can install express.js and swagger ui through npm with these commands: <br>
For Installing express.js: `npm install express`<br>
For Installing swagger ui: `npm install swagger-ui-express` <br>

**NOTE: All the files should be in one folder. Otherwise, it will not work.**
<br>

### 5. Try the program<br>
- Run the 'main.js' file and wait for it to signal that it is now online.<br>
- Now go to `localhost:3000/docs`<br>
- You should be on Swagger UI interface. See the reference image below:
<img width="1346" height="641" alt="Preview" src="https://github.com/user-attachments/assets/d257ced7-7e9b-4eef-ace5-348f18f5feee" />

### 6. Lists of Endpoints

| Endpoints | Description | Curl Output | Swagger Screenshot |
| --- | --- | --- | --- |
| GET /tasks| Getting all the list of items | HTTP/1.1 200 OK <br> X-Powered-By: Express <br> Content-Type: application/json; charset=utf-8 <br> Content-Length: 132 <br> ETag: W/"84-X41OueOVtN5jHlrqkvduTe148Pc" <br> Date: Wed, 29 Jul 2026 12:47:17 GMT <br> Connection: keep-alive <br> Keep-Alive: timeout=5 <br><br>[{"id":1,"title":"Take a Bath","done":true},{"id":2,"title":"Exercise","done":true},{"id":3,"title":"Practice coding","done":false}] | <img width="1205" height="281" alt="get all" src="https://github.com/user-attachments/assets/508a128c-58f2-4a19-ab60-08db554dfcb8" />
| GET /tasks/{id} | Getting an item based on a given ID | HTTP/1.1 200 OK <br> X-Powered-By: Express <br> Content-Type: application/json; charset=utf-8 <br> Content-Length: 42 <br> ETag: W/"2a-xm+Lyaubog/wGIKFesnhJHpFy44" <br> Date: Wed, 29 Jul 2026 12:50:05 GMT<br>Connection: keep-alive<br>Keep-Alive: timeout=5<br><br>{"id":1,"title":"Take a Bath","done":true}``` | <img width="1205" height="118" alt="get by id" src="https://github.com/user-attachments/assets/80569325-0c51-4764-a74a-4532650b8512" />
| POST /tasks/{id} | Creating an item and adding it to the overall list | HTTP/1.1 201 Created<br>X-Powered-By: Express<br>Content-Type: application/json; charset=utf-8<br>Content-Length: 171<br>ETag: W/"ab-4jVUOW7909l4ozQEmQDl7mCoqXM"<br>Date: Fri, 31 Jul 2026 06:43:34 GMT<br>Connection: keep-alive<br>Keep-Alive: timeout=5<br><br>[{"id":1,"title":"Take a Bath","done":true},{"id":2,"title":"Exercise","done":true},{"id":3,"title":"Practice coding","done":false},{"id":4,"title":"Task 4","done":false}] |<img width="1209" height="352" alt="post" src="https://github.com/user-attachments/assets/3d189d8d-e015-4aaf-a3be-433ae3e837f2" />
| PUT /tasks/{id} | Updating an item that reflects on the overall list | HTTP/1.1 200 OK<br>X-Powered-By: Express<br>Content-Type: application/json; charset=utf-8<br>Content-Length: 173<br>ETag: W/"ad-NskWbG9AFeKFN3CApJol2bqjzkE"<br>Date: Fri, 31 Jul 2026 06:46:16 GMT<br>Connection: keep-alive<br>Keep-Alive: timeout=5<br><br>[{"id":1,"title":"Take a Bath","done":true},{"id":2,"title":"Exercise","done":true},{"id":3,"title":"Practice coding","done":false},{"id":4,"title":"Buy milk","done":false}] | <img width="1209" height="354" alt="put" src="https://github.com/user-attachments/assets/ef3283b8-7714-43f0-8b78-4995b0c17173" />
| DELETE /tasks/{id} | Deleting an item on the list | HTTP/1.1 204 No Content<br>X-Powered-By: Express<br>Date: Fri, 31 Jul 2026 06:46:51 GMT<br>Connection: keep-alive<br>Keep-Alive: timeout=5 | <img width="1206" height="163" alt="delete" src="https://github.com/user-attachments/assets/8af6471b-9d64-4a5f-8423-e0a8d520aea6" />

## Database

### Why use Sqlite? <br>
- Sqlite requires minimal to zero setup, it also offers a single file configuration, and every server restarts; every items in the database stays unchanged.

### How does it work? <br>
- Upon launching the main.js file, the file called "tasks.db" will be created. This will be your database and it will stay in with your folder.

### How to install Sqlite? <br>
- You can use this command to download sqlite within node.js: <br>
Command: `npm install better-sqlite3`

<img width="1920" height="1020" alt="Screenshot 2026-08-16 001559" src="https://github.com/user-attachments/assets/829f6a9e-524f-438e-a0fe-dc074a6ccf74" />
<img width="1920" height="1020" alt="Screenshot 2026-08-16 001615" src="https://github.com/user-attachments/assets/072dac04-c57f-43ca-949f-000687e3521e" />

## Docker for POSTGRESQL<br><br>

- Download Docker Desktop and make sure it is running.<br>
- Copy the env.example to your own .env with your own password.<br>
- Start the stack with `docker compose up --build.`<br>
<br>

### Useful Docker Commands
| Command | What it does |
| --- | --- |
| `docker ps` | Lists running containers |
| `docker ps -a` | Lists all containers, including stopped ones |
| `docker stop taskdb` | Stops the container (data stays in the volume) |
| `docker start taskdb` | Starts it again |
| `docker logs taskdb` | Shows the container's output, useful for errors |
| `docker rm taskdb` | Deletes the container (the volume stays) |

The API is at http://localhost:3000 and the Swagger page is at http://localhost:3000/docs. Stop everything with docker compose down (your data is kept in a Docker volume).<br><br>

### How It Works 

<br><br>
The whole container starts up with `docker compose up --build.`and then the user inputs the task title and if its done with a true or false and then, it will go through the post route and the task.js file will do the store and came back to the mail.js back to the user. This works on all CRUD operations. Even we type `docker compose down` to shutdown the whole container and we start it again, the contents that we did last time before we shut it down stays.<br><br>

### Example
`$ curl -i http://localhost:3000/tasks
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 179
ETag: W/"b3-ZigE0rVJeVzN2H56AWnwL459WkM"
Date: Sat, 21 Nov 2026 16:19:59 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"title":"Take a bath","done":false},{"id":2,"title":"Exercise","done":false},{"id":3,"title":"Practice Coding","done":false},{"id":4,"title":"Learn Docker","done":false}]`