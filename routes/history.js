var express = require('express');
var router = express.Router();
var historyRepository = require('../repositories/historyRepository');

/* GET history listing page. */
router.get('/:client/:key', function(req, res, next) {

  var collectionKey = req.params.client + '/' + req.params.key;

  historyRepository.getAllForKey(collectionKey, function (docs) {
    res.json(docs);
  });

});

/* PUT save an item to the database. */
router.get('/put/:client/:key', function(req, res, next) {

  var collectionKey = req.params.client + '/' + req.params.key;

  // Return quick and continue processing database request
  res.json({ message: "Inserted item into database", status: "success" });

  // @TODO Get this from the body of the request
  var json = {
    "address" : {
      "street" : "123 main st",
      "zipcode" : "55410"
    },
    "name" : "Jason",
    "restaurant_id" : "9999999"
  };

  historyRepository.insertOrUpdateIfExists(collectionKey, json, function () {
    console.log("Inserted a document into the collection. " + collectionKey);
  });

});

module.exports = router;
