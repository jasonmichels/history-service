var historyRepository = require('../repositories/historyRepository');
var circuitBreakerClass = require('../circuitBreakers/circuitBreaker');

module.exports = {

    /**
     * Save the history
     *
     * @param collectionKey
     * @param json
     * @param callback
     */
    handle: function (collectionKey, json, callback) {

        var circuitBreaker = new circuitBreakerClass('SaveHistoryCommandHandler', {max_failures: 5, call_timeout_ms: 500, reset_timeout_ms: 0});

        historyRepository.insertOrUpdateIfExists(collectionKey, json, circuitBreaker, function (err, result) {
            callback(err, result);
        });
    }
};