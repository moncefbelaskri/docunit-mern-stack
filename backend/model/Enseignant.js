const mongoose = require('mongoose');


const enseignantSchema = new mongoose.Schema({



    ensnom: {

        type: String,

        required : true,

    },

    ensprenom: {

        type: String,

        required : true,

    },

    ensmail: {

        type: String,

        required : true,

    },

    ensusername: {

        type: String,

        required : true,

        unique: true,

    },

    enspassword: {

        type : String,

        required : true,

    },

    ensdept: {
        type: String,
        required : true,
    },

    role: {

        type : String,

        required : true,

    }

});



module.exports = mongoose.model('Enseignant',enseignantSchema);