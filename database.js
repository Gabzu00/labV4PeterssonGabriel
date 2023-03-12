const sqlite3 = require('sqlite3').verbose();
let sql;


const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

// create table Users
/* sql = 'CREATE TABLE Users(userID PRIMARY KEY, role, name, password)'
db.run(sql) */

// drop table
/* db.run("DROP TABLE Users") */

// insert the data
/* sql = 'INSERT INTO Users(userID, role, name, password) VALUES (?,?,?,?)'
db.run(sql, ["admin", "admin", "admin", "admin"], (err) => {
  if (err) return console.error(err.message);
}); */

// display everyting in Users
sql = 'SELECT * FROM Users';
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach(row => {
    console.log(row);
  })
})
