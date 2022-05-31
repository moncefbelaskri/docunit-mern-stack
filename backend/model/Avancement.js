const mongoose = require('mongoose');



const avancementSchema = new mongoose.Schema({

    usernamedoc: {
        type: String,

        required : true,
    },


    pctav: {

        type: String,

        required : true,

    },

    datesout: {

        type: String,

        required : true,

    },

    etav: {

        type: String,

        required : true,

    },

    aneactu: {

        type: Number,

        max:5,
        
        required : true,

    },



});





module.exports = mongoose.model('Avancement',avancementSchema);