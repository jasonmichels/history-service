var HistoryRepository = require('../repositories/historyRepository');

module.exports = {

    /**
     * Save the history
     *
     * @param collectionKey
     * @param json
     * @param callback
     */
    handle: function (collectionKey, json, callback) {

        var historyRepo = new HistoryRepository();

        historyRepo.on('success', function (result) {
            callback(null, result);
        }).on('error', function (err) {
            callback(err, null);
        });

        historyRepo.insertOrUpdateIfExists(collectionKey, json);
    }
};