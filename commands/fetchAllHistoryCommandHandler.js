var historyRepository = require('../repositories/historyRepository');
var circuitBreakerClass = require('../circuitBreakers/circuitBreaker');

module.exports = {

    /**
     * Handle the featch all history command
     *
     * @param collectionKey
     * @param callback
     */
    handle: function (collectionKey, callback) {

        var circuitBreaker = new circuitBreakerClass('FetchAllHistoryCommandHandler', {max_failures: 5, call_timeout_ms: 500, reset_timeout_ms: 0});

        historyRepository.getAllForKey(collectionKey, circuitBreaker, function (err, result) {
            callback(err, result);
        });
    }

};