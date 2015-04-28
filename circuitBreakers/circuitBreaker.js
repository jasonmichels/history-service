var now = require("performance-now");

var CircuitBreaker = function (commandName, config) {
    console.log('New circuit breaker created for command');
    this.commandName = commandName;
    this.config = config;
    this.error = null;
    this.status = 'closed';
    this.requestTime = null;
    this.startTime = null;
    this.endTime = null;
    this.startProfiling();
};

CircuitBreaker.prototype.execute = function () {
    console.log('Execute the circuit breaker');
    console.log('This is the execute command name: ' + this.commandName);
    console.log('Send message to the circuit breaker analytics application for tracking');
    this.requestTime = (this.endTime-this.startTime).toFixed(3);
    console.log('Request time: ' + this.requestTime);
};

CircuitBreaker.prototype.success = function () {
    console.log('Successfull message was sent');
    this.status = 'closed';
    this.stopProfiling();
    this.execute();
};

CircuitBreaker.prototype.rejected = function (err) {
    console.log('Request was rejected');
    this.status = 'open';
    this.error = err;
    this.stopProfiling();
    this.execute();
};

CircuitBreaker.prototype.timeout = function (err) {
    console.log('The request timed out');
    this.status = 'open';
    this.error = err;
    this.stopProfiling();
    this.execute();
};

CircuitBreaker.prototype.exception = function (err) {
    console.log('An exception was found with this class');
    this.status = 'open';
    this.error = err;
    this.stopProfiling();
    this.execute();
};

CircuitBreaker.prototype.startProfiling = function () {
    console.log('Start the request');
    this.startTime = now();

};

CircuitBreaker.prototype.stopProfiling = function () {
    // calculate the request time and set to the class variable
    console.log('Stope the request');
    this.endTime = now();
};

module.exports = CircuitBreaker;