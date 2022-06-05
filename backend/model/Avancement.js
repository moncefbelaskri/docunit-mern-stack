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
        
        required : true,

    },

    status: {

        type: Boolean,
        required : true,
    },

});





module.exports = mongoose.model('Avancement',avancementSchema);