const moongse = require('mongoose');
const {MyError} = require('./MyError');

function checkObjId (...ids) {
    try {
        ids.forEach(_id => new moongse.Types.ObjectId(_id))
    }
    catch(error) {
        throw new MyError ('INVALID_ID',400)
    }
}

module.exports = {checkObjId}