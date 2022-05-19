import React, { useState, useRef , useContext,useCallback} from "react";
import PropTypes from "prop-types";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import Bordered from "../../../../shared/components/Bordered";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import UserContext from "../../../../shared/components/UserContext";
import valider from "./valider";
const axios = require('axios');

const styles = (theme) => ({
  
  dNone: {
    display: "none",
  },
});


function AddFormulaire()  {
  var all = [];
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
  const { setUserData } = useContext(UserContext);

  const [dep, setDep] = React.useState('');
  const [typedoc, setTypedoc] = React.useState('');
  const [etapro, setEtapro] = React.useState('');
  const [derdip, setDerdip] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
  
  const formu = useCallback( async () => {
    setIsLoading(true);
    await axios.post(
        "http://localhost:5000/users/login",
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
          catdoc: DoctorantCatdoc.current.value,
          derdip: DoctorantDerdip.current.value,
          spederdip: DoctorantSpederdip.current.value,
          datederdip: DoctorantDatederdip.current.value,
          datepremdoc: DoctorantDatepremdoc.current.value,
          spedoc: DoctorantSpedoc.current.value,
          laborata: DoctorantLaborata.current.value,
          intithe: DoctorantIntithe.current.value,
          datesout: DoctorantDatesout.current.value,
          preci: DoctorantPreci.current.value,
          precii: DoctorantPrecii.current.value,
          name: DoctorantName.current.value,
          password: DoctorantPassword.current.value,

          nom: DirtNom.current.value,
          prenom: DirtPrenom.current.value,
          grade: DirtGrade.current.value,
          etabori: DirtEtabori.current.value,
          laborata: DirtLaborata.current.value,
          numtel: DirtNumtel.current.value,
          mail: DirtMail.current.value,

          nom: CoDirtNom.current.value,
          prenom: CoDirtPrenom.current.value,
          grade: CoDirtGrade.current.value,
          etabori: CoDirtEtabori.current.value,
          laborata: CoDirtLaborata.current.value,
          numtel: CoDirtNumtel.current.value,
          mail: CoDirtMail.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setUserData({
          token: response.data.token,
          user: response.data.user,
        })
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem('auth-token', response.data.token);
          localStorage.setItem('user_id', response.data.id);
        }, 1000);
      })
        .catch((error) => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
      
     
  },[ setIsLoading,DoctorantNom,DoctorantPrenom, DoctorantDateN,DoctorantLieuN,DoctorantAdresse,DoctorantNumtel,DoctorantMail,DoctorantEtapro,DoctorantAnebac,DoctorantSeribac,DoctorantNumbac,DoctorantDept,DoctorantCatdoc,DoctorantDerdip,DoctorantSpederdip,DoctorantDatederdip,DoctorantDatepremdoc,DoctorantSpedoc,DoctorantLaborata,DoctorantIntithe,DoctorantDatesout,DoctorantPreci,DoctorantPrecii,DoctorantName,DoctorantPassword,
    DirtNom,DirtPrenom,DirtGrade,DirtEtabori,DirtLaborata,DirtNumtel,DirtMail,CoDirtNom,CoDirtPrenom,CoDirtGrade,CoDirtEtabori,CoDirtLaborata,CoDirtNumtel,CoDirtMail]);

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '29.5ch' },
      }}
      noValidate
      autoComplete="off"

      loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          formu();
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
            <TextField required id="outlined-required" label="Nom" inputRef={DoctorantNom} onChange={async () => { valider(DoctorantNom.current.value , all )}}/>
            <TextField required id="outlined-required" label="Prénom" inputRef={DoctorantPrenom} />
            </div>
            <div>
            <TextField required id="outlined-required" label="Né(e) le" defaultValue="JJ/MM/AA" inputRef={DoctorantDateN} />
            <TextField required id="outlined-required" label="à" inputRef={DoctorantLieuN} />
            <TextField required id="outlined-required" label="Adresse" inputRef={DoctorantAdresse} />
            </div>     
            <div>
            <TextField required id="outlined-required" label="N° de téléphone " inputRef={DoctorantNumtel} />
            <TextField required id="outlined-required" label="Email" inputRef={DoctorantMail} />           
            </div>
            <div>
            <FormControl required sx={{ m: 1, width: '29.5ch' }} inputRef={DoctorantEtapro}>
                <InputLabel id="demo-simple-select-required-label">Etat professionnel</InputLabel>
                  <Select labelId="demo-simple-select-required-label" id="demo-simple-select-required" value={etapro} label="Etat professionnel" onChange={handleChangeEtapro}>                    
                    <MenuItem value="sal">Salarié(e)</MenuItem>
                    <MenuItem value="nonsal">Non Salarié(e)</MenuItem>
                  </Select>              
            </FormControl>
            {etapro==="sal"? <TextField required id="outlined-required" label="(Préciser)" inputRef={DoctorantPreci}/>:null}
            </div>
            <div>
            <TextField required id="outlined-required" label="Année d’obtention du BAC" inputRef={DoctorantAnebac}/>
            <TextField required id="outlined-required" label="Série du BAC " inputRef={DoctorantSeribac}/>
            <TextField required id="outlined-required" label="N° du BAC " inputRef={DoctorantNumbac}/>
            </div> 
            <div>
              <FormControl required sx={{ m: 1, width: '29.5ch' }} inputRef={DoctorantDept}>
                <InputLabel id="demo-simple-select-required-label">Département de</InputLabel>
                  <Select labelId="demo-simple-select-required-label" id="demo-simple-select-required" value={dep} label="Département de" onChange={handleChangeDep}>                    
                    <MenuItem value="info">Informatique</MenuItem>
                    <MenuItem value="math">Mathématique</MenuItem>
                    <MenuItem value="phy">Physique</MenuItem>
                    <MenuItem value="chi">Chimie</MenuItem>
                  </Select>              
              </FormControl>
              <FormControl required sx={{ m: 1, width: '29.5ch' }} inputRef={DoctorantCatdoc}>
                <InputLabel id="demo-simple-select-required-label">Fiche de reinscription en</InputLabel>
                  <Select labelId="demo-simple-select-required-label" id="demo-simple-select-required" value={typedoc} label="Fiche de reinscription en" onChange={handleChangeTypedoc}>                    
                    <MenuItem value="sci">Doctorat en sciences</MenuItem>
                    <MenuItem value="lmd">Doctorat LMD</MenuItem>
                  </Select>              
              </FormControl>
            </div>  
            <div>
            <FormControl required sx={{ m: 1, width: '29.5ch' }} inputRef={DoctorantDerdip}>
                <InputLabel id="demo-simple-select-required-label">Dernier diplome obtenu</InputLabel>
                  <Select labelId="demo-simple-select-required-label" id="demo-simple-select-required" value={derdip} label="Dernier diplome obtenu" onChange={handleChangeDerdip}>                    
                    <MenuItem value="mag">Magister</MenuItem>
                    <MenuItem value="mas">Master</MenuItem>
                    <MenuItem value="au">Autre</MenuItem>r
                  </Select>              
            </FormControl>
            {derdip==="au"? <TextField required id="outlined-required" label="(Préciser)" inputRef={DoctorantPrecii}/>:null}
            </div>
            <div>
            <TextField required id="outlined-required" label="Spécialité dernier diplôme obtenu" inputRef={DoctorantSpederdip}/>
            <TextField required id="outlined-required" label="Date de son obtention" defaultValue="JJ/MM/AA" inputRef={DoctorantDatederdip}/>
            </div>           
            <div>
            <TextField required id="outlined-required" label="Date 1ère Inscription Doctorat" defaultValue="JJ/MM/AA" inputRef={DoctorantDatepremdoc}/>
            <TextField required id="outlined-required" label="Spécialité du Doctorat" inputRef={DoctorantSpedoc}/>
            <TextField required id="outlined-required" label="Laboratoire de rattachement" inputRef={DoctorantLaborata}/>
            </div>
            <div>
            <TextField required id="outlined-required" label="Intitulé de la thèse" inputRef={DoctorantIntithe}/>
            <TextField required id="outlined-required" label="Date prévue de soutenance" defaultValue="JJ/MM/AA" inputRef={DoctorantDatesout}/>   
            </div>         
            <div>
            <TextField required id="outlined-required" label="Nom de compte" inputRef={DoctorantName}/>
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
            <TextField required id="outlined-required" label="Nom" inputRef={DirtNom}/>
            <TextField required id="outlined-required" label="Prénom" inputRef={DirtPrenom}/>
            </div>
            <div>
            <TextField required id="outlined-required" label="Grade" inputRef={DirtGrade}/>
            <TextField required id="outlined-required" label="Etablissement d'origine" inputRef={DirtEtabori}/>
            <TextField required id="outlined-required" label="Laboratoire de rattachement" inputRef={DirtLaborata}/>
            </div>
            <div>
            <TextField required id="outlined-required" label="N° de téléphone " inputRef={DirtNumtel}/>
            <TextField required id="outlined-required" label="Email" inputRef={DirtMail}/>
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
            <TextField required id="outlined-required" label="Nom" inputRef={CoDirtNom}/>
            <TextField required id="outlined-required" label="Prénom" inputRef={CoDirtPrenom}/>
            </div>
            <div>
            <TextField required id="outlined-required" label="Grade" inputRef={CoDirtGrade}/>
            <TextField required id="outlined-required" label="Etablissement d'origine" inputRef={CoDirtEtabori}/>
            <TextField required id="outlined-required" label="Laboratoire de rattachement" inputRef={CoDirtLaborata}/>
            </div>            
            <div>
            <TextField required id="outlined-required" label="N° de téléphone " inputRef={CoDirtNumtel}/>
            <TextField required id="outlined-required" label="Email" inputRef={CoDirtMail}/>
            </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

    </Box>
  );
}

AddFormulaire.propTypes = {
  
  notvide: PropTypes.func.isRequired,
  
}
export default withStyles(styles, { withTheme: true })(AddFormulaire);
