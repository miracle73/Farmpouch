const DataTypes = require("sequelize");
const sequelize = require('../db/connect')
const FarmInvestment = sequelize.define("farm_investments", {
   name: {
     type: DataTypes.STRING,
     allowNull: false
   },
   location: {
     type: DataTypes.STRING,
     allowNull: false
   },
   duration: {
     type: DataTypes.STRING,
     allowNull: false
   },
   amount_per_unit: {
     type: DataTypes.INTEGER,
     allowNull: false
   }
});
sequelize.sync().then(() => {
    console.log('Datatable table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 module.exports = FarmInvestment