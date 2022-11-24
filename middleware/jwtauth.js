const jwt = require('jsonwebtoken')
const errorHandler = require('../error/customError')
const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')){
        throw new errorHandler(`Not authorized`,401) 
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {password, username} = decoded
        req.user = {username, password}
        next()
    } catch (error) {
        throw new errorHandler(`Bad Request`,401) 
    }
}
module.exports = authenticationMiddleware