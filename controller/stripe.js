const FarmInvestment = require('../models/main')
const errorHandler = require('../error/customError')
const { Wallet } = require('../models/users')
const { User } = require('../models/users')
const Transaction = require('../models/transaction')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const payment = async (req, res) => {
    const { name,number_of_units } = req.body
    const { username } = req.user
    const user = await User.findOne({
        where: {
            username
        }
    })
    const farms = await FarmInvestment.findOne({
        where: {
            name
        }
    })
    const wallet = await Wallet.findOne({
        where: {
            applicationUserId: user.id
        }
    })
    var number
    if (number_of_units){
        number = number_of_units * farms.amount_per_unit
    } else {
        throw new errorHandler(`Please input the number of units you want to invest`, 401)
    }
   
    if (farms === null) {
        throw new errorHandler(`Such Farm Investment does not exist`, 401)
    } else if (farms.status === "non-available") {
        throw new errorHandler(`This farm Investment is not available at the moment`, 401)
    } else {
        if (wallet.balance > number) {
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
                amount: number,
                currency: 'usd',
                confirm: true,
                payment_method_types: ['card'],
            })
            wallet.balance -= number
            wallet.save()
            const transaction = await Transaction.create({
                user: user.name,
                farm_investment: name,
                total_amount: number,
                amount_per_unit: farms.amount_per_unit,
                number_of_units
            })
            res.json({ msg: 'transaction created successfully', number_of_units, Farm_investment: farms.name, clientSecret: mainPayment })
        } else {
            throw new errorHandler(`Sorry you have insufficient balance in your account to pay for this farm investment`, 401)
        }
    }

}
module.exports = payment
