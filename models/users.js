const DataTypes = require("sequelize");
const sequelize = require('../db/connect')
const validator = require('validator')
const User = sequelize.define("application_users", {
   name: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
     required: [true,'Please provide your name']
   },
   email: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
     validate: { isEmail: true },
     required: [true,'Your email is required']
   },
   email_verified: {
     type: DataTypes.BOOLEAN,
     allowNull: false,
   },
   role: {
    type: DataTypes.STRING,
    defaultValue: "primary_user",
    enum: ['primary_user','admin_user']
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

const Wallet = sequelize.define("user_wallets", {
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  },
 
);
User.hasOne(Wallet);
Wallet.belongsTo(User);
sequelize.sync().then(() => {
    console.log('Database table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 module.exports = {User,Wallet}