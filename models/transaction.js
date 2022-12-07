const DataTypes = require("sequelize");
const sequelize = require('../db/connect')
const Transaction = sequelize.define("payment_transactions", {
   user: {
     type: DataTypes.STRING,
     allowNull: false
   },
   farm_investment: {
     type: DataTypes.STRING,
     allowNull: false
   },
   total_amount: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
   amount_per_unit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
   number_of_units: {
     type: DataTypes.INTEGER,
     allowNull: false
   }
});
sequelize.sync().then(() => {
    console.log('Datatable table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 module.exports = Transaction