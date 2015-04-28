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
    res.json({ message: "Inserted item into database", status: "success" });

    var saveHistoryCommandHandler = require('../commands/saveHistoryCommandHandler');
    saveHistoryCommandHandler.handle(collectionKey, json, function (err, result) {
        if (err) {
            console.log('Error inserting into database');
        } else {
            console.log("Inserted a document into the collection. " + collectionKey);
        }
    });

});

module.exports = router;