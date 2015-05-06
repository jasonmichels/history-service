var express = require('express');
var router = express.Router();

/**
 * Get all history for a key
 */
router.get('/:client/:key', function(req, res, next) {

    var collectionKey = req.params.client + '/' + req.params.key;

    var fetchAllHistoryCommandHandler = require('../commands/fetchAllHistoryCommandHandler');
    fetchAllHistoryCommandHandler.handle(collectionKey, function (err, result) {
        if (err) {
            res.json({error: err, message: "An error occurred trying to access history"});
        } else {
            res.json(result);
        }
    });

});

/**
 * Save a history item to the database if it does not already exist
 */
router.put('/:client/:key', function(req, res, next) {

    var collectionKey = req.params.client + '/' + req.params.key;
    var json = req.body;

    // Return quick and continue processing database request
    res.json({ message: "Processing history item", status: "success" });

    var saveHistoryCommandHandler = require('../commands/saveHistoryCommandHandler');
    saveHistoryCommandHandler.handle(collectionKey, json, function (err, result) {
        console.log('Circuit breaker already took care of error, and user is gone, so not much to do here');
    });

});

module.exports = router;