var HistoryRepository = require('../repositories/historyRepository');

module.exports = {

    /**
     * Handle the fetch all history command
     *
     * @param collectionKey
     * @param callback
     */
    handle: function (collectionKey, callback) {

        var historyRepo = new HistoryRepository();

        historyRepo.on('success', function (result) {
            callback(null, result);
        }).on('error', function (err) {
            callback(err, null);
        });

        historyRepo.getAllForKey(collectionKey);
    }
};