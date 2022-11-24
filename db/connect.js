const mysql = require('mysql');
// const db = mysql.createConnection({
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "Exceptional123!",
//   database: 'node_restapi' 
// })
// const connector = db.connect(err => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   console.log("Database connected");
// });
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
 'node_restapi',
 'root',
 'Exceptional123!',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize