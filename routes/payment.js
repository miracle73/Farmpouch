const express = require('express')
const router = express.Router()
const payment = require('../controller/stripe')
const authenticationMiddleware = require('../middleware/jwtauth')
const {adminCheck} = require('../middleware/loggedIn')
router.route('/').post(authenticationMiddleware,payment)
module.exports = router