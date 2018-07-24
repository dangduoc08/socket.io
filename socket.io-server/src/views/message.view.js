const messageView = require('express').Router();
// Message Controller
const { messageController } = require('../controllers/message.controller')
// Middleware
const { sendError } = require('../middlewares/sendError.middleware.js');
// Route nào cần _id từ token thì xài
const { verifyToken } = require('../middlewares/verifyToken.middleware.js');

// Use Middleware
messageView.use(verifyToken);
messageView.use(sendError);

messageView.get('/all', async (req, res) => {
    try {
        const allMessages = await messageController.getAllMessages(req._idUser);
        res.send({
            success: true,
            allMessages
        })
    }
    catch (error) {
        res.onError(error)
    }
})

messageView.post('/send', async (req, res) => {
    try {
        const sendMessage = await messageController.sendMessage(req._idUser, req.body.content);
        res.send({
            success: true,
            sendMessage
        })
    }
    catch (error) {
        res.onError(error)
    }
})

module.exports = { messageView };