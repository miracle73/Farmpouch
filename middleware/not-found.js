const notFound = (req, res) => res.status(404).send('Route did not exist')

module.exports = notFound