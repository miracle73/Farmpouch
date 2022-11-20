function isLoggedIn(req, res, next) {
    const log =    req.user ? next() : res.sendStatus(401);
    return log
    }
    module.exports = isLoggedIn