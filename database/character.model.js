const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Character = new Schema({
    name: {
        type: String
    },
    lv: {
        type: String
    },
    image: {
        type: String
    },
    pokemonofyou: [{
        _id: String,
        name: String,
        cp: String,
        lv: String,
        image: String
    }],
    itemofyou: [{
        _id: String,
        infox:{
            name:String,
            image:String,
            infor:String,
            rate:String
        },
        count: String
    }],
    coin:{
        type: Number
    }
});
module.exports = mongoose.model('Character', Character);