var util         = require("util");
var EventEmitter = require("events").EventEmitter;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + process.env.NODE_MONGODB_URL + '/' + process.env.NODE_MONGODB_DATABASE_NAME;
var database = null;

function Mongo () {
    EventEmitter.call(this);
}

util.inherits(Mongo, EventEmitter);

/**
 * Connect to mongodb
 */
Mongo.prototype.connect = function () {
    var self = this;

    // Connect to database and get the data if not in cache
    MongoClient.connect(url, {
        db: {
            retryMiliSeconds: 500,
            numberOfRetries: 5,
            bufferMaxEntries: 100
        },
        server: {
            socketOptions: {
                connectTimeoutMS: 500
            }
        },
        replSet: {},
        mongos: {}
    },function(err, db) {
        if (err) {
            self.emit('rejected', err);
        } else {
            database = db;
            self.emit('connected', db);
        }
    });
};

/**
 * Execute a request
 *
 * @param collectionKey
 */
Mongo.prototype.execute = function (collectionKey) {
    var self = this;

    if (database) {

        var collection = database.collection(collectionKey);
        self.emit('success', collection);

    } else {

        self.on('connected', function (database) {
            var collection = database.collection(collectionKey);
            self.emit('success', collection);
        });

        self.connect();
    }
};

module.exports = Mongo;