const mysql = require('mysql');
const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Exceptional123!",
  database: 'node_restapi' 
})
const connector = db.connect(err => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Database connected");
});
module.exports = {db, connector}