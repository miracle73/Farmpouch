const { db } = require('../db/connect')
const success = async (req,res) => {
    const data = {
        name: req.user._json.name,
        email: req.user._json.email,
        email_verified: req.user._json.email_verified
    };
    const sqlQuery = "INSERT INTO users SET ?";
    const query = await db.query(sqlQuery, data);
    res.status(200).json({ Farms: "Entered the database" })
    console.log(req.user._json.email_verified)
}
const error = async (req,res) => {
    res.send("error logging in")
}
const logout = async (req,res,next) => {
    req.logout(function (err) {
        if (err) { return next(); }
        res.redirect('/')
        });
}
module.exports = {success,error,logout}