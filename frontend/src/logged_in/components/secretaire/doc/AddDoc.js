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
function AddDoc(props) {
  
  const {
    pushMessageToSnackbar,
    onClose,
  } = props;
  const { userData } = useContext(UserContext);

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
  const DoctorantPreci = useRef();
  const DoctorantPrecii = useRef();
  const DoctorantName = useRef();
  const DoctorantPassword = useRef();
  const DoctorantdirNom = useRef();
  const DoctorantdirPrenom = useRef();
  const DoctorantdirGrade = useRef();
  const DoctorantcodirNom = useRef();
  const DoctorantcodirPrenom = useRef();
  const DoctorantcodirGrade = useRef();

 
  const [isLoading, setIsLoading] = useState(false);

  const [,setTypedoc] = React.useState('');
  const [etapro, setEtapro] = React.useState('');
  const [derdip, setDerdip] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
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
            username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
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
            dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,

          }
           ,{headers: {"Content-Type": "application/json",}})
           .then((response) => {
            // Success 🎉
                     
      setIsLoading(true);
  
      setTimeout(() => {
       
       pushMessageToSnackbar({
           text: "ajouté avec succès",
       });
       window.location.reload(false);
       }, 10);
        }).catch((error) => {
          if(error.response.data.msg === "doctorant existe déjà.")
               {
                setIsLoading(false);
                pushMessageToSnackbar({
                  text: "doctorant existe déjà",
                });
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
                username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
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
                dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,
        
              }
               ,{headers: {"Content-Type": "application/json",},})
               .then((response) => {
                // Success 🎉
                         
      setIsLoading(true);
  
      setTimeout(() => {
       
       pushMessageToSnackbar({
           text: "ajouté avec succès",
       });
       window.location.reload(false);
       }, 10);
            }).catch((error) => {
              if(error.response.data.msg === "doctorant existe déjà.")
                   {
                    setIsLoading(false);
                    pushMessageToSnackbar({
                      text: "doctorant existe déjà",
                    });
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
      username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
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
      dirnom: DoctorantdirNom.current.value,
      dirprenom: DoctorantdirPrenom.current.value,
      dirgrade:  DoctorantdirGrade.current.value,
      codirnom: DoctorantcodirNom.current.value,
      codirprenom: DoctorantcodirPrenom.current.value,
      codirgrade: DoctorantcodirGrade.current.value,
         } 
               ,{headers: {"Content-Type": "application/json",},})
               .then((response) => {
                // Success 🎉
                         
      setIsLoading(true);
  
      setTimeout(() => {
       
       pushMessageToSnackbar({
           text: "ajouté avec succès",
       });
       window.location.reload(false);
       }, 10);
            }).catch((error) => {
              if(error.response.data.msg === "doctorant existe déjà.")
                   {
                    setIsLoading(false);
                      pushMessageToSnackbar({
                       text: "doctorant existe déjà",
                          });
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
          username: DoctorantName.current.value,
          password: DoctorantPassword.current.value,
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
          dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,
          }
          ,
          {headers: {"Content-Type": "application/json",},})
          .then((response) => { 
            // Success 🎉
               
      setIsLoading(true);
  
     setTimeout(() => {
      
      pushMessageToSnackbar({
          text: "ajouté avec succès",
      });
      window.location.reload(false);
      }, 10);
    
        }).catch((error) => {
          if(error.response.data.msg === "doctorant existe déjà.")
               {
                setIsLoading(false);
                pushMessageToSnackbar({
                  text: "doctorant existe déjà",
                });
                setIsLoading(false);
              }
      });
        }     
    
      }
  ,[ setIsLoading,pushMessageToSnackbar,onClose,DoctorantNom,DoctorantPrenom,DoctorantDateN,DoctorantLieuN,DoctorantAdresse,DoctorantNumtel,DoctorantMail,DoctorantEtapro,DoctorantPreci,DoctorantAnebac,DoctorantSeribac,DoctorantNumbac,DoctorantCatdoc,DoctorantDerdip,DoctorantPrecii,DoctorantSpederdip,DoctorantDatederdip,DoctorantDatepremdoc,DoctorantSpedoc,DoctorantLaborata,DoctorantIntithe,DoctorantName,DoctorantPassword
    ,DoctorantdirNom,DoctorantdirPrenom,DoctorantdirGrade,DoctorantcodirNom,DoctorantcodirPrenom,DoctorantcodirGrade]);

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
    DoctorantLaborata.current.value === "" ||   
    DoctorantName.current.value === "" ||
    DoctorantPassword.current.value === ""  ||
    DoctorantdirNom.current.value === ""  ||
    DoctorantdirPrenom.current.value === ""  ||
    DoctorantdirGrade.current.value === ""  ||
    DoctorantcodirNom.current.value === ""  ||
    DoctorantcodirPrenom.current.value === ""  ||
    DoctorantcodirGrade.current.value === ""  
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
            <TextField required variant="outlined" type="number" name="number" inputProps={{min:1950}} label="Année d’obtention du BAC" inputRef={DoctorantAnebac}/>
            <TextField required variant="outlined"  label="Série du BAC " inputRef={DoctorantSeribac}/>
            <TextField required variant="outlined" type="number" name="number" label="N° du BAC " inputRef={DoctorantNumbac}/>
            </div> 
            <div>      
        <TextField required variant="outlined" select   label="Fiche de reinscription en" defaultValue={""} inputRef={DoctorantCatdoc} onChange={handleChangeTypedoc} >
          {currencies2.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>                
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
            </div>
            <div>
            <TextField required variant="outlined" label="Laboratoire de rattachement" inputRef={DoctorantLaborata}/>
            <TextField required variant="outlined" label="Intitulé de la thèse" inputRef={DoctorantIntithe}/>
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
            <TextField required variant="outlined" label="Nom" inputRef={DoctorantdirNom}/>
            <TextField required variant="outlined" label="Prénom" inputRef={DoctorantdirPrenom}/>
            <TextField required variant="outlined" label="Grade" inputRef={DoctorantdirGrade}/>
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
            <TextField required variant="outlined" label="Nom" inputRef={DoctorantcodirNom}/>
            <TextField required variant="outlined" label="Prénom" inputRef={DoctorantcodirPrenom}/>
            <TextField required variant="outlined" label="Grade" inputRef={DoctorantcodirGrade}/>
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