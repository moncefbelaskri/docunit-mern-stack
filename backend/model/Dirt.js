const mongoose = require('mongoose');

const dirtSchema = new mongoose.Schema({
    dirnom: {
        type: String,
        required : true,
        unique: true,
    },
    dirprenom: {
        type: String,
        required : true,
        unique: true,
    },
    dirgrade: {
        type: String,
        required : true,
    },
    diretabori: {
        type: String,
        required : true,
    },
    dirlaborata: {
        type: String,
        required : true,
    },
    dirnumtel: {
        type: String,
        required : true,
    },
    dirmail: {
        type: String,
        required : true,
    },
});

module.exports = mongoose.model('Dirt',dirtSchema);