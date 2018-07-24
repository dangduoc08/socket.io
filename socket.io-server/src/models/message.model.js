const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: { type: String, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    }, 
    { timestamps: { createdAt:'created_at', updatedAt:'updated_at' } })

const messageModel = mongoose.model('messageModel', messageSchema);

module.exports = { messageModel }