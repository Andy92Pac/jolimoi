const express = require('express');
const router = express.Router();
const controller = require('./../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jolimoi' });
});

router.post('/romanian', controller.romanian);

module.exports = router;
