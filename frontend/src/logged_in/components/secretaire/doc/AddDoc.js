import React, { Fragment, useState, useRef , useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, List, ListItem, ListItemText, Button, Box, fabClasses } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { withRouter } from "react-router-dom";
import Bordered from "../../../../shared/components/Bordered";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import UserContext from "../../../../shared/components/UserContext";
import ActionPaper from "../../../../shared/components/ActionPaper";
import ButtonCircularProgress from "../../../../shared/components/ButtonCircularProgress";
import MuiPhoneNumber from "material-ui-phone-number";

const axios = require('axios');

const styles = (theme) => ({
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
const currencies1 = [
  {
    value: 'info',
    label: 'Informatique',
  },
  {
    value: 'math',
    label: 'Mathématique',
  },
  {
    value: 'phy',
    label: 'Physique',
  },
  {
    value: 'chi',
    label: 'Chimie',
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
function AddDoc(props) {
  
  const {
    pushMessageToSnackbar,
    onClose,
  } = props;
  

  let a = 0;
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
  const DoctorantDept = useRef();
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

  const [dep, setDep] = React.useState('');
  const [typedoc, setTypedoc] = React.useState('');
  const [etapro, setEtapro] = React.useState('');
  const [derdip, setDerdip] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  var existed = null;
  const handleChangeDep = (event) => {
    setDep(event.target.value);
  };
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
             await axios.post("http://localhost:5000/users/register_doc",
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
            dept: DoctorantDept.current.value,
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
               await axios.post("http://localhost:5000/users/register_doc",
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
                dept: DoctorantDept.current.value,
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
          await axios.post("http://localhost:5000/users/register_doc",
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
      dept: DoctorantDept.current.value,
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
       await axios.post("http://localhost:5000/users/register_doc",
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
          dept: DoctorantDept.current.value,
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
        await axios.post("http://localhost:5000/users/register_dir",
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
        
         await axios.post("http://localhost:5000/users/register_codir",
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
  
                console.log("b");
  
              }
  
      });
        
        setTimeout(() => {
            setIsLoading(true);
            pushMessageToSnackbar({
              text: "Doctorant ajouté avec succès",
            });
            onClose();
          }, 100);
        }
        }  
  ,[ setIsLoading,pushMessageToSnackbar,onClose,DoctorantNom,DoctorantPrenom,DoctorantDateN,DoctorantLieuN,DoctorantAdresse,DoctorantNumtel,DoctorantMail,DoctorantEtapro,DoctorantPreci,DoctorantAnebac,DoctorantSeribac,DoctorantNumbac,DoctorantDept,DoctorantCatdoc,DoctorantDerdip,DoctorantPrecii,DoctorantSpederdip,DoctorantDatederdip,DoctorantDatepremdoc,DoctorantSpedoc,DoctorantLaborata,DoctorantIntithe,DoctorantDatesout,DoctorantName,DoctorantPassword
    ,DirtNom,DirtPrenom,DirtGrade,DirtEtabori,DirtLaborata,DirtNumtel,DirtMail,CoDirtNom,CoDirtPrenom,CoDirtGrade,CoDirtEtabori,CoDirtLaborata,CoDirtNumtel,CoDirtMail]);
   
    const formudir = useCallback( async () => {
      setIsLoading(true);
  
            await axios.post("http://localhost:5000/users/register_dir",
             {
              dirnom: DirtNom.current.value,
              dirprenom: DirtPrenom.current.value,
              dirgrade: DirtGrade.current.value,
              diretabori: DirtEtabori.current.value,
              dirlaborata: DirtLaborata.current.value,
              dirnumtel: DirtNumtel.current.value,
              dirmail: DirtMail.current.value,
        
             },{ headers: {"Content-Type": "application/json",} });

            }
            
    ,[ setIsLoading,DirtNom,DirtPrenom,DirtGrade,DirtEtabori,DirtLaborata,DirtNumtel,DirtMail ]);  
  
    const formucodir = useCallback( async () => {

      setIsLoading(true);
  
            await axios.post("http://localhost:5000/users/register_codir",
             {
              codirnom: CoDirtNom.current.value,
              codirprenom: CoDirtPrenom.current.value,
              codirgrade: CoDirtGrade.current.value,
              codiretabori: CoDirtEtabori.current.value,
              codirlaborata: CoDirtLaborata.current.value,
              codirnumtel: CoDirtNumtel.current.value,
              codirmail: CoDirtMail.current.value,
        
             },{ headers: {"Content-Type": "application/json",} });
             
            }
    ,[ setIsLoading,CoDirtNom,CoDirtPrenom,CoDirtGrade,CoDirtEtabori,CoDirtLaborata,CoDirtNumtel,CoDirtMail ]);
  

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
    DoctorantDept.current.value === "" ||
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
            <TextField required variant="outlined" label="Nom" inputRef={DoctorantNom}/>            
            <TextField required variant="outlined" label="Prénom" inputRef={DoctorantPrenom} />
            </div>
            <div>
            <TextField required variant="outlined" label="Né(e) le" type="date" inputRef={DoctorantDateN}
             InputLabelProps={{
               shrink: true  
               }}/>
            <TextField required variant="outlined" label="à" inputRef={DoctorantLieuN} />
            <TextField required variant="outlined" label="Adresse" inputRef={DoctorantAdresse} />
            </div>     
           <div>
           <TextField required variant="outlined" label="N° de téléphone " name="phone"  inputRef={DoctorantNumtel} />
           <TextField required variant="outlined" label="Email" name="email" type="email" inputRef={DoctorantMail}/>            
           </div>
            {/* <TextField
                required
                variant="outlined"
                label="N° de téléphone"
                name="phoneNumber"
                type="tel"
                inputRef={DoctorantNumtel}
                defaultCountry={"dz"}
                as={MuiPhoneNumber}              
    />*/}
            
                      
            
            <div>
            <TextField  required variant="outlined" select   label="Etat professionnel"  defaultValue={""} inputRef={DoctorantEtapro} onChange={handleChangeEtapro} >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {etapro==="sal"? <TextField  variant="outlined" label="(Préciser)" inputRef={DoctorantPreci}/>:null}
            </div>
            <div>
            <TextField required variant="outlined" type="number" name="number" label="Année d’obtention du BAC" inputRef={DoctorantAnebac}/>
            <TextField required variant="outlined" type="number" name="number" label="Série du BAC " inputRef={DoctorantSeribac}/>
            <TextField required variant="outlined" type="number" name="number" label="N° du BAC " inputRef={DoctorantNumbac}/>
            </div> 
            <div>
            <TextField required variant="outlined" select   label="Département de" defaultValue={""} inputRef={DoctorantDept} onChange={handleChangeDep} >
          {currencies1.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField required variant="outlined" select   label="Fiche de reinscription en" defaultValue={""} inputRef={DoctorantCatdoc} onChange={handleChangeTypedoc} >
          {currencies2.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>     
            </div>  
            <div>
            <TextField required variant="outlined" select   label="Dernier diplome obtenu" defaultValue={""} inputRef={DoctorantDerdip} onChange={handleChangeDerdip} >
          {currencies3.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>  
            {derdip==="au"? <TextField  variant="outlined" label="(Préciser)" inputRef={DoctorantPrecii}/>:null}
            </div>
            <div>
            <TextField required variant="outlined" label="Spécialité dernier diplôme obtenu" inputRef={DoctorantSpederdip}/>
            <TextField required variant="outlined" label="Date de son obtention"  type="date" inputRef={DoctorantDatederdip}
              InputLabelProps={{
               shrink: true
               }}
            />
            </div>           
            <div>
            <TextField required variant="outlined" label="Date 1ère Inscription Doctorat"  type="date" inputRef={DoctorantDatepremdoc}
              InputLabelProps={{
               shrink: true
               }}
              />
            <TextField required variant="outlined" label="Spécialité du Doctorat" inputRef={DoctorantSpedoc}/>
            <TextField required variant="outlined" label="Laboratoire de rattachement" inputRef={DoctorantLaborata}/>
            </div>
            <div>
            <TextField required variant="outlined" label="Intitulé de la thèse" inputRef={DoctorantIntithe}/>
            <TextField required variant="outlined" label="Date prévue de soutenance"  type="date" inputRef={DoctorantDatesout}
              InputLabelProps={{
               shrink: true
               }}
            />
            </div>         
            <div>
            <TextField required variant="outlined" label="Nom de compte" inputRef={DoctorantName}/>
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth              
              label="Mot de passe"
              autoComplete="off"
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
            <TextField required variant="outlined" label="Nom" inputRef={DirtNom}/>
            <TextField required variant="outlined" label="Prénom" inputRef={DirtPrenom}/>
            </div>
            <div>
            <TextField required variant="outlined" label="Grade" inputRef={DirtGrade}/>
            <TextField required variant="outlined" label="Etablissement d'origine" inputRef={DirtEtabori}/>
            <TextField required variant="outlined" label="Laboratoire de rattachement" inputRef={DirtLaborata}/>
            </div>
            <div>
            <TextField required variant="outlined" label="N° de téléphone " name="phone"  inputRef={DirtNumtel}/>
            <TextField  required variant="outlined" label="Email" name="email di" type="email" inputRef={DirtMail}/>
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
            <TextField required variant="outlined" label="Nom" inputRef={CoDirtNom}/>
            <TextField required variant="outlined" label="Prénom" inputRef={CoDirtPrenom}/>
            </div>
            <div>
            <TextField required variant="outlined" label="Grade" inputRef={CoDirtGrade}/>
            <TextField required variant="outlined" label="Etablissement d'origine" inputRef={CoDirtEtabori}/>
            <TextField required variant="outlined" label="Laboratoire de rattachement" inputRef={CoDirtLaborata}/>
            </div>            
            <div>
            <TextField required variant="outlined" label="N° de téléphone " name="phone"  inputRef={CoDirtNumtel}/>
            <TextField  required variant="outlined" label="Email" name="email" type="email" inputRef={CoDirtMail}/>
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
              Valider {isLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}


AddDoc.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
};

export default withRouter(withStyles(styles)(AddDoc));
