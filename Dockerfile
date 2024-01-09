FROM node:20.4.0

RUN apt-get update && apt-get install python3-pip -y

WORKDIR /app

COPY . .

RUN npm install

# RUN xargs apt-get -y install < requirements.txt

CMD [ "node", "server/server.js" ]
