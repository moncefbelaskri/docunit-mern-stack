const router = require('express').Router();
const CoDirt = require('../model/CoDirt');
const auth = require("../middleware/auth");

/* register api */

router.post('/register', async (req, res) => {

   // checking if the co directeur de thèse is already in the database 

   const docExist =  await CoDirt.findOne({nom: req.body.nom},{prenom: req.body.prenom});
   if (docExist) return res.status(400).send('Co-Directeur de thèse déjà crée');
   

  // create a new co directeur de thèse 

  const codirt = new CoDirt({
    nom: req.body.nom,
    prenom: req.body.prenom,
    grade: req.body.grade,
    etabori: req.body.etabori, 
    laborata: req.body.laborata,
    name: req.body.name,
    password:  req.body.password,
  });

  try{
    const savedCoDirt = await codirt.save();
      res.send(savedCoDirt);
  }catch(err){
       res.status(400).send(err);
   }
  
});

router.get("/", auth, async (req, res) => {
  const codirt = await CoDirt.findById(req.codirt);
  res.json({
    id: codirt._id,
  });
});


module.exports = router;