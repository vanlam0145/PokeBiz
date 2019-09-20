const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Pokemon = new Schema({
    name: {
        type: String
    },
    cp: {
        type: String
    },
    lv: {
        type: String
    },
    iamge: {
        type: String
    },
    catchBall:{
        type: String
    },
    _idtype: {
        type: String
    },
    lat:{
        type: String
    },
    lng:{
        type: String
    },
    price:{
        type:String
    },
    pb:{
        type:String
    },
    xh:{
        type:Boolean
    },
    dex:{
        type:String
    }
});
module.exports = mongoose.model('Pokemon', Pokemon);