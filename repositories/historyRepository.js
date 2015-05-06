var util         = require("util");
var EventEmitter = require("events").EventEmitter;
var Mongo = require('../lib/mongodb');

function HistoryRepository () {
    EventEmitter.call(this);
}

util.inherits(HistoryRepository, EventEmitter);

/**
 * Get all for key
 *
 * @param collectionKey
 */
HistoryRepository.prototype.getAllForKey = function (collectionKey) {
    var self = this;

    var database = new Mongo();

    database.on('success', function(collection) {

        collection.find().toArray(function(err, result) {
            self.respond(err, result);
        });

    }).on('rejected', function (err) {
        self.emit('rejected', err);
    });

    database.execute(collectionKey);
};

/**
 * Insert or update if exits
 *
 * @param collectionKey
 * @param json
 */
HistoryRepository.prototype.insertOrUpdateIfExists = function (collectionKey, json) {
    var self = this;

    var database = new Mongo();

    database.on('success', function(collection) {

        collection.updateOne(json, json, {upsert:true}, function(err, result) {
            self.respond(err, result);
        });

    }).on('rejected', function (err) {
        self.emit('rejected', err);
    });

    database.execute(collectionKey);
};

/**
 * Respond to the database request by throwing events
 *
 * @param err
 * @param result
 */
HistoryRepository.prototype.respond = function (err, result) {
    var self = this;

    if (err) {
        self.emit('error', err);
    } else {
        self.emit('success', result);
    }
};

module.exports = HistoryRepository;