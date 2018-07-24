const userView = require("express").Router();
const multer = require('multer');
// User Controller
const { userController } = require('../controllers/user.controller')
// Middleware
const { sendError } = require('../middlewares/sendError.middleware.js');
// Route nào cần _id từ token thì xài
const { verifyToken } = require ('../middlewares/verifyToken.middleware.js');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb (null, './src/assets')
    },
    filename: (req, file, cb) => {
        cb (null, file.originalname)
    }
})

const upload = multer ({
    storage
})

userView.use(sendError);

userView.post('/signup',upload.single('avatar'), async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            plainPassword } = req.body;
        const signUpUser = await userController.signUpUser(
            firstName,
            lastName,
            email,
            plainPassword,
            req.file
        );
        res.send({
            success: true,
            signUpUser
        })
    }
    catch (error) {
        res.onError(error)
    }
})

userView.post('/signin', async (req, res) => {
    try {
        const { email, plainPassword } = req.body;
        const signInUser = await userController.signInUser(email, plainPassword);
        res.send({
            success: true,
            signInUser
        })
    }
    catch (error) {
        res.onError(error)
    }
})

userView.get('/verify', verifyToken, async (req, res) => {
    try {
        const verifySignIn = await userController.verifySignIn(req._idUser);
        res.send({
            success: true,
            verifySignIn
        })
    }
    catch (error) {
        res.onError(error)
    }
})

module.exports = { userView };