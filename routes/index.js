const express = require('express');
const router = express.Router();
const controller = require('./../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jolimoi' });
});

router.post('/romain', controller.romain);

module.exports = router;
