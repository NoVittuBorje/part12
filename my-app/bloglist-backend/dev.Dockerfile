FROM node:20

WORKDIR /usr/src/part12/my-app/bloglist-backend

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]