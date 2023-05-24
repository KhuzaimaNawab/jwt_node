const bcrypt = require('bcrypt')
const fs = require('fs')

const authenticateUser = (req, res) => {
    const myUsers = {}
    fs.readFile('users/users.json', (err, data) => {
        if (err) throw err
        const { email, password } = req.body
        const users = JSON.parse(data)
        const currentUser = users['users'].find((user) => user['email'] === email);

        if (currentUser) {
            bcrypt.compare(password, currentUser['hash'], (err) => {
                if (err) {
                    res.json({
                        "message": "Password not matched"
                    })
                } else {
                    res.json({
                        "message": "Login succesfully"
                    })
                }
            })
        } else {
            res.status(404).json({ "message": "Incorrect email" })
        }
    })
}


module.exports = {
    authenticateUser
}