const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    avatar: {type: String, trim: true},
    message: [{ type: mongoose.Schema.Types.ObjectId, ref:'messageModel'}]
})

const userModel = mongoose.model("userModel", userSchema);

module.exports = { userModel }