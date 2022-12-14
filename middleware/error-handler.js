const errorHandler = require('../error/customError')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof errorHandler){
    return res.status(err.statusCode).json({msg: err.message})
  }
  return res.status(500).send(err.message)
}
module.exports = errorHandlerMiddleware
