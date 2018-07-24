// Modules
const { hash, compare } = require('bcryptjs');

// User Model
const { userModel } = require('../models/user.model.js');

// Xử lý lỗi
const { MyError } = require('../libs/MyError.js');

// Check Obj Id
const { checkObjId } = require('../libs/checkObjId.js');

// Thêm token
const { sign, verify } = require('../libs/jwt');

class userController {
    // Đăng ký
    static async signUpUser(firstName, lastName, email, plainPassword, avatar) {
        if (!firstName || !lastName || !email || !plainPassword) {
            throw new MyError("MISSING_USER_INFO", 400)
        }
        // Nếu có up avatar thì lưu tên file vào database
        let fileName = '';
        if (avatar) fileName = avatar.filename;
        // Kiểm tra trùng email
        const isDuplicateInfo = await userModel.find({ email });
        if (isDuplicateInfo.length > 0) {
            throw new MyError("DUPLICATED_USER_INFO", 400)
        }
        const password = await hash(plainPassword, 10);
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password,
            avatar: fileName
        })
        const signUpUser = await newUser.save();
        return signUpUser;
    }

    // Đăng nhập
    static async signInUser(email, plainPassword) {
        if (!email || !plainPassword) {
            throw new MyError("MISSING_USER_INFO", 400)
        }

        // So sánh username trước
        const signInUser = await userModel.findOne({ email });
        if (!signInUser) {
            throw new MyError("INCORRECT_USER_INFO", 400)
        }

        // So sánh password
        const isPasswordMatch = await compare(plainPassword, signInUser.password);
        if (isPasswordMatch === false) {
            throw new MyError("INCORRECT_USER_INFO", 400)
        }

        // gửi kèm token
        const objSignInUser = signInUser.toObject();
        const token = await sign({ _id: objSignInUser._id });
        objSignInUser.token = token;
        // không trả về password
        delete objSignInUser.password;
        return objSignInUser;
    }

    // Check đăng nhập
    static async verifySignIn(_id) {
        if (!_id) {
            throw new MyError("MISSING_USER_INFO", 400)
        }
        checkObjId(_id);
        const verifySignIn = await userModel.findById(_id);
        if (!verifySignIn) throw new MyError('INVALID_ID', 400);
        const objVerifySignIn = verifySignIn.toObject();
        const token = await sign({ _id: objVerifySignIn._id });
        objVerifySignIn.token = token;
        // không trả về password
        delete objVerifySignIn.password;
        return objVerifySignIn;
    }
}

module.exports = { userController }