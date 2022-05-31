const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Sec = require('../model/Sec');
const Doctorant = require('../model/Doctorant');
const Enseignant = require('../model/Enseignant');
const Avancement = require('../model/Avancement');
const auth = require("../middleware/auth");
const indx = require("../middleware/indx");
const jwt = require('jsonwebtoken');
 
/* sec api */
 
router.post('/regsec', async (req, res) => {

  
   // checking if the user is already in the database 

   const nameExist =  await Sec.findOne({username: req.body.username});
   if (nameExist) return res.status(400).send('user already exists');
   

   // password is correct
   
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(req.body.password, salt);
  

// create a new sec 

const sec = new Sec({
  username: req.body.username,
  password: hashPassword,
  role : req.body.role,
  dept : req.body.dept,
});

try{
const savedSec = await sec.save();
res.send(savedSec);
}catch(err){
res.status(400).send(err);
}
  
});

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
      role:'doc',
      dirnom: req.body.dirnom,
      dirprenom: req.body.dirprenom,
      dirgrade : req.body.dirgrade, 
      codirnom: req.body.codirnom,
      codirprenom: req.body.codirprenom,
      codirgrade : req.body.codirgrade, 
    });
    const savedDoc = await newDoc.save();
    res.json(savedDoc);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* register_ens api */

router.post("/register_ens", async (req, res) => {
  try {
    let {ensusername} = req.body;

      // checking if the ens is already in the database

    const ExUsernameEns = await Enseignant.findOne({ ensusername: ensusername });

    if (ExUsernameEns)
    {
      return res.status(400).json({ msg: "enseignant existe déjà." });
    }

    // create enseignant

    const newEns = new Enseignant({
      ensnom: req.body.ensnom,
      ensprenom: req.body.ensprenom,
      ensgrade: req.body.ensgrade,
      ensetabori: req.body.ensetabori,
      enslaborata: req.body.enslaborata,
      ensnumtel: req.body.ensnumtel,
      ensmail: req.body.ensmail,
      ensusername,
      enspassword: req.body.enspassword,
      ensdept : req.body.ensdept,
      role: 'ens',
    });
    const savedEns = await newEns.save();
    res.json(savedEns);
 } catch (err) {
  res.status(500).json({ error: err.message });
}}
);






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
  
    const secuser = await Sec.findOne({ username : name });
    const docuser = await Doctorant.findOne({ username : name });
    const ensuser = await Enseignant.findOne({ ensusername: name });
    if (secuser) {
              // Compare hashed password with plain text password
    const match = await bcrypt.compareSync( password, secuser.password );
    if (!match) {
      return res.status(400).json({ 
        errorMessage: 'password is incorrect!',
        status: false
           })
    }

             // Create JWT token   

    const token = jwt.sign({ id: secuser._id }, process.env.TOKEN_SECRET);
    return res.json({
      token,
      user: {
        id: secuser._id,
        role : secuser.role,
        dept : secuser.dept,
      },

    });
    
  }
  
  if (docuser) {

    if (docuser.password !==  password) {
    return res.status(400).json({ 
     errorMessage: 'password is incorrect!',
     status: false
    })
    }

   // Create JWT token   

  const token = jwt.sign({ id: docuser._id }, process.env.TOKEN_SECRET);
     return res.json({
       token,
       user: {
        id: docuser._id,

        nom : docuser.nom,

        prenom : docuser.prenom,

        username : docuser.username,

        intithe : docuser.intithe,

        datepremdoc : docuser.datepremdoc,

        dirnom :  docuser.dirnom,

        dirprenom :  docuser.dirprenom,

        codirnom :  docuser.codirnom,

        codirprenom :  docuser.codirprenom,

        role : docuser.role,

        dept : docuser.dept,
      },
          });

  }
  if (ensuser) {

    if (ensuser.enspassword !==  password) {
    return res.status(400).json({ 
     errorMessage: 'password is incorrect!',
     status: false
    })
    }

   // Create JWT token   

  const token = jwt.sign({ id: ensuser._id }, process.env.TOKEN_SECRET);
     return res.json({
       token,
       user: {
        id: ensuser._id,

        ensnom : ensuser.ensnom,

        ensprenom : ensuser.ensprenom,

        role : ensuser.role,

        dept : ensuser.ensdept,
      },
          });

  }

      else {
        return res.status(400).json({ 
          errorMessage: 'Username is incorrect!',
          status: false
             })
    }
      
  
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



    const userSec = await Sec.findById(verified.id);

    const userDoc = await Doctorant.findById(verified.id);

    const userEns = await Enseignant.findById(verified.id);

    if (!userSec && !userDoc && !userEns ) {

      return res.json(false);

    }



    return res.json(true);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


 /* get sec api */

