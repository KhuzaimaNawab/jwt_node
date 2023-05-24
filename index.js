const express = require('express')
const hashPass = require('./controller/encryptPassword');
const authenticateUser = require('./controller/authenticateUser');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/login', (req, res) => {
    authenticateUser.authenticateUser(req, res)
})

app.post('/login', (req, res) => {
    hashPass.encrytUserPassword(req, res)
})

app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})

