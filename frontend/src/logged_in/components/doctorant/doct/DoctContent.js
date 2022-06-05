import React,{useState, useCallback, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { Divider,Paper, Typography,Toolbar,Button,Box, List, ListItem, ListItemText } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";
import Bordered from "../../../../shared/components/Bordered";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import TextField from '@mui/material/TextField';
import UserContext from "../../../../shared/components/UserContext"; 
import Step from '@mui/material/Step';

const axios = require('axios');

const steps = ['Inscriptions', 'Soutenance', 'Diplôme'];



const styles =(theme)=> ({
  Highlight:{
    textAlign: 'center',
    marginLeft:theme.spacing(-1),
    padding: '3',
    width:390,
  },
  Area:{
    marginLeft:theme.spacing(1),
    color: 'black',
    padding: '0 22px',
    fontSize: '17px',
    width:355,
  },
  date:{
    marginLeft:theme.spacing(1),
    padding: '0 22px',
    height:40,
    width:355,
  },
  rang:{
    marginLeft:theme.spacing(1),
    width:355,
  },
  stepIcon:{
    color: "#0091EA !important",
  },
    tableWrapper: {
      overflowX: "auto",
    },
    alignRight: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
    },
    iconButton: {
      padding: theme.spacing(1),
    },
    dBlock: {
      display: "block",
    },
    dNone: {
      display: "none",
    },
    toolbar: {
      justifyContent: "space-between",
    },
    bt:{
      marginRight:theme.spacing(40),
      justifyContent: "space-between",
    },
    box: {
      marginLeft: theme.spacing(15),
    },

  });


  function valueLabelFormat(value) {
    const units = ['%'];
    let unitIndex = 0;
    let scaledValue = value;
    return `${scaledValue} ${units[unitIndex]}`;
  }

 

  function calculateValue(value) {
    return value;
  }


