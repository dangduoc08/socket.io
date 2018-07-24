const jwt = require('jsonwebtoken');

const SECRET_KEY = "FOOTO";

function sign (payload) {
    return new Promise(function (resolve, reject) {
        return jwt.sign(payload, SECRET_KEY, {expiresIn: "7d"}, (error, result) => {
            if (error) reject(error);
            resolve(result)
        })
    })
}

function verify (token) {
    return new Promise (function (resolve, reject) {
        return jwt.verify(token, SECRET_KEY, (error,result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}

module.exports = {sign, verify}