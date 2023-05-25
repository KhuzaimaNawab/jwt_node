const express = require('express')
const hashPass = require('./controller/encryptPassword');
const authenticateUser = require('./controller/authenticateUser');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/login', (req, res) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        authenticateUser.authenticateUser(req, res,req.token)
    }
})

app.post('/login', (req, res) => {
    hashPass.encrytUserPassword(req, res)
})

app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})

