// User Model
const { userModel } = require('../models/user.model.js');

// Message Model
const { messageModel } = require('../models/message.model');

// Xử lý lỗi
const { MyError } = require('../libs/MyError.js');

// Check Obj Id
const { checkObjId } = require('../libs/checkObjId.js');

class messageController {
    static async getAllMessages(_idUser) {
        // Phải đăng nhập mới được xem tất cả message
        if (!_idUser) throw new MyError('YOU_NEED_SIGN_IN_TO_VIEW_MESSAGE', 400);
        const getAllMessages = await messageModel.find().sort([['created_at', 1]]).populate('author');
        return getAllMessages;
    }

    static async sendMessage(_idUser, content) {
        if (!_idUser) throw new MyError('YOU_NEED_SIGN_IN_TO_SEND_MESSAGE', 400);
        checkObjId(_idUser);
        const newMessage = new messageModel({
            content,
            author: _idUser
        })
        const saveMessage = await newMessage.save();
        const sendMessage = await messageModel.findById(saveMessage._id).populate('author')
        await userModel.findByIdAndUpdate(_idUser, { $push: { message: sendMessage._id } })
        return sendMessage;
    }
}

module.exports = { messageController }