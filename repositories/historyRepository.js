var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + process.env.NODE_MONGODB_URL + '/' + process.env.NODE_MONGODB_DATABASE_NAME;

module.exports = {

    /**
     * Get all history for the key
     *
     * @param collectionKey
     * @param circuitBreaker
     * @param callback
     */
    getAllForKey: function (collectionKey, circuitBreaker, callback) {
        // @TODO first potentially check to see if the data is in memory cache before hitting database

        // Connect to database and get the data if not in cache
        MongoClient.connect(url, function(err, db) {
            if (err) {
                circuitBreaker.rejected(err);
                callback(err, null);
                db.close();
            } else {
                //Get the collection
                var collection = db.collection(collectionKey);

                // Peform a simple find and return all the documents
                collection.find().toArray(function(err, docs) {
                    if (err) {
                        circuitBreaker.exception(err);
                        callback(err, null);
                        db.close();
                    } else {
                        circuitBreaker.success();
                        callback(null, docs);
                        db.close();
                    }
                });
            }
        });
    },

    /**
     * Update object, unless it exists, then insert
     *
     * @param $collectionKey
     * @param $json
     * @param $callback
     */
    insertOrUpdateIfExists: function ($collectionKey, $json, $callback) {

        // Save json to the database, if it does not exist.  If it exists then do an update
        MongoClient.connect(url, function(err, db) {
            if (err) {
                // @TODO get rid of this console.log
                console.log('error connection to database. We should log data and use a circuit breaker here');
            }
            // Get the collection
            var collection = db.collection($collectionKey);

            collection.updateOne($json, $json, {upsert:true}, function(err, result) {
                if (err) {
                    // @TODO get rid of this console.log
                    console.log('error inserting into database. We should log data and use a circuit breaker');
                }
                db.close();
                $callback();
            });
        });
    }

};