const bcrypt = require('bcrypt')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const encrytUserPassword = (req, res) => {
    const { email, password } = req.body
    bcrypt.hash(password, 2, (err, hash) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Error occured in hashing' });
        }
        let userCredentials = {
            "email": email,
            "password": hash
        }
        fs.readFile('users/users.json', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error adding user' });
            }
            const users = JSON.parse(data)

            users.users.push(
                {
                    email,
                    hash,
                }
            )
            fs.writeFile('users/users.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.log(err)
                }
            })
            jwt.sign(req.body, process.env.SECRET, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    res.status(404).json({
                        "message": "Error Occured"
                    })
                } else {
                    res.json({
                        "token": token,
                    })
                }
            })
        })

    })
}

module.exports = {
    encrytUserPassword,
}