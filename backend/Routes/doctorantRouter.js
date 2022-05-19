const router = require('express').Router();
const Doctorant = require('../model/Doctorant');
const auth = require("../middleware/auth");

/* register api */

router.post('/register', async (req, res) => {

   // checking if the doctorant is already in the database 

   const docExist =  await Doctorant.findOne({nom: req.body.nom},{prenom: req.body.prenom});
   if (docExist) return res.status(400).send('Doctorant déjà crée');
   

  // create a new doctorant 

  const doctorant = new Doctorant({
    nom: req.body.nom,
    prenom: req.body.prenom,
    dateN: req.body.dateN,
    lieuN: req.body.lieuN,
    adresse: req.body.adresse,
    numtel: req.body.numtel,
    mail: req.body.mail,
    etapro: req.body.etapro,
    anebac: req.body.anebac,
    seribac: req.body.seribac,
    numbac: req.body.numbac,
    dept: req.body.dept,
    catdoc: req.body.catdoc,
    derdip: req.body.derdip,
    spederdip: req.body.spederdip,
    datederdip: req.body.datederdip,
    datepremdoc: req.body.datepremdoc,
    spedoc: req.body.spedoc,
    laborata: req.body.laborata,
    intithe: req.body.intithe,
    datesout: req.body.datesout,
    name: req.body.name,
    password:  req.body.password,
  });

  try{
    const savedDoctorant = await doctorant.save();
      res.send(savedDoctorant);
  }catch(err){
       res.status(400).send(err);
   }
  
});

router.get("/", auth, async (req, res) => {
  const doctorant = await Doctorant.findById(req.doctorant);
  res.json({
    id: doctorant._id,
  });
});


module.exports = router;