router.get("/", auth , async (req, res) => {
  const user = await Sec.findById(req.user);
  res.json({
    id: user._id,
    dept : user.dept,
  });
});

 /* get doc api */

 router.get("/getdoc" , async (req, res) => {
  try {
    id = req.header("x-update");
    const getDoc = await Doctorant.findOne({ _id : id});
    return res.json(getDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* get ens api */

router.get("/getens" , async (req, res) => {
  try {
    id = req.header("x-update");
    const getEns = await Enseignant.findOne({ _id : id});
    return res.json(getEns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* delete doc api */

router.delete("/deletedoc", indx , async (req, res) => {
  try {
    const deletedDoc = await Doctorant.findOneAndDelete({username : req.docun});
    res.json(deletedDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* delete ens api */

router.delete("/deleteens", indx , async (req, res) => {
  try {
    const deletedEns = await Enseignant.findOneAndDelete({ensusername : req.docun});
    res.json(deletedEns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* get doc for sec api */
router.get("/secdoc" , async (req, res) => {
  const doc = await Doctorant.find()
  return res.json(doc);
});

/* get ens for sec api */

router.get("/secens" , async (req, res) => {
  const ens = await Enseignant.find()
  return res.json(ens);
});

/* update ens for sec api */

router.put('/update/ens/:id', async (req, res) => {
  try {
    let {ensusername} = req.body;
      // checking if the ens is already in the database
    const ExUsernameEns = await Enseignant.findOne({ _id :{$ne : req.params.id} ,ensusername: ensusername });
    if (ExUsernameEns)
    {
      return res.status(400).json({ msg: "enseignant existe déjà." });
    }
  const UpdateEns = new Enseignant({
    _id: req.params.id,
    ensnom: req.body.ensnom,
    ensprenom: req.body.ensprenom,
    ensgrade: req.body.ensgrade,
    ensetabori: req.body.ensetabori,
    enslaborata: req.body.enslaborata,
    ensnumtel: req.body.ensnumtel,
    ensmail: req.body.ensmail,
    ensusername,
    enspassword: req.body.enspassword,
    ensdept : req.body.ensdept,
    role: 'ens',
  });
  await Enseignant.updateOne({ _id : req.params.id}, UpdateEns).then(
    () => {
      res.status(201).json({
        message: 'Ens updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error.message
      });
    }
  );
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

/* update doc for sec api */

router.put('/update/doc/:id', async (req, res) => {
  try {
    let {username} = req.body;
      // checking if the doc is already in the database
    const ExUsernameDoc = await Doctorant.findOne({ _id :{$ne : req.params.id} ,username: username });
    if (ExUsernameDoc)
    {
      return res.status(400).json({ msg: "doctorant existe déjà." });
    }

  const UpdateDoc = new Doctorant({
      _id: req.params.id,
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
      role:'doc',
      dirnom: req.body.dirnom,
      dirprenom: req.body.dirprenom,
      dirgrade : req.body.dirgrade, 
      codirnom: req.body.codirnom,
      codirprenom: req.body.codirprenom,
      codirgrade : req.body.codirgrade, 
  });
  await Doctorant.updateOne({ _id : req.params.id}, UpdateDoc).then(
    () => {
      res.status(201).json({
        message: 'Doc updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error.message
      });
    }
  );
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

/* get doc api */

router.get("/doc", auth , async (req, res) => {

  const user = await Doctorant.findById(req.user);
  res.json({
    id: user._id,
    nom : user.nom,
    prenom : user.prenom,
    username : user.username,
    intithe : user.intithe,
    datepremdoc : user.datepremdoc,
    dirnom: user.dirnom,
    dirprenom: user.dirprenom,
    codirnom: user.codirnom,
    codirprenom: user.codirprenom,
    role : user.role,
    dept : user.dept,
  });
});

 /* get ens api */


 router.get("/ens", auth , async (req, res) => {

  const user = await Enseignant.findById(req.user);
  res.json({
    id: user._id,
    ensnom : user.ensnom,
    ensprenom : user.ensprenom,
    role : user.role,
    dept : user.ensdept,
  });
});


/* doc avnc api */
router.post('/docavnc', async (req, res) => {
  try{

  let { usernamedoc } = req.body;
  let { aneactu } = req.body;

    
  // checking if the doc is already in the database

const ExDocUsername = await Avancement.findOne({ _id :{$ne : req.params.id} ,usernamedoc: usernamedoc });
const ExDocAneactu = await Avancement.findOne({ _id :{$ne : req.params.id} ,aneactu: aneactu });
if (ExDocUsername &&  ExDocAneactu)
{
  return res.status(400).json({ msg: "avancement déjà validé" });
}

  const avnc = new Avancement(
    { usernamedoc,
      pctav: req.body.pctav,
      datesout: req.body.datesout,
      etav : req.body.etav,
      aneactu,
    });
    
      const savedAvnc = await avnc.save();
      res.send(savedAvnc);
    }
      catch(err){res.status(500).send(err);}
   });



   router.put('/update/doc/:id', async (req, res) => {
    try {
      let { usernamedoc } = req.body;
      let { aneactu } = req.body;
    
        
      // checking if the doc is already in the database
    
    const ExDocUsername = await Avancement.findOne({ usernamedoc: usernamedoc });
    const ExDocAneactu = await Avancement.findOne({ aneactu: aneactu });
    if (ExDocUsername &&  ExDocAneactu)
    {
      return res.status(400).json({ msg: "avancement déjà validé" });
    }
    const UpdateAvnc = new Avancement(
      { 
        _id: req.params.id,
        usernamedoc,
        pctav: req.body.pctav,
        datesout: req.body.datesout,
        etav : req.body.etav,
        aneactu,
      });
      await Avancement.updateOne({ _id : req.params.id}, UpdateAvnc).then(
        () => {
          res.status(201).json({
            message: 'Avnc updated successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error.message
          });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    }
  );



module.exports = router;