var express = require('express');
var router = express.Router();
var historyRepository = require('../repositories/historyRepository');

/**
 * Get all history for a key
 */
router.get('/:client/:key', function(req, res, next) {

  var collectionKey = req.params.client + '/' + req.params.key;

  historyRepository.getAllForKey(collectionKey, function (docs) {
    res.json(docs);
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

  historyRepository.insertOrUpdateIfExists(collectionKey, json, function () {
    console.log("Inserted a document into the collection. " + collectionKey);
  });

});

module.exports = router;
