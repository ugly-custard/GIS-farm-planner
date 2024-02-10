FROM node:20.4.0

RUN apt-get update && apt-get install python3-pip -y

WORKDIR /app

COPY . .

RUN npm install

#for linux

# RUN xargs apt-get -y install < requirements.txt

# for windows

# RUN apt-get -y install python3-numpy
# RUN apt-get -y install python3-pandas
# RUN apt-get -y install python3-psycopg2
# RUN apt-get -y install python3-sqlalchemy
# RUN apt-get -y install python3-matplotlib
# RUN apt-get -y install python3-seaborn
# RUN apt-get -y install python3-sklearn

CMD [ "node", "server/server.js" ]
