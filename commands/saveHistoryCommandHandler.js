var HistoryRepository = require('../repositories/historyRepository');
var CircuitBreaker = require('../circuitBreakers/circuitBreaker');

module.exports = {

    /**
     * Save the history
     *
     * @param collectionKey
     * @param json
     * @param callback
     */
    handle: function (collectionKey, json, callback) {

        var circuit = new CircuitBreaker('SaveHistoryCommandHandler', {max_failures: 5, call_timeout_ms: 500, reset_timeout_ms: 0});

        var historyRepo = new HistoryRepository();

        historyRepo.on('success', function (result) {
            circuit.success();
            callback(null, result);
        }).on('error', function (err) {
            circuit.exception(err);
            callback(err, null);
        }).on('rejected', function (err) {
            circuit.rejected(err);
            callback(err, null);
        });

        historyRepo.insertOrUpdateIfExists(collectionKey, json);
    }
};