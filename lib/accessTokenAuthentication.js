var util         = require("util");
var EventEmitter = require("events").EventEmitter;
var host = process.env.AUTHENTICATION_URL;
var https = require('https');
var enabled = process.env.AUTHENTICATION_ENABLED;

/**
 * Stuff
 *
 * @constructor
 */
function AccessTokenAuthentication () {
    EventEmitter.call(this);
}

util.inherits(AccessTokenAuthentication, EventEmitter);

/**
 * Handle access token authentication
 */
AccessTokenAuthentication.prototype.handle = function (accessToken) {
    var self = this;

    if (enabled) {
        self.sendAccessTokenValidation(accessToken);
    } else {
        self.emit('success', null);
    }
};

/**
 * Send access token validation
 *
 * @param accessToken
 */
AccessTokenAuthentication.prototype.sendAccessTokenValidation = function (accessToken) {
    var self = this;

    var options = {
        host: host,
        path: '/user?access_token=' + accessToken
    };

    callback = function(response) {
        var statusCode = response.statusCode;
        var headers = JSON.stringify(response.headers);

        var responseString = '';
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            responseString += chunk;
        });

        //the whole response has been recieved
        response.on('end', function () {
            var resultObject = JSON.parse(responseString);

            if (statusCode == 200) {
                self.emit('success', resultObject);
            } else {
                self.emit('responseError', resultObject);
            }
        });
    };

    var req = https.request(options, callback);

    req.on('error', function(err) {
        self.emit('error', err);
    });

    req.end();
};

module.exports = AccessTokenAuthentication;