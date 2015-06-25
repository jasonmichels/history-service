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
$ docker run -it -p 3000:3000 -e "PORT=3000" -e "NODE_ENV=development" -e "AUTHENTICATION_ENABLED=true" -e "AUTHENTICATION_URL=id.website.com" -e "NODE_MONGODB_URL=change ip/host" -e "NODE_MONGODB_DATABASE_NAME=history-service" -e "ANALYTICS_EVENT_ENABLED=true" -e "ANALYTICS_EVENT_HOST=change ip/host" -e "ANALYTICS_EVENT_PORT=3001" --rm --name history-service <name>/history-service
```

### Production installation with Restart
```sh
$ docker run -d --restart=always -p 3000:3000 -e "PORT=3000" -e "NODE_ENV=production" -e "AUTHENTICATION_ENABLED=true" -e "AUTHENTICATION_URL=id.website.com" -e "NODE_MONGODB_URL=change ip/host" -e "NODE_MONGODB_DATABASE_NAME=history-service" -e "ANALYTICS_EVENT_ENABLED=true" -e "ANALYTICS_EVENT_HOST=change ip/host" -e "ANALYTICS_EVENT_PORT=3001" --name history-service <name>/history-service
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
 $ docker run -d -e AUTH=no -p 27017:27017 -p 28017:28017 tutum/mongodb
 ```

### Todo's
 - Potentially implement alternative configuration loading

### License
This code is maintained by Jason Michels and open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)