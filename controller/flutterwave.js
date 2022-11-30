const FarmInvestment = require('../models/main')
const errorHandler = require('../error/customError')
const { Wallet } = require('../models/users')
const { User } = require('../models/users')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const payment = async (req, res) => {
    const {id} = req.body
    const { username } = req.user
    const user = await User.findOne({
        where: {
            username
        }
    })
    const farms = await FarmInvestment.findOne({
        where: {
            id
        }
    })
    const wallet = await Wallet.findOne({
        where: {
            applicationUserId: user.id
        }
    })
    if (farms === null) {
        throw new errorHandler(`Such Farm Investment does not exist`,401) 
    } else if (farms.status === "non-available") {
        throw new errorHandler(`This farm Investment is not available at the moment`,401) 
    } else {
        const paymentmethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: '4242424242424242',
                exp_month: 9,
                exp_year: 2023,
                cvc: '314',
            }
        })
    
        const mainPayment = await stripe.paymentIntents.create({
            payment_method: paymentmethod.id,
            amount: farms.amount_per_unit,
            currency: 'usd',
            confirm: true,
            payment_method_types: ['card'],
        })
        res.json({ clientSecret: mainPayment })
    }
   
}
module.exports = payment
