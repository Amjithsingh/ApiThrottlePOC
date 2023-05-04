var express = require('express');
var router = express.Router();
const IP = require('ip');
const apiRateLimiter = require('../middleware/rate-limiter')

/* GET users listing. */
router.get('/', apiRateLimiter, function(req, res, next) {
  // res.send('respond with a resource');
  const ipAddress = IP.address();

  // const ipAddresses = req.header('x-forwarded-for');
  console.log(ipAddress)
  res.send(ipAddress);
});

module.exports = router;
