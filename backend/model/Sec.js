const mongoose = require('mongoose');

const SecSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
    },
    password: {
        type : String,
        required : true,
    },
    role: {
        type : String,
        required : true,
    },
    dept: {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('Sec',SecSchema);