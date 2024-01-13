// models/dataStorage.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
connection.connect();

function storeData(dataToStore, callback) {
  const sql = 'INSERT INTO data (field1, field2) VALUES (?, ?)';
  const values = [dataToStore.field1, dataToStore.field2];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  storeData,
};
