var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + process.env.NODE_MONGODB_URL + '/' + process.env.NODE_MONGODB_DATABASE_NAME;
var database = null;

module.exports = {

    /**
     * Connect to database
     *
     * @param circuitBreaker
     * @param callback
     */
    connect: function (circuitBreaker, callback) {
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
                circuitBreaker.rejected(err);
                callback(err, null);
            } else {
                database = db;
                callback(null, db);
            }
        });
    },

    /**
     * Execute a database request
     *
     * @param collectionKey
     * @param circuitBreaker
     * @param callback
     */
    execute: function(collectionKey, circuitBreaker, callback) {

        if (database) {

            var collection = database.collection(collectionKey);
            callback(collection);

        } else {

            this.connect(circuitBreaker, function (err, database) {
                if (!err) {
                    var collection = database.collection(collectionKey);

                    callback(collection);
                }
            });

        }
    }
};