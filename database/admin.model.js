const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Admin = new Schema({
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
    }
});
module.exports = mongoose.model('Admin', Admin);