const express = require("express")
const app = express()
const jwt = require('jsonwebtoken')
require("dotenv").config()
const bcrypt = require('bcrypt')
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const database = require('./database');

var currentKey = ""
var currentPassoword = ""
var role

app.listen(8000)

app.get('/', (req, res) => {
  res.redirect("/LOGIN")
})

app.get('/LOGIN', (req, res) => {
  res.render('Login.ejs')
})

app.post('/LOGIN', async (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  try {
    const rows = await database.getName(name);
    if (typeof rows !== 'undefined' && rows.length === 0) {
      console.log("Not an existing user");
      res.sendStatus(401);
      /* res.render('fail.ejs'); */
    } else {
      console.log("This is an existing user");
      try {
        // since the user in the databse are manually implemented...
        /* const passwordIsValid = await bcrypt.compare(password, rows[0].password); */
        if (password === rows[0].password) {
          console.log("The password is valid");
          // create token
          var token = jwt.sign(name, process.env.ACCESS_TOKEN_SECRET)
          currentKey = token
          currentPassoword = password
          role = rows[0].role
          res.redirect("/granted")
        } else {
          res.sendStatus(401)
          console.log("The password is not valid");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send();
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
})

function authenticateToken(req, res, next) {
  if (currentKey == "") {
    res.redirect("/LOGIN")
  } else if (jwt.verify(currentKey, process.env.ACCESS_TOKEN_SECRET)) {
    next();
  } else {
    res.redirect("/LOGIN")
  }
}

app.get('/granted', authenticateToken, (req, res) => {
  res.render('start.ejs')
})

app.get('/admin', authenticateToken, (req, res) => {
  if (role === "admin") {
    res.render('admin.ejs')
  } else {
    res.sendStatus(401)
  }
})




app.post('/REGISTER', async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword)
    let username = req.body.username
    database.addUser(username, hashedPassword)
    res.redirect('/LOGIN')
    res.status(201).send()

  } catch {
    console.log("dident work...")
    res.status(500).send()
  }

})

app.get('/REGISTER', (req, res) => {
  res.render('register.ejs')
})









/* app.post('/identify', (req, res) => {
  // authentication
  const username = req.body.password
  const token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
  currentKey = token
  currentPassoword = username
  res.redirect("/granted")

})

app.get('/identify', (req, res) => {
  res.render('identify.ejs')
})

function authenticateToken(req, res, next) {
  if (currentKey == "") {
    res.redirect("/identify")
  } else if (jwt.verify(currentKey, process.env.ACCESS_TOKEN_SECRET)) {
    next()
  } else {
    res.redirect("/identify")
  }
}

app.get('/granted', authenticateToken, (req, res) => {
  res.render("start.ejs")
})

app.get('/admin', (req, res) => {
  res.render('admin.ejs')
}) */

