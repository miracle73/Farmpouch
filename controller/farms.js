const { db } = require('../db/connect')
const createFarm = async (req, res) => {
    const data = {
        name: req.body.name,
        location: req.body.location,
        duration: req.body.duration,
        amount_per_unit: req.body.amount_per_unit
    };

    const sqlQuery = "INSERT INTO farms SET ?";
    const query = await db.query(sqlQuery, data);
    res.status(200).json({ Farms: "Entered the database" })
    // console.log(req.body)
    // res.json({here: 'got it'})
}
const getAllFarms = async (req, res) => {
    const sqlQuery = "SELECT * FROM farms";

    const query = await db.query(sqlQuery);
    res.status(200).json({ query })
};
const getSingleFarm = async (req, res) => {
    const { id } = req.params
    const sqlQuery = "SELECT * FROM farms WHERE id=" + id;

    const query = await db.query(sqlQuery);
    res.status(200).json({ query })
};
const updateFarm = async (req, res) => {
    const sqlQuery = "UPDATE farms SET name='" + req.body.name + "', location='" + req.body.location + "', duration='" + req.body.duration + "',amount_per_unit='" + req.body.amount_per_unit + "' WHERE id=" + req.params.id;
    const query = db.query(sqlQuery);
    res.status(200).json({ query })
};


const deleteFarm = async (req, res) => {
    const { id } = req.params
    const sqlQuery = "DELETE FROM farms WHERE id=" + id + "";

    const query = await db.query(sqlQuery);
    res.status(200).json({ query })
};
module.exports = { createFarm, getAllFarms, getSingleFarm, deleteFarm, updateFarm }