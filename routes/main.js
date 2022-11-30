const express = require('express')
const router = express.Router()
const authenticationMiddleware = require('../middleware/jwtauth')
const {adminCheck} = require('../middleware/loggedIn')
const {createFarm, getAllFarms, getSingleFarm, updateFarm, deleteFarm, changeStatus} = require('../controller/farms')
router.route('/').post(authenticationMiddleware,adminCheck,createFarm).get(authenticationMiddleware, getAllFarms)
router.route('/:id').get(authenticationMiddleware,getSingleFarm).put(authenticationMiddleware,adminCheck,updateFarm).delete(authenticationMiddleware,adminCheck,deleteFarm).post(authenticationMiddleware,adminCheck, changeStatus)
module.exports = router