const router = require('express').Router();
const Dirt = require('../model/Dirt');
const auth = require("../middleware/auth");

/* register api */

router.post('/register', async (req, res) => {

   // checking if the directeur de thèse is already in the database 

   const docExist =  await Dirt.findOne({nom: req.body.nom},{prenom: req.body.prenom});
   if (docExist) return res.status(400).send('Directeur de thèse déjà crée');
   

  // create a new directeur de thèse 

  const dirt = new Dirt({
    nom: req.body.nom,
    prenom: req.body.prenom,
    grade: req.body.grade,
    etabori: req.body.etabori, 
    laborata: req.body.laborata,
    name: req.body.name,
    password:  req.body.password,
  });

  try{
    const savedDirt = await dirt.save();
      res.send(savedDirt);
  }catch(err){
       res.status(400).send(err);
   }
  
});

router.get("/", auth, async (req, res) => {
  const dirt = await Dirt.findById(req.dirt);
  res.json({
    id: dirt._id,
  });
});


module.exports = router;