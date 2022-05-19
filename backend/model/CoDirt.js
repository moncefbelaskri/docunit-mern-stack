const mongoose = require('mongoose');

const codirtSchema = new mongoose.Schema({
    codirnom: {
        type: String,
        required : true,
        unique: true,
    },
    codirprenom: {
        type: String,
        required : true,
        unique: true,
    },
    codirgrade: {
        type: String,
        required : true,
    },
    codiretabori: {
        type: String,
        required : true,
    },
    codirlaborata: {
        type: String,
        required : true,
    },
    codirnumtel: {
        type: String,
        required : true,
    },
    codirmail: {
        type: String,
        required : true,
    }
});

module.exports = mongoose.model('CoDirt',codirtSchema);