var database = require('../lib/mongodb');

module.exports = {

    /**
     * Get all history for the key
     *
     * @param collectionKey
     * @param circuitBreaker
     * @param callback
     */
    getAllForKey: function (collectionKey, circuitBreaker, callback) {
        var self = this;

        database.execute(collectionKey, circuitBreaker, function (collection) {
            // Peform a simple find and return all the documents
            collection.find().toArray(function(err, result) {
                self.updateCircuitBreaker(err, result, circuitBreaker);
                callback(err, result);
            });
        });
    },

    /**
     * Update object, unless it exists, then insert
     *
     * @param collectionKey
     * @param json
     * @param circuitBreaker
     * @param callback
     */
    insertOrUpdateIfExists: function (collectionKey, json, circuitBreaker, callback) {
        var self = this;

        database.execute(collectionKey, circuitBreaker, function (collection) {
            collection.updateOne(json, json, {upsert:true}, function(err, result) {
                self.updateCircuitBreaker(err, result, circuitBreaker);
                callback(err, result);

            });
        });
    },

    /**
     * Update the circuit breaker with the results
     *
     * @param err
     * @param result
     * @param circuitBreaker
     */
    updateCircuitBreaker: function (err, result, circuitBreaker) {
        if (err) {
            circuitBreaker.exception(err);
        } else {
            circuitBreaker.success();
        }
    }
};