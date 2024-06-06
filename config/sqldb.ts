// Get the client
import mysql from 'mysql2';

// Create the connection to database
export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
  port: 3306,
  password: 'admin'
});

// // Using placeholders
// connection.query(
//   'SELECT * FROM `bookings`',
//   function (err, results) {
//     if (err)
//         console.log(err);

//     console.log(results);
// }
// );
// connection.end();