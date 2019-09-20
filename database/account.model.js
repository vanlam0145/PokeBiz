const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Account = new Schema({
    username: {
        type: String
    },
    pass: {
        type: String
    },
    createdate: {
        type: Date
    },
    isadmin: {
        type: Boolean
    }
});
module.exports = mongoose.model('Account', Account);