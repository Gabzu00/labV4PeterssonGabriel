const sqlite3 = require('sqlite3').verbose();
let sql;


function connect() {
  const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  });
  return db;
}


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
/* sql = 'SELECT * FROM Users';
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach(row => {
    console.log(row);
  })
}) */


/* const addUser = (username, password) => {
  var db = connect();
  sql = 'INSERT INTO users(username, password) VALUES (?,?)';
  db.run(
    sql,
    [username, password],
    (err) => {
      if (err) return console.error(err.message);
    }
  )

  var sql2 = 'SELECT * from users';
  db.all(sql2, [], (err, rows) => {
    if (err) return reject(err);
    console.log(rows);
  });
} */

const getName = (name) => {
  var db = connect();
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * from Users WHERE name = (?)';
    db.all(sql, [name], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  })
}

function getUsers() {
  var db = connect();
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM Users';
    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    })
  })
}

module.exports = {
  getName,
  getUsers
}
