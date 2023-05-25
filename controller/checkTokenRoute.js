const jwt = require('jsonwebtoken')

const checkTokenRoute = (req, res, token) => {
    if (!token) {
        res.status(404).json({
            "message": "Invalid token"
        })
    }
    console.log(token)
    jwt.verify(token, process.env.SECRET, (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
        }
    })
}

module.exports = {
    checkTokenRoute
}