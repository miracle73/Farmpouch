const errorHandler = require('../error/customError')
const User = require('../models/users')
const isLoggedIn = (req, res, next) => {
    const log = req.user ? next() : res.sendStatus(401);
    return log
}
const adminCheck = async (req, res, next) => {
    console.log(req.user)
    const { username, password } = req.user
    const secondUser = await User.findOne({
        where: {
            username
        }
    })
    if (secondUser.role === "primary_user") {
        throw new errorHandler(`You cannot perform this action`, 401)
    } else {
        next()
    }

}
module.exports = { isLoggedIn, adminCheck }