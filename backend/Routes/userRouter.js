const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Doctorant = require('../model/Doctorant');
const Dirt = require('../model/Dirt');
const CoDirt = require('../model/CoDirt');
const auth = require("../middleware/auth");
const jwt = require('jsonwebtoken');

/* register_doc api */

router.post("/register_doc", async (req, res) => {
  try {
 
    let { username } = req.body;
    
      // checking if the doc is already in the database

    const ExUsernameDoc = await Doctorant.findOne({ username: username });

    if (ExUsernameDoc )
    {
      return res.status(400).json({ msg: "doctorant existe déjà." });
    }
    // create doctorant

    const newDoc = new Doctorant({
      nom: req.body.nom,
      prenom: req.body.prenom,
      username,
      password: req.body.password,
      dateN: req.body.dateN,
      lieuN: req.body.lieuN,
      adresse: req.body.adresse,
      numtel: req.body.numtel,
      mail: req.body.mail,
      etapro: req.body.etapro,
      preci: req.body.preci,
      anebac: req.body.anebac,
      seribac: req.body.seribac,
      numbac: req.body.numbac,
      dept: req.body.dept,
      catdoc: req.body.catdoc,
      derdip: req.body.derdip,
      precii: req.body.precii,
      spederdip: req.body.spederdip,
      datederdip: req.body.datederdip,
      datepremdoc: req.body.datepremdoc,
      spedoc: req.body.spedoc,
      laborata: req.body.laborata,
      intithe: req.body.intithe,
      datesout: req.body.datesout,
      role:'doc',
      dirnom: req.body.dirnom,
      dirprenom: req.body.dirprenom,
      codirnom: req.body.codirnom,
      codirprenom: req.body.codirprenom,
    });
    const savedDoc = await newDoc.save();
    res.json(savedDoc);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* register_dir api */

router.post("/register_dir", async (req, res) => {
  try {

    let { dirnom, dirprenom } = req.body;
    
      // checking if the dir is already in the database
    const ExDirnom = await Dirt.findOne({ dirnom: dirnom });
    const ExDirprenom = await Dirt.findOne({ dirprenom: dirprenom });

    if ( ExDirnom && ExDirprenom )
    {
      
      return res.status(400).json({ msg1: "directeur existe déjà." });
  }
  else{
  // create dirt
  const newDir = new Dirt({
    dirnom,
    dirprenom,
    dirgrade: req.body.dirgrade,
    diretabori: req.body.diretabori,
    dirlaborata: req.body.dirlaborata,
    dirnumtel: req.body.dirnumtel,
    dirmail: req.body.dirmail,
  });
  const savedDir = await newDir.save();
  res.json(savedDir);
}
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
);


/* register_codir api */

router.post("/register_codir", async (req, res) => {
  try {
    let { codirnom, codirprenom } = req.body;
    
      // checking if the codirt is already in the database

    const ExCodirnom = await CoDirt.findOne({ codirnom: codirnom });
    const ExCodirprenom = await CoDirt.findOne({ codirprenom: codirprenom });

    if (ExCodirnom && ExCodirprenom ){

      return res.status(400).json({ msg2: "codir existe déjà." });
    }
    else {
      // create codirt

      const newCoDir = new CoDirt({
        codirnom,
        codirprenom,
        codirgrade: req.body.codirgrade,
        codiretabori: req.body.codiretabori,
        codirlaborata: req.body.codirlaborata,
        codirnumtel: req.body.codirnumtel,
        codirmail: req.body.codirmail,
      });
      const savedCoDir = await newCoDir.save();
       res.json(savedCoDir);
      }
   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }}
);

/* register_ens api */
router.post("/register_ens", async (req, res) => {
 
 } );

/* login api */

router.post("/login",  async (req, res) => {
  try {
    const { name, password } = req.body;

           // Validate
    if (!name || !password) {
        return res.status(400).json({ 
          errorMessage: 'Username or password is incorrect!1',
          status: false
         })
    }

    const user = await User.findOne({ name })
    if (!user) {
        return res.status(400).json({ 
          errorMessage: 'Username is incorrect!',
          status: false
             })
    }

           // Compare hashed password with plain text password
    const match = await bcrypt.compareSync( password, user.password );
  
    if (!match) {
      return res.status(400).json({ 
        errorMessage: 'password is incorrect!',
        status: false
           })
    }

             // Create JWT token   

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
      },
    });
    
 }
 catch (e) {
   res.status(400).json({
    errorMessage: 'Something went wrong!',
    status: false
   });
 }
});

/* token api */

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth , async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
  });
});

/* delete api */

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* get for sec api */






module.exports = router;