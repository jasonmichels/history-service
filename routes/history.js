var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/testing'; // move to config

/* GET history listing page. */
router.get('/:client/:key', function(req, res, next) {
  var client = req.params.client;
  var key = req.params.key;
  var collectionKey = client + '/' + key;

  // @TODO first potentially check to see if the data is in memory cache before hitting database

  // Connect to database and get the data if not in cache
  MongoClient.connect(url, function(err, db) {
    // Get the collection
    var collection = db.collection(collectionKey);

    // Peform a simple find and return all the documents
    collection.find().toArray(function(err, docs) {
      res.json(docs);
      db.close();
    });
  });
});

/* PUT save an item to the database. */
router.get('/put/:client/:key', function(req, res, next) {
  var client = req.params.client;
  var key = req.params.key;
  var collectionKey = client + '/' + key;

  // Return quick and continue processing database request
  res.json({ message: "Inserted item into database", status: "success" });

  // @TODO Get this from the body of the request
  var json = {
    "address" : {
      "street" : "123 main st",
      "zipcode" : "55410"
    },
    "name" : "Jason",
    "restaurant_id" : "888888"
  };

  // Save json to the database, if it does not exist.  If it exists then do an update
  MongoClient.connect(url, function(err, db) {
    if (err) {
      // @TODO get rid of this console.log
      console.log('error connection to database. We should log data and use a circuit breaker here');
    }
    // Get the collection
    var collection = db.collection(collectionKey);

    collection.updateOne(json, json, {upsert:true}, function(err, result) {
      if (err) {
        // @TODO get rid of this console.log
        console.log('error inserting into database. We should log data and use a circuit breaker');
      }
      // @TODO get rid of this console.log
      console.log("Inserted a document into the " + client + "/" + key + " collection.");
      db.close();
    });
  });

});

module.exports = router;
