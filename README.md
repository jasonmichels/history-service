# History Microservice

Project is under construction and should not be used by anyone.  This is a microservice to keep a log of the history of entities and their events that need recorded

### Installation Locally For Development
```sh
$ cd history-service && npm install
$ docker build -t <name>/history-service .
$ DEBUG=history-service:* ./bin/www
```
### Installation With Docker For Development
```sh
$ cd history-service && npm install
$ docker build -t <name>/history-service .
$ docker run -it -p 3000:3000 -e "NODE_ENV=development" -e "NODE_MONGODB_URL=change ip/host" -e "NODE_MONGODB_DATABASE_NAME=testing" --rm --name history-service <name>/history-service
```

### Dependencies
 - Running Mongodb server. Suggest using docker and https://registry.hub.docker.com/u/tutum/mongodb/
 ```sh
 $ docker run -d -e AUTH=no -p 27017:27017 -p 28017:28017 tutum/mongodb
 ```

### Todo's
 - ...

## Contributing
This project is just getting started and a major work in progress.

### License
This code is maintained by Jason Michels and open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)