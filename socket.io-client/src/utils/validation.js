class Validation {
    // Kiểm tra chuỗi có rỗng hay không // return boolean
    static isNotEmpty (...values) {
        let check = true;
        values.forEach (value => {
            if (value.length === 0) {
                check = false;
            }
        })
        return check
    }
    // Kiểm tra có phải email hay không // return boolean
    static isEmail (email) {
        let check = true;
        if (!email.includes('.') ||
        !email.includes('@') ||
        email.length <= 'x@x.xx'.length ||
        email.lastIndexOf('.') + 2 >= email.length || 
        email.lastIndexOf('@') + 2 >= email.length ) 
        {
            check = false
        }
        return check;
    }
    // Kiểm tra password có lớn hơn 6 hay không // return boolean
    static isPassword (pw,minLength) {
        let check = true;
        if (pw.length < minLength) {
            check=false
        }
        return check;
    }
}

export default Validation;