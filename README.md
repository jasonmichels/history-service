# History Microservice

Project is under construction and should not be used by anyone.  This is a microservice to keep a log of the history of entities and their events that need recorded

### Installation Locally For Development (Environment variables need set locally)
```sh
$ cd history-service && npm install
$ DEBUG=history-service:* ./bin/www
```
### Installation With Docker For Development
```sh
$ cd history-service
$ docker build -t <name>/history-service .
$ docker run -it -p 3000:3000 -e "PORT=3000" --link mongodb:mongodb -e "NODE_ENV=development" -e "NODE_MONGODB_URL=mongodb" -e "NODE_MONGODB_DATABASE_NAME=history-service" -e "ANALYTICS_EVENT_ENABLED=false" -e "ANALYTICS_EVENT_HOST=change ip/host" -e "ANALYTICS_EVENT_PORT=3001" -e "AWS_ACCESS_KEY_ID=null" -e "AWS_SECRET_ACCESS_KEY=null" -e "HISTORY_DATABASE_ACCESS=mongodb" -e "DYNAMODB_TABLE_NAME=null" --rm --name history-service <name>/history-service
```

### Production installation with Restart
```sh
$ docker run -d --restart=always -p 3000:3000 -e "PORT=3000" --link mongodb:mongodb -e "NODE_ENV=production" -e "NODE_MONGODB_URL=mongodb" -e "NODE_MONGODB_DATABASE_NAME=history-service" -e "ANALYTICS_EVENT_ENABLED=false" -e "ANALYTICS_EVENT_HOST=change ip/host" -e "ANALYTICS_EVENT_PORT=3001" -e "AWS_ACCESS_KEY_ID=null" -e "AWS_SECRET_ACCESS_KEY=null" -e "HISTORY_DATABASE_ACCESS=mongodb" -e "DYNAMODB_TABLE_NAME=null" --name history-service <name>/history-service
```

### Development with Docker Composer
```sh
$ docker-compose up -d
```

### Debugging
To debug ExpressJS framework during development, add the following environment variable to the docker run command
- DEBUG=history-service:*

### Dependencies
 - Running Mongodb server. Suggest using docker and https://registry.hub.docker.com/u/tutum/mongodb/
 ```sh
 $ docker run -d -e AUTH=no --name mongodb tutum/mongodb
 ```

### Todo's
 - Potentially implement alternative configuration loading
 - Update docker compose file to use mongodb linking

### License
This code is maintained by Jason Michels and open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)