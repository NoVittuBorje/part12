# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Visit counter

When running the server, visit http://localhost:3000 to see visit counter, or give environment variable `PORT` to change the port.

# MongoDB

The application has /todos crud which requires a MongoDB. Pass connection url with env `MONGO_URL`

# Redis

Pass connection url with env `REDIS_URL`

docker build -t todo-backend . && docker run -p 3000:3000 todo-backend

docker compose -f docker-compose.dev.yml up

docker container ls

docker exec -it todo-backend-mongo-1 mongosh -u root -p example

show dbs

use the_database

show collections

db.todos.insertOne({text:"juu2",done:false})


docker container ls

docker exec -it todo-backend-redis-1 redis-cli

KEYS *

GET "added_todos"

SET "added_todos" 9001

GET "added_todos"