function DoctContent(props) {
    const{pushMessageToSnackbar,classes,onFormSubmit,onClose}=props;


    const { userData } = useContext(UserContext);
    const [isEtavDialogOpen, setIsEtavDialogOpen] = useState(
      false
    );
    const [isEtavLoading, setIsEtavLoading] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleEtavDialogClose = useCallback(() => {
      setIsEtavDialogOpen(false);
    }, [setIsEtavDialogOpen]);
  
    const handleEtavDialogOpen = useCallback(
      () => {
        setIsEtavDialogOpen(true);
      },
      [setIsEtavDialogOpen]
    );

    const Avancementpct = useRef();
    const Avancementdatesout = useRef();
    const Avancementetav = useRef();

    const calculedate = () => {

      const current = new Date();
      const date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;

      var year1 = new Date(userData.user.datepremdoc); 
      var year2 = new Date(date);

      var difference= Math.abs(year2-year1);
      var years = difference/(1000 * 3600 * 24 * 365);
      return Math.trunc(years);
      };
      

     
    const formuav = useCallback( async () => {
      setIsEtavDialogOpen(true);
      setIsEtavLoading(true);
      const ExistDocEvnc = await axios.post(

        "http://localhost:5000/users/AvncDocEX",

        null,

        { headers: { "x-avnc": userData.user.username } }

      );
      if(!ExistDocEvnc.data)
      {
            await axios.post("http://localhost:5000/users/docavnc",
      {
        usernamedoc: userData.user.username,
        pctav: Avancementpct.current.value,
        datesout: Avancementdatesout.current.value,
        etav: Avancementetav.current.value,
        aneactu: calculedate()+1,
    },{headers: {"Content-Type": "application/json",}})
    .then((response) => {
      setIsEtavDialogOpen(true);
      setIsEtavLoading(true);
      setTimeout(() => {
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
        pushMessageToSnackbar({
          text: "Avancement validé",
        });
      }, 1500);
    }).catch((error) => {
      if(error.response.data.msg === "inscription impossible")
      {
        pushMessageToSnackbar({
          text: "Inscription impossible, vous avez dépasser les 5 ans du doctorat",
        });
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
      }
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
  });
}
else{

  await axios.put("http://localhost:5000/users/update/avncdoc/"+ userData.user.username,
      {
        usernamedoc: userData.user.username,
        pctav: Avancementpct.current.value,
        datesout: Avancementdatesout.current.value,
        etav: Avancementetav.current.value,
        aneactu: calculedate()+1,
    },{headers: {"Content-Type": "application/json",}})
    .then((response) => {
      setIsEtavDialogOpen(true);
      setIsEtavLoading(true);
      setTimeout(() => {
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
        pushMessageToSnackbar({
          text: "Avancement validé",
        });
      }, 1500);
    }).catch((error) => {
      if(error.response.data.msg === "avancement déjà validé")
      {
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
        pushMessageToSnackbar({
          text: "Avancement déjà validé, veuillez attendre l'année prochaine",
        });
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
      }

      if(error.response.data.msg === "inscription impossible")
      {
        pushMessageToSnackbar({
          text: "Inscription impossible, vous avez dépasser les 5 ans du doctorat",
        });
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
      }
  });

}

},[setIsEtavDialogOpen,setIsEtavLoading,pushMessageToSnackbar,Avancementpct,Avancementdatesout,Avancementetav])

const handleUpload = useCallback(async () => {
  setIsEtavDialogOpen(true);
  setIsEtavLoading(true);
    if(Avancementdatesout.current.value === "" || Avancementetav.current.value === "")
  {
    setIsEtavDialogOpen(true); 
    setIsEtavLoading(false); 
  }
  else{

    formuav();
      
  }
},[onClose,setIsEtavDialogOpen,setIsEtavLoading,pushMessageToSnackbar]);

return (
  <Paper>
  <Toolbar className={classes.toolbar}>
      <Typography variant="h5">Profil</Typography>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        onClick={() => {
          handleEtavDialogOpen();
        } } 
      >
        Reinscription
      </Button>
      <ConfirmationDialog
        open={isEtavDialogOpen}
        title="Votre avancement global"
        content={
          <form onSubmit={onFormSubmit}>
          <Box>
            <div>

          <Typography id="non-linear-slider" gutterBottom>

          Pourcentage d'avancement : {valueLabelFormat(calculateValue(value))}

          </Typography>

          <input
        type="range"

        className={classes.rang}

         value={value}

         min="0"
         max="100"

         onChange={({ target: { value: radius } }) => {
          setValue(radius);
        }}

         ref={Avancementpct}
         
         />

          </div>
          <br/>
          <div>
          <Typography>
          Date prévue de soutenance
          </Typography>
          <br/>
            <input className={classes.date} type="date" required   ref={Avancementdatesout}/>
          </div>
          <br/>
          <div>
          <Typography>
          Etat d'avancement
          </Typography>  
          <br/>
            <TextareaAutosize className={classes.Area} aria-label="Etatav" required  minRows={7} maxRows={7}   ref={Avancementetav}/>
          </div>
          <br/>
             <div> 
             <HighlightedInformation className={classes.Highlight}>
            <b>Vérifiez bien vos informations avant de confirmer.</b>
            </HighlightedInformation>
             </div>
        </Box>
        </form>
        }
        onClose={handleEtavDialogClose}
        onConfirm={handleUpload}
        loading={isEtavLoading} />
  </Toolbar>
  <Divider/>
  <Box
        sx={{
      '& .MuiTextField-root': { m: 2},
    }}       
  >
  <List disablePadding> 
      <Bordered disableVerticalPadding disableBorderRadius>
        <ListItem  disableGutters className="listItemLeftPaddingg">
          <ListItemText>
          <div>
            <TextField  variant="standard"   label="Nom" sx={{width:"35ch"}} inputProps={{ readOnly: true }} defaultValue={userData.user.nom}/>
            <TextField  variant="standard" label="Prénom" sx={{width:"35ch"}} inputProps={{ readOnly: true }} defaultValue={userData.user.prenom}/>
          </div>
          <div>
            <TextField  variant="standard"  label="Intitulé de la thèse" sx={{width:"73.5ch"}} inputProps={{ readOnly: true }} defaultValue={userData.user.intithe}/>
          </div>
          <div>
            <TextField  variant="standard"  label="Nom Directeur de thèse" sx={{width:"35ch"}} inputProps={{ readOnly: true }} defaultValue={userData.user.dirnom}/>
            <TextField  variant="standard"  label="Prénom" sx={{width:"35ch"}} inputProps={{ readOnly: true }} defaultValue={userData.user.dirprenom}/>
          </div>
          <div>
            <TextField  variant="standard"  label="Nom Co-Directeur de thèse" sx={{width:"35ch"}} inputProps={{ readOnly: true }} defaultValue={userData.user.codirnom}/>
            <TextField  variant="standard"  label="Prénom" sx={{width:"35ch"}} inputProps={{ readOnly: true }} defaultValue={userData.user.codirprenom}/>
          </div>
          <div>
          <Stepper  sx={{ pt: 3, pb: 5, pl:5, width: '71ch'  }}>
          {steps.map((label) => (
            <Step  key={label}>
              <StepLabel StepIconProps={{classes:{active: classes.stepIcon}}}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
          </div>
          <Toolbar className={classes.bt}>
          &nbsp;&nbsp;
      <Button
        variant="contained"
        color="primary"
        disableElevation      
      >
        Fiche d'inscription
      </Button>
      <Button
        variant="contained"
        color="primary"
        disableElevation         
      >
        Fiche de reinscription
      </Button>
          </Toolbar>
          </ListItemText>
        </ListItem>          
      </Bordered>
    </List>
  </Box>
  

  
  </Paper>
)
}

DoctContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DoctContent);

