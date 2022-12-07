const express = require('express')
const router = express.Router()
const { dashboard} = require('../controller/users')
const {isLoggedIn} = require('../middleware/loggedIn')
const {adminCheck} = require('../middleware/loggedIn')
const authenticationMiddleware = require('../middleware/jwtauth')
router.route('/dashboard').get(authenticationMiddleware,dashboard)
module.exports = router