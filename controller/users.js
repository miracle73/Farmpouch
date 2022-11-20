const { db } = require('../db/connect')
const getAllUsers = async (req,res) => {
    const sqlQuery = "SELECT * FROM users";

    const query = await db.query(sqlQuery);
    
    console.log(sqlQuery)
    res.status(200).json({ query })
}
const getUser = async (req,res) => {
    const { id } = req.params
    const sqlQuery = "SELECT * FROM users WHERE id=" + id;

    const query = await db.query(sqlQuery);
    res.status(200).json({ query })
}
module.exports = {getAllUsers,getUser}