const mongoose = require('mongoose');

const doctorantSchema = new mongoose.Schema({
    
    nom: {
        type: String,
        required : true,
        
    },
    prenom: {
        type: String,
        required : true,
       
    },
    username: {
        type: String,
        required : true,
        unique: true,
    },
    password: {
        type : String,
        required : true,
    },
    dateN: {
        type: String,
        required : true,
    },
    lieuN: {
        type: String,
        required : true,
    },
    adresse: {
        type: String,
        required : true,
    },
    numtel: {
        type: String,
        required : true,
    },
    mail: {
        type: String,
        required : true,
    },
    etapro: {
        type: String,
        required : true,
    },
    preci: {
        type: String,
    },
    anebac: {
        type: Number,
        required : true,
    },
    seribac: {
        type: String,
        required : true,
    },
    numbac: {
        type: Number,
        required : true,
    },
    dept: {
        type: String,
        required : true,
    },
    catdoc: {
        type: String,
        required : true,
    },
    derdip: {
        type: String,
        required : true,
    },
    precii: {
        type: String,
    },
    spederdip: {
        type: String,
        required : true,
    },
    datederdip: {
        type: String,
        required : true,
    },
    datepremdoc: {
        type: String,
        required : true,
    },
    spedoc: {
        type: String,
        required : true,
    },
    laborata: {
        type: String,
        required : true,
    },
    intithe: {
        type: String,
        required : true,
    },
    datesout: {
        type: String,
        required : true,
    },
    
    role: {
        type : String,
        required : true,
    },
    dirnom: {
        type: String,
        required : true,
        ref: 'Dirt',
    },
    dirprenom: {
        type: String,
        required : true,
        ref: 'Dirt',
    }, 
    codirnom: {
        type: String,
        required : true,
        ref: 'CoDirt',
    },
    codirprenom: {
        type: String,
        required : true,
        ref: 'CoDirt',
    },
});

module.exports = mongoose.model('Doctorant',doctorantSchema);