// // models/dataStorage.js
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });
  
// connection.connect();


// // TODO: This should actually match the DB for Resteraunts and should have another for comments
// function storeRestaurant(dataToStore, callback) {
//   const sql = 'INSERT INTO data (name, adress, longitude, latitude, type) VALUES (?, ?, ?, ?, ?)';
//   const values = [dataToStore.name, dataToStore.adress, dataToStore.longitude, dataToStore.latitude, dataToStore.type];

//   connection.query(sql, values, (error, results) => {
//     if (error) {
//       console.error(error);
//       callback(error, null);
//     } else {
//       callback(null, results);
//     }
//   });
// }

// function storeComment(dataToStore, callback) {
//   const sql = 'INSERT INTO data (title, content, user_id, resteraunt_id) VALUES (?, ?, ?, ?)';
//   const values = [dataToStore.title, dataToStore.content, dataToStore.user_id, dataToStore.resteraunt_id];

//   connection.query(sql, values, (error, results) => {
//     if (error) {
//       console.error(error);
//       callback(error, null);
//     } else {
//       callback(null, results);
//     }
//   });
// }

// module.exports = {
//   storeData,
// };
