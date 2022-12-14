const FarmInvestment = require('../models/main')
const { StatusCodes } = require('http-status-codes')
const errorHandler = require('../error/customError')
const { Wallet } = require('../models/users')
const { User } = require('../models/users')
const createFarm = async (req, res) => {
    const data = {
        name: req.body.name,
        location: req.body.location,
        duration: req.body.duration,
        amount_per_unit: req.body.amount_per_unit
    };
    const { username } = req.user
    console.log(username)
    const reach = await User.findOne({
        where: {
            username
        }
    })
    if (req.body.status) {
        if (reach.role === "admin_user") {
            data.status = req.body.status
        }
    }
    const data2 = {
        balance: req.body.balance,
        username: req.body.username,
        applicationUserId: reach.id
    }
    const farms = await FarmInvestment.create(data)

    res.status(200).json({ farms })
}
const getAllFarms = async (req, res) => {
    console.log(req.query)
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    const farms = await FarmInvestment.findAll({
        limit,
        offset: skip
    })
    res.status(200).json({ farms, nHbt: farms.length })
};
const getSingleFarm = async (req, res) => {
    const { id } = req.params
    const farms = await FarmInvestment.findOne({
        where: {
            id
        }
    })
    res.status(200).json({ farms })
};
const updateFarm = async (req, res) => {
    const { id } = req.params
    const farms = await FarmInvestment.update(req.body, {
        where: {
            id
        }
    })
    console.log(farms)
    const farmsLeft = await FarmInvestment.findOne({
        where: {
            id
        }
    })
    res.status(200).json({ msg: 'farm updated successfully', newUpdate: farmsLeft })
};


const deleteFarm = async (req, res) => {
    const { id } = req.params
    const farms = await FarmInvestment.destroy({
        where: {
            id
        }
    })
    const farmsLeft = await FarmInvestment.findAll()
    res.status(200).json({ msg: 'farm deleted successfully', farms_remaining: farmsLeft, nHbt: farms.length })
};
const changeStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    if (status) {
        if (status === "available" || status === "non-available") {
            const farms = await FarmInvestment.update({ status }, {
                where: {
                    id
                }
            })
            const farmsLeft = await FarmInvestment.findOne({
                where: {
                    id
                }
            })
            return res.status(200).json({ msg: 'farm status updated successfully', updated_farm_details: farmsLeft })
        }
        throw new errorHandler('You provided the wrong status', StatusCodes.EXPECTATION_FAILED)
    }
    throw new errorHandler('Please provide the status you intend updating in the farm investment', StatusCodes.EXPECTATION_FAILED)
};

module.exports = { createFarm, getAllFarms, getSingleFarm, deleteFarm, updateFarm, changeStatus }