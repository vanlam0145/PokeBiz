const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Item = new Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    infor:{
        type:String
    },
    rate:{
        type:String
    },
    price:{
        type:String
    },
    pb:{
        type:String
    }
});
module.exports = mongoose.model('Item', Item);