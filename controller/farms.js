const  FarmInvestment  = require('../models/main')
const createFarm = async (req, res) => {
    const data = {
        name: req.body.name,
        location: req.body.location,
        duration: req.body.duration,
        amount_per_unit: req.body.amount_per_unit
    };
    const farms = await FarmInvestment.create(data)
    res.status(200).json({ farms })
}
const getAllFarms = async (req, res) => {
    const farms = await FarmInvestment.findAll()
    res.status(200).json({ farms, nHbt: farms.length })
};
const getSingleFarm = async (req, res) => {
    const { id } = req.params
    const farms = await FarmInvestment.findOne({
        where: {
            id 
        }
    })
    res.status(200).json({ farms})
};
const updateFarm = async (req, res) => {
    const { id } = req.params
    const farms = await FarmInvestment.update(req.body,{
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
    res.status(200).json({ msg: 'farm updated successfully' ,newUpdate: farmsLeft })
};


const deleteFarm = async (req, res) => {
    const { id } = req.params
    const farms = await FarmInvestment.destroy({
        where: {
          id
        }
    })
    const farmsLeft = await FarmInvestment.findAll()
    res.status(200).json({ msg: 'farm deleted successfully' , farms_remaining: farmsLeft, nHbt: farms.length})
};
module.exports = { createFarm, getAllFarms, getSingleFarm, deleteFarm, updateFarm }