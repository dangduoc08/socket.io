const { verify } = require('../libs/jwt.js');

async function verifyToken(req, res, next) {
    try {
        req._idUser = (await verify(req.headers.token))._id;
        next()
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: 'INVALID_TOKEN',
            statusCode: 400
        })
    }
}   
// Route nào cần _id từ token thì xài
module.exports = { verifyToken }