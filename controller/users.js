const {User} = require('../models/users')
const getAllUsers = async (req,res) => {
    const users = await User.findAll()
    res.status(200).json({ users, nbhits: users.length })
}
const getUser = async (req,res) => {
    const { id } = req.params
    const users = await User.findOne({
        where: {
            id 
        }
    })
    res.status(200).json({ users })
}
module.exports = {getAllUsers,getUser}