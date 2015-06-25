var express = require('express');
var router = express.Router();
var fetchAllHistoryCommandHandler = require('../commands/fetchAllHistoryCommandHandler');
var saveHistoryCommandHandler = require('../commands/saveHistoryCommandHandler');
var AccessTokenAuthentication = require('../lib/accessTokenAuthentication');

/**
 * Get all history for a key
 */
router.get('/:client/:key', function(req, res, next) {

    var Authentication = new AccessTokenAuthentication();

    Authentication.on('success', function(user) {

        var collectionKey = req.params.client + '/' + req.params.key;

        fetchAllHistoryCommandHandler.handle(collectionKey, function (err, result) {
            if (err) {
                res.status(400);
                res.json({error: err, message: "An error occurred trying to access history"});
            } else {
                res.json(result);
            }
        });

    }).on('responseError', function (result) {
        res.status(401);
        res.json(result);
    }).on('error', function(err) {
        res.status(500);
        res.json({error: err, message: "Unable to connect to user authentication service"});
    });

    Authentication.handle(req.header('access_token'));

});

/**
 * Save a history item to the database if it does not already exist
 */
router.put('/:client/:key', function(req, res, next) {

    var Authentication = new AccessTokenAuthentication();

    Authentication.on('success', function(user) {
        var collectionKey = req.params.client + '/' + req.params.key;
        var json = req.body;

        // Return quick and continue processing database request
        res.json({ message: "Processing history item", status: "success" });

        saveHistoryCommandHandler.handle(collectionKey, json, function (err, result) {
            // Circuit breaker already took care of everything, and user is gone, so not much to do here
        });

    }).on('responseError', function (result) {
        res.status(401);
        res.json(result);
    }).on('error', function(err) {
        res.status(500);
        res.json({error: err, message: "Unable to connect to user authentication service"});
    });

    Authentication.handle(req.header('access_token'));

});

module.exports = router;