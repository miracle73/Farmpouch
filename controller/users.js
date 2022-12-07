const { User } = require('../models/users')
const Transaction = require('../models/transaction')
const getAllUsers = async (req, res) => {
    const users = await User.findAll()
    res.status(200).json({ users, nbhits: users.length })
}
const getUser = async (req, res) => {
    const { id } = req.params
    const users = await User.findOne({
        where: {
            id
        }
    })
    res.status(200).json({ users })
}
const dashboard = async (req, res) => {
    const { username } = req.user
    const user = await User.findOne({
        where: {
            username
        }
    })
    const transactions = await Transaction.findAll({
        where: {
            user: user.name
        }
    })
    console.log(user.wallet)
    var farmers = []
    var total_count = 0
    for (i=0; i < transactions.length; i++){
        if (!farmers.includes(transactions[i].farm_investment)) {
            // only runs if value not in array
            farmers.push(transactions[i].farm_investment)
          }
        total_count += transactions[i].total_amount
    }
    console.log(farmers,total_count)
    const profile = {
        name: user.name,
        username,
        status: user.role,
        number_of_transactions: transactions.length,
         farms_invested: farmers,
         total_investment: total_count
    }
    res.status(200).json({ profile })
}
module.exports = { getAllUsers, getUser, dashboard }