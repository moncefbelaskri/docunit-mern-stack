import React, { Fragment, useState, useRef, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { Typography, List, ListItem, ListItemText, Button, Box} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { withRouter } from "react-router-dom";
import Bordered from "../../../../shared/components/Bordered";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import ActionPaper from "../../../../shared/components/ActionPaper";
import ButtonCircularProgress from "../../../../shared/components/ButtonCircularProgress";
import UserContext from "../../../../shared/components/UserContext";

const axios = require('axios');

const styles = () => ({
  dNone: {
    display: "none",
  },
});

const currencies = [
  {
    value: 'sal',
    label: 'Salarié(e)',
  },
  {
    value: 'nonsal',
    label: 'Non Salarié(e)',
  },
];

const currencies2 = [
  {
    value: 'sci',
    label: 'Doctorat en Sciences',
  },
  {
    value: 'lmd',
    label: 'Doctorat en LMD',
  },
];
const currencies3 = [
  {
    value: 'mag',
    label: 'Magister',
  },
  {
    value: 'mas',
    label: 'Master',
  },
  {
    value: 'au',
    label: 'Autre',
  },
];
function ModifDoc(props) {
  
  const {
    pushMessageToSnackbar,
    onClose,
  } = props;
  const { iddocData } = useContext(UserContext);
  const { iddtData } = useContext(UserContext);
  const { idcdtData } = useContext(UserContext);
  const { userData } = useContext(UserContext);

  var dirdatalist = [];
  var codirdatalist = [];


  for(let i=0; i < iddtData.iddtup.length; i++)
  {
    if(iddocData.iddocup.dn  === iddtData.iddtup[i].dnn && iddocData.iddocup.dp === iddtData.iddtup[i].dpp)
    {
      dirdatalist = iddtData.iddtup[i];
    }   
  }
  for(let j=0; j < idcdtData.idcdtup.length; j++)
  {
    if(iddocData.iddocup.cdn  === idcdtData.idcdtup[j].cdnn && iddocData.iddocup.cdp === idcdtData.idcdtup[j].cdpp)
    {
      codirdatalist = idcdtData.idcdtup[j];
    }   
  }

  const DoctorantNom = useRef();
  const DoctorantPrenom = useRef();
  const DoctorantDateN = useRef();
  const DoctorantLieuN = useRef();
  const DoctorantAdresse = useRef();
  const DoctorantNumtel = useRef();
  const DoctorantMail = useRef();
  const DoctorantEtapro = useRef();
  const DoctorantAnebac = useRef();
  const DoctorantSeribac = useRef();
  const DoctorantNumbac = useRef();
  const DoctorantCatdoc = useRef();
  const DoctorantDerdip = useRef();
  const DoctorantSpederdip = useRef();
  const DoctorantDatederdip = useRef();
  const DoctorantDatepremdoc = useRef();
  const DoctorantSpedoc = useRef();
  const DoctorantLaborata = useRef();
  const DoctorantIntithe = useRef();
  const DoctorantDatesout = useRef();
  const DoctorantPreci = useRef();
  const DoctorantPrecii = useRef();
  const DoctorantName = useRef();
  const DoctorantPassword = useRef();

  const DirtNom = useRef();
  const DirtPrenom = useRef();
  const DirtGrade = useRef();
  const DirtEtabori = useRef();
  const DirtLaborata = useRef();
  const DirtNumtel = useRef();
  const DirtMail = useRef();

  const CoDirtNom = useRef();
  const CoDirtPrenom = useRef();
  const CoDirtGrade = useRef();
  const CoDirtEtabori = useRef();
  const CoDirtLaborata = useRef();
  const CoDirtNumtel = useRef();
  const CoDirtMail = useRef();
 
  const [isLoading, setIsLoading] = useState(false);

  const [,setTypedoc] = React.useState('');
  const [etapro, setEtapro] = React.useState('');
  const [derdip, setDerdip] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  var existed = null;
  
  const handleChangeTypedoc = (event) => {   
    setTypedoc(event.target.value);
  };
  const handleChangeEtapro = (event) => {   
    setEtapro(event.target.value);
  };
  const handleChangeDerdip = (event) => {   

    setDerdip(event.target.value);
  };

  const formudoc = useCallback( async () => {

    setIsLoading(true);

    if(DoctorantEtapro.current.value === "sal" && DoctorantDerdip.current.value === "au")
          {
            await axios.put("http://localhost:5000/users/update/doc/" + iddocData.iddocup._id,
           {
            nom: DoctorantNom.current.value,
            prenom: DoctorantPrenom.current.value,
            dateN: DoctorantDateN.current.value,
            lieuN: DoctorantLieuN.current.value,
            adresse: DoctorantAdresse.current.value,
            numtel: DoctorantNumtel.current.value,
            mail: DoctorantMail.current.value,
            etapro: DoctorantEtapro.current.value,
            preci: DoctorantPreci.current.value,
            anebac: DoctorantAnebac.current.value,
            seribac: DoctorantSeribac.current.value,
            numbac: DoctorantNumbac.current.value,
            dept : userData.user.dept,
            catdoc:DoctorantCatdoc.current.value,
            derdip: DoctorantDerdip.current.value,
            precii: DoctorantPrecii.current.value,
            spederdip: DoctorantSpederdip.current.value,
            datederdip: DoctorantDatederdip.current.value,
            datepremdoc: DoctorantDatepremdoc.current.value,
            spedoc: DoctorantSpedoc.current.value,
            laborata: DoctorantLaborata.current.value,
            intithe: DoctorantIntithe.current.value,
            datesout: DoctorantDatesout.current.value,       
            username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
            dirnom: DirtNom.current.value,
            dirprenom: DirtPrenom.current.value,
            codirnom: CoDirtNom.current.value,
            codirprenom: CoDirtPrenom.current.value,

          }
           ,{headers: {"Content-Type": "application/json",}})
           .then((response) => {
            // Success 🎉
        }).catch((error) => {
          if(error.response.data.msg === "doctorant existe déjà.")
               {
                setIsLoading(false);
                pushMessageToSnackbar({
                  text: "doctorant existe déjà",
                });
                existed = "yes";
                setIsLoading(false);
                }
      });
          }

    else if(DoctorantEtapro.current.value === "sal" && DoctorantDerdip.current.value !== "au")
             {
              await axios.put("http://localhost:5000/users/update/doc/" + iddocData.iddocup._id,
               {
                nom: DoctorantNom.current.value,
                prenom: DoctorantPrenom.current.value,
                dateN: DoctorantDateN.current.value,
                lieuN: DoctorantLieuN.current.value,
                adresse: DoctorantAdresse.current.value,
                numtel: DoctorantNumtel.current.value,
                mail: DoctorantMail.current.value,
                etapro: DoctorantEtapro.current.value,
                preci: DoctorantPreci.current.value,
                anebac: DoctorantAnebac.current.value,
                seribac: DoctorantSeribac.current.value,
                numbac: DoctorantNumbac.current.value,
                dept: userData.user.dept,
                catdoc:DoctorantCatdoc.current.value,
                derdip: DoctorantDerdip.current.value,
                spederdip: DoctorantSpederdip.current.value,
                datederdip: DoctorantDatederdip.current.value,
                datepremdoc: DoctorantDatepremdoc.current.value,
                spedoc: DoctorantSpedoc.current.value,
                laborata: DoctorantLaborata.current.value,
                intithe: DoctorantIntithe.current.value,
                datesout: DoctorantDatesout.current.value,       
                username: DoctorantName.current.value,
                password: DoctorantPassword.current.value,
                dirnom: DirtNom.current.value,
              dirprenom: DirtPrenom.current.value,
              codirnom: CoDirtNom.current.value,
              codirprenom: CoDirtPrenom.current.value,
        
              }
               ,{headers: {"Content-Type": "application/json",},})
               .then((response) => {
                // Success 🎉
            }).catch((error) => {
              if(error.response.data.msg === "doctorant existe déjà.")
                   {
                    setIsLoading(false);
                    pushMessageToSnackbar({
                      text: "doctorant existe déjà",
                    });
                    existed = "yes";
                    setIsLoading(false);
                  }
          });
             }
      else if(DoctorantEtapro.current.value !== "sal" && DoctorantDerdip.current.value === "au")
             {
              await axios.put("http://localhost:5000/users/update/doc/" + iddocData.iddocup._id,
            {  
              nom: DoctorantNom.current.value,
      prenom: DoctorantPrenom.current.value,
      dateN: DoctorantDateN.current.value,
      lieuN: DoctorantLieuN.current.value,
      adresse: DoctorantAdresse.current.value,
      numtel: DoctorantNumtel.current.value,
      mail: DoctorantMail.current.value,
      etapro: DoctorantEtapro.current.value,
      anebac: DoctorantAnebac.current.value,
      seribac: DoctorantSeribac.current.value,
      numbac: DoctorantNumbac.current.value,
      dept: userData.user.dept,
      catdoc:DoctorantCatdoc.current.value,
      derdip: DoctorantDerdip.current.value,
      precii: DoctorantPrecii.current.value,
      spederdip: DoctorantSpederdip.current.value,
      datederdip: DoctorantDatederdip.current.value,
      datepremdoc: DoctorantDatepremdoc.current.value,
      spedoc: DoctorantSpedoc.current.value,
      laborata: DoctorantLaborata.current.value,
      intithe: DoctorantIntithe.current.value,
      datesout: DoctorantDatesout.current.value,       
      username: DoctorantName.current.value,
      password: DoctorantPassword.current.value,
      dirnom: DirtNom.current.value,
      dirprenom: DirtPrenom.current.value,
      codirnom: CoDirtNom.current.value,
      codirprenom: CoDirtPrenom.current.value,
         } 
               ,{headers: {"Content-Type": "application/json",},})
               .then((response) => {
                // Success 🎉
            }).catch((error) => {
              if(error.response.data.msg === "doctorant existe déjà.")
                   {
                    setIsLoading(false);
                      pushMessageToSnackbar({
                       text: "doctorant existe déjà",
                          });
                          existed = "yes";
                          setIsLoading(false);
                  }
          });
              }
      else 
        {
          await axios.put("http://localhost:5000/users/update/doc/" + iddocData.iddocup._id,
          {
            nom: DoctorantNom.current.value,
          prenom: DoctorantPrenom.current.value,
          dateN: DoctorantDateN.current.value,
          lieuN: DoctorantLieuN.current.value,
          adresse: DoctorantAdresse.current.value,
          numtel: DoctorantNumtel.current.value,
          mail: DoctorantMail.current.value,
          etapro: DoctorantEtapro.current.value,
          anebac: DoctorantAnebac.current.value,
          seribac: DoctorantSeribac.current.value,
          numbac: DoctorantNumbac.current.value,
          dept: userData.user.dept,
          catdoc:DoctorantCatdoc.current.value,
          derdip: DoctorantDerdip.current.value,
          spederdip: DoctorantSpederdip.current.value,
          datederdip: DoctorantDatederdip.current.value,
          datepremdoc: DoctorantDatepremdoc.current.value,
          spedoc: DoctorantSpedoc.current.value,
          laborata: DoctorantLaborata.current.value,
          intithe: DoctorantIntithe.current.value,
          datesout: DoctorantDatesout.current.value,       
          username: DoctorantName.current.value,
          password: DoctorantPassword.current.value,
          dirnom: DirtNom.current.value,
          dirprenom: DirtPrenom.current.value,
          codirnom: CoDirtNom.current.value,
          codirprenom: CoDirtPrenom.current.value,
          }
          ,
          {headers: {"Content-Type": "application/json",},})
          .then((response) => { 
            // Success 🎉
        }).catch((error) => {
          if(error.response.data.msg === "doctorant existe déjà.")
               {
                setIsLoading(false);
                pushMessageToSnackbar({
                  text: "doctorant existe déjà",
                });
                existed = "yes";
                setIsLoading(false);
              }
      });
        }     
      if(existed !== "yes") {
        await axios.put("http://localhost:5000/users/update/dir/" + dirdatalist._idd,
         {
          dirnom: DirtNom.current.value,
          dirprenom: DirtPrenom.current.value,
          dirgrade: DirtGrade.current.value,
          diretabori: DirtEtabori.current.value,
          dirlaborata: DirtLaborata.current.value,
          dirnumtel: DirtNumtel.current.value,
          dirmail: DirtMail.current.value,
    
         },{ headers: {"Content-Type": "application/json",} }).then((response) => {

          // Success 🎉

      }).catch((error) => {

        if(error.response.data.msg1 === "directeur existe déjà.")

             {

              console.log("directeur existe déjà.");

            }

    });
        
    await axios.put("http://localhost:5000/users/update/codir/" + codirdatalist._iddd,
          {
           codirnom: CoDirtNom.current.value,
           codirprenom: CoDirtPrenom.current.value,
           codirgrade: CoDirtGrade.current.value,
           codiretabori: CoDirtEtabori.current.value,
           codirlaborata: CoDirtLaborata.current.value,
           codirnumtel: CoDirtNumtel.current.value,
           codirmail: CoDirtMail.current.value,
     
          },{ headers: {"Content-Type": "application/json",} }).then((response) => {

            // Success 🎉
  
        }).catch((error) => {
  
          if(error.response.data.msg2 === "codir existe déjà.")
  
               {
  
                console.log("codirecteur existe déjà.");
  
              }
  
      });
      setIsLoading(true);
  
      setTimeout(() => {
        
        pushMessageToSnackbar({
            text: "modifié avec succès",
        });
        window.location.reload(false);
        }, 10);
      
        }
        }  
  ,[ setIsLoading,pushMessageToSnackbar,onClose,DoctorantNom,DoctorantPrenom,DoctorantDateN,DoctorantLieuN,DoctorantAdresse,DoctorantNumtel,DoctorantMail,DoctorantEtapro,DoctorantPreci,DoctorantAnebac,DoctorantSeribac,DoctorantNumbac,DoctorantCatdoc,DoctorantDerdip,DoctorantPrecii,DoctorantSpederdip,DoctorantDatederdip,DoctorantDatepremdoc,DoctorantSpedoc,DoctorantLaborata,DoctorantIntithe,DoctorantDatesout,DoctorantName,DoctorantPassword
    ,DirtNom,DirtPrenom,DirtGrade,DirtEtabori,DirtLaborata,DirtNumtel,DirtMail,CoDirtNom,CoDirtPrenom,CoDirtGrade,CoDirtEtabori,CoDirtLaborata,CoDirtNumtel,CoDirtMail]);

  const handleUpload = useCallback(async () => {
    setIsLoading(true);
    if(DoctorantNom.current.value === "" ||
    DoctorantPrenom.current.value === "" ||
    DoctorantDateN.current.value === "" ||
    DoctorantLieuN.current.value === "" ||
    DoctorantAdresse.current.value === "" ||
    DoctorantNumtel.current.value === "" ||
    DoctorantMail.current.value === "" ||
    DoctorantEtapro.current.value === "" ||
    DoctorantAnebac.current.value === "" ||
    DoctorantSeribac.current.value === "" ||
    DoctorantNumbac.current.value === "" ||
    DoctorantCatdoc.current.value === "" ||
    DoctorantDerdip.current.value === "" ||
    DoctorantSpederdip.current.value === "" ||
    DoctorantDatederdip.current.value === "" ||
    DoctorantDatepremdoc.current.value === "" ||
    DoctorantSpedoc.current.value === "" ||
    DoctorantIntithe.current.value === "" ||
    DoctorantDatesout.current.value === "" ||
    DoctorantLaborata.current.value === "" ||   
    DoctorantName.current.value === "" ||
    DoctorantPassword.current.value === ""  ||

    DirtNom.current.value === "" ||
    DirtPrenom.current.value === "" ||
    DirtGrade.current.value === "" ||
    DirtEtabori.current.value === "" ||
    DirtLaborata.current.value === "" ||
    DirtNumtel.current.value === "" ||
    DirtMail.current.value === "" ||

    CoDirtNom.current.value === "" ||
    CoDirtPrenom.current.value === "" ||
    CoDirtGrade.current.value === "" ||
    CoDirtEtabori.current.value === "" ||
    CoDirtLaborata.current.value === "" ||
    CoDirtNumtel.current.value === "" ||
    CoDirtMail.current.value === "" 
    ) {     
      setIsLoading(false);     
    }
    else if(DoctorantEtapro.current.value === "sal" && DoctorantPreci.current.value === "" )
      {
        setIsLoading(false);     
      }
      else if(DoctorantDerdip.current.value === "au" && DoctorantPrecii.current.value === "" )
      {
        setIsLoading(false);     
      }
    else{

    formudoc();
    
  }
  }, [setIsLoading , onClose, pushMessageToSnackbar]);

  return (
    <Fragment>
      <ActionPaper
        helpPadding
        maxWidth="md"
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          handleUpload();
        }}
        content={
          <Box
          sx={{
        '& .MuiTextField-root': { m: 1, width: '29.5ch' },
      }}
      
      
    >
      <Typography paragraph variant="h5">
        Doctorant
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="outlined" label="Nom" defaultValue={iddocData.iddocup.nom} inputRef={DoctorantNom}/>            
            <TextField required variant="outlined" label="Prénom" defaultValue={iddocData.iddocup.prénom} inputRef={DoctorantPrenom} />
            </div>
            <div>
            <TextField required variant="outlined" label="Né(e) le" type="date" defaultValue={iddocData.iddocup.da} inputRef={DoctorantDateN}
             InputLabelProps={{
               shrink: true  
               }}/>
            <TextField required variant="outlined" label="à" defaultValue={iddocData.iddocup.li} inputRef={DoctorantLieuN} />
            <TextField required variant="outlined" label="Adresse" defaultValue={iddocData.iddocup.ad} inputRef={DoctorantAdresse} />
            </div>     
           <div>
           <TextField required variant="outlined" label="N° de téléphone " name="phone" defaultValue={iddocData.iddocup.nt} inputRef={DoctorantNumtel} />
           <TextField required variant="outlined" label="Email" name="email" type="email" defaultValue={iddocData.iddocup.email} inputRef={DoctorantMail}/>            
           </div> 
            <div>
            <TextField  required variant="outlined" select   label="Etat professionnel"  defaultValue={iddocData.iddocup.ep} inputRef={DoctorantEtapro} onChange={handleChangeEtapro} >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        { iddocData.iddocup.ep==="sal" ? etapro==="sal"? <TextField  variant="outlined" label="(Préciser)" defaultValue={iddocData.iddocup.pr} inputRef={DoctorantPreci}/>:null :null}
        { iddocData.iddocup.ep!=="sal" ? etapro==="sal"? <TextField  variant="outlined" label="(Préciser)"  inputRef={DoctorantPreci}/>:null :null}
            </div>
            <div>
            <TextField required variant="outlined" type="number" name="number" inputProps={{min:1950}} label="Année d’obtention du BAC" defaultValue={iddocData.iddocup.an} inputRef={DoctorantAnebac}/>
            <TextField required variant="outlined"  label="Série du BAC" defaultValue={iddocData.iddocup.seb} inputRef={DoctorantSeribac}/>
            <TextField required variant="outlined" type="number" name="number" label="N° du BAC" defaultValue={iddocData.iddocup.nb} inputRef={DoctorantNumbac}/>
            </div> 
            <div>      
        <TextField required variant="outlined" select   label="Fiche de reinscription en" defaultValue={iddocData.iddocup.cd} inputRef={DoctorantCatdoc} onChange={handleChangeTypedoc} >
          {currencies2.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>                
            <TextField required variant="outlined" select   label="Dernier diplome obtenu" defaultValue={iddocData.iddocup.dd} inputRef={DoctorantDerdip} onChange={handleChangeDerdip} >
          {currencies3.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> 
        { iddocData.iddocup.dd==="au" ? derdip==="au"? <TextField  variant="outlined" label="(Préciser)"  defaultValue={iddocData.iddocup.prr} inputRef={DoctorantPrecii}/>:null :null}
        { iddocData.iddocup.dd!=="au" ? derdip==="au"? <TextField  variant="outlined" label="(Préciser)" inputRef={DoctorantPrecii}/>:null :null}
            </div>
            <div>
            <TextField required variant="outlined" label="Spécialité dernier diplôme obtenu" defaultValue={iddocData.iddocup.sdd} inputRef={DoctorantSpederdip}/>
            <TextField required variant="outlined" label="Date de son obtention"  type="date" defaultValue={iddocData.iddocup.dad} inputRef={DoctorantDatederdip}
              InputLabelProps={{
               shrink: true
               }}
            />
            </div>           
            <div>
            <TextField required variant="outlined" label="Date 1ère Inscription Doctorat"  type="date" defaultValue={iddocData.iddocup.dap} inputRef={DoctorantDatepremdoc}
              InputLabelProps={{
               shrink: true
               }}
              />
            <TextField required variant="outlined" label="Spécialité du Doctorat"  defaultValue={iddocData.iddocup.sd} inputRef={DoctorantSpedoc}/>
            <TextField required variant="outlined" label="Laboratoire de rattachement" defaultValue={iddocData.iddocup.lr} inputRef={DoctorantLaborata}/>
            </div>
            <div>
            <TextField required variant="outlined" label="Intitulé de la thèse" defaultValue={iddocData.iddocup.inti} inputRef={DoctorantIntithe}/>
            <TextField required variant="outlined" label="Date prévue de soutenance" defaultValue={iddocData.iddocup.ds} type="date" inputRef={DoctorantDatesout}
              InputLabelProps={{
               shrink: true
               }}
            />
            </div>         
            <div>
            <TextField required variant="outlined" label="Nom de compte" defaultValue={iddocData.iddocup.ndc} inputRef={DoctorantName}/>
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth              
              label="Mot de passe"
              autoComplete="off"
              defaultValue={iddocData.iddocup.mdp}
              inputRef={DoctorantPassword}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
              />            </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>

      <Typography paragraph variant="h5">
        Directeur de thèse
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="outlined" label="Nom" defaultValue={ dirdatalist.dnn} inputRef={DirtNom}/>
            <TextField required variant="outlined" label="Prénom" defaultValue={dirdatalist.dpp} inputRef={DirtPrenom}/>
            </div>
            <div>
            <TextField required variant="outlined" label="Grade" defaultValue={dirdatalist.dg} inputRef={DirtGrade}/>
            <TextField required variant="outlined" label="Etablissement d'origine" defaultValue={dirdatalist.de} inputRef={DirtEtabori}/>
            <TextField required variant="outlined" label="Laboratoire de rattachement" defaultValue={dirdatalist.dl} inputRef={DirtLaborata} />
            </div>
            <div>
            <TextField required variant="outlined" label="N° de téléphone " name="phone" defaultValue={dirdatalist.dnm} inputRef={DirtNumtel}/>
            <TextField  required variant="outlined" label="Email" name="email di" type="email" defaultValue={dirdatalist.dml} inputRef={DirtMail}/>
            </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

<br/>

      <Typography paragraph variant="h5">
        Co-Directeur de thèse
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="outlined" label="Nom" defaultValue={codirdatalist.cdnn} inputRef={CoDirtNom}/>
            <TextField required variant="outlined" label="Prénom" defaultValue={codirdatalist.cdpp} inputRef={CoDirtPrenom}/>
            </div>
            <div>
            <TextField required variant="outlined" label="Grade" defaultValue={codirdatalist.cdg} inputRef={CoDirtGrade}/>
            <TextField required variant="outlined" label="Etablissement d'origine" defaultValue={codirdatalist.cde} inputRef={CoDirtEtabori}/>
            <TextField required variant="outlined" label="Laboratoire de rattachement" defaultValue={codirdatalist.cdl} inputRef={CoDirtLaborata}/>
            </div>            
            <div>
            <TextField required variant="outlined" label="N° de téléphone " name="phone" defaultValue={codirdatalist.cdnm} inputRef={CoDirtNumtel}/>
            <TextField  required variant="outlined" label="Email" name="email" type="email" defaultValue={codirdatalist.cdml} inputRef={CoDirtMail}/>
            </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>
       
    </Box>
        }
        actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={onClose} disabled={isLoading}>
                Retour
              </Button>
            </Box>
            <Button
              type="submit"
           
              variant="contained"
              color="secondary"
              disabled={isLoading}
            >
              METTRE A JOUR {isLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}


ModifDoc.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
};

export default withRouter(withStyles(styles)(ModifDoc));
