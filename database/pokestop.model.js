const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PokeStop = new Schema({
    name: {
        type: String
    },
    infor: {
        type: String
    },
    coordinates: {
        lat:String,
        lng:String
    },
    itemofpokeStop:[{
        _id: String,
        name:String,
        image:String,
        count: String
    }]
});
module.exports = mongoose.model('PokeStop', PokeStop);