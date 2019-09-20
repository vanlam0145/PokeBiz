const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    _idacc:{
        type: String
    },
    _idchar:{
        type: String
    }
});
module.exports = mongoose.model('User', User);