const express = require('express')
const router = express.Router()
const payment = require('../controller/flutterwave')
const authenticationMiddleware = require('../middleware/jwtauth')
const {adminCheck} = require('../middleware/loggedIn')
router.route('/').post(authenticationMiddleware,adminCheck,payment)
module.exports = router