FROM node:20

WORKDIR /usr/src/part12/todo-app/todo-frontend

COPY . .

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]