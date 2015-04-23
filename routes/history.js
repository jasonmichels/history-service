var express = require('express');
var router = express.Router();

/* GET history listing page. */
router.get('/', function(req, res, next) {
  res.render('history', { title: 'History Title Page' });
});

module.exports = router;
