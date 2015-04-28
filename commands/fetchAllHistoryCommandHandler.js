var historyRepository = require('../repositories/historyRepository');
var circuitBreakerClass = require('../circuitBreakers/circuitBreaker');

module.exports = {

    handle: function (collectionKey, callback) {

        var circuitBreaker = new circuitBreakerClass('FetchAllHistoryCommandHandler');

        historyRepository.getAllForKey(collectionKey, circuitBreaker, function (err, docs) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, docs);
            }
        });
    }

};