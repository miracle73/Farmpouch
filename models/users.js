const DataTypes = require("sequelize");
const sequelize = require('../db/connect')
const User = sequelize.define("application_users", {
   name: {
     type: DataTypes.STRING,
     allowNull: false
   },
   email: {
     type: DataTypes.STRING,
     allowNull: false
   },
   email_verified: {
     type: DataTypes.BOOLEAN,
     allowNull: false
   },
   role: {
    type: DataTypes.STRING,
    defaultValue: "primary_user",

  },
  username: {
    type: DataTypes.STRING,
    allowNull: true

  },
  password: {
    type: DataTypes.STRING,
    allowNull: true

  }
});
sequelize.sync().then(() => {
    console.log('Database table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 module.exports = User