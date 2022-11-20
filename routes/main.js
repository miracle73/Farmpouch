const express = require('express')
const router = express.Router()
const {createFarm, getAllFarms, getSingleFarm, updateFarm, deleteFarm} = require('../controller/farms')
router.route('/').post(createFarm).get(getAllFarms)
router.route('/:id').get(getSingleFarm).put(updateFarm).delete(deleteFarm)
module.exports = router