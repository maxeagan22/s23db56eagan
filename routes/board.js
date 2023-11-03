var express = require('express');
var router = express.Router();

/* GET board page. */
router.get('/', function(req, res, next) {
  res.render('board', { title: 'Board Display' });
});

module.exports = router;