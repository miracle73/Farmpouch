const DataTypes = require("sequelize");
const sequelize = require('../db/connect')
const FarmInvestment = sequelize.define("farm_investments", {
   name: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
     required: [true,'Please provide the name of this farm investment']
   },
   location: {
     type: DataTypes.STRING,
     allowNull: false,
     required: [true,'Please provide the location of this farm investment']
   },
   duration: {
     type: DataTypes.STRING,
     allowNull: false,
     required: [true,'Please provide the duration of this farm investment']
   },
   amount_per_unit: {
     type: DataTypes.INTEGER,
     allowNull: false,
     required: [true,'Please provide the amount per unit of this farm investment']
   },
   status: {
    type: DataTypes.STRING,
    defaultValue: "non-available",
    enum: ['available','non-available']
  }
});
sequelize.sync().then(() => {
    console.log('Datatable table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 module.exports = FarmInvestment