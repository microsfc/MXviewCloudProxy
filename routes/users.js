var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/users', function(req, res, next) {
  //res.send('respond with a resource');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(
      {name:'test1',tel:'89191230'}
  ));
});

module.exports = router;
