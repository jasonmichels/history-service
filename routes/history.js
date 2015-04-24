var express = require('express');
var router = express.Router();

/* GET history listing page. */
router.get('/:client/:key', function(req, res, next) {
  var client = req.params.client;
  var key = req.params.key;

  // now that we have client and key, we need to get all the data for that client/key combination

  res.render('history', { title: 'History Title Page' });
});

module.exports = router;
