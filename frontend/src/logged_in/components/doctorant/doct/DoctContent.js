import React,{useState, useCallback, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { Divider,Paper, Typography,Slider,Toolbar,Button,Box,Card,Table,TableBody,TableCell,TablePagination,TableRow,IconButton } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import UserContext from "../../../../shared/components/UserContext";
import SelectInput from "@mui/material/Select/SelectInput";

const axios = require('axios');


const marks = [
  {
    value:  33,
    label: 'Inscriptions',
  },
  {
    value: 66,
    label: 'Soutenance',
  },
  {
    value: 99,
    label: 'Diplôme',
  },
  
];

const styles =(theme)=> ({
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
  etapes:{
    marginLeft:theme.spacing(1),
    width:355,
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

    const { idavncData } = useContext(UserContext);

    const { userData } = useContext(UserContext);
    const [isEtavDialogOpen, setIsEtavDialogOpen] = useState(
      false
    );
    const [isEtavLoading, setIsEtavLoading] = useState(false);

    const [value, setValue] = React.useState(0);



    const handleChange = (event, newValue) => {

      if (typeof newValue === 'number') {

        setValue(newValue);

      }

    };

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

      if(calculedate() < 3)
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
      if(error.response.data.msg === "avancement déjà validé")
      {
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
        pushMessageToSnackbar({
          text: "avancement déjà validé, veuillez attendre l'année prochaine",
        });
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
      }
  });
}
else{
  await axios.put("http://localhost:5000/users/update/avnc"+ idavncData.idavncup._id,
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
          text: "avancement déjà validé, veuillez attendre l'année prochaine",
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

           //defaultValue={idavncData.idavncup.pct}
           ref={Avancementpct}
           
           />

            </div>
            <br/>
            <div>
            <Typography>
            Date prévue de soutenance
            </Typography>
            <br/>
              <input className={classes.date} type="date" required /*defaultValue={idavncData.idavncup.ds}*/  ref={Avancementdatesout}/>
            </div>
            <br/>
            <div>
            <Typography>
            Etat d'avancement
            </Typography>  
            <br/>
              <TextareaAutosize className={classes.Area} aria-label="Etatav" required /*defaultValue={idavncData.idavncup.eav}*/ minRows={7} maxRows={7}   ref={Avancementetav}/>
            </div>
          </Box>
          </form>
          }
          onClose={handleEtavDialogClose}
          onConfirm={handleUpload}
          loading={isEtavLoading} />
    </Toolbar>
    <Divider/>
    <Box >
    <div className={classes.tableWrapper}>
    <Table>
    <TableBody>
    <TableRow>                                   
              <TableCell component="th" scope="row" width="30%">
                <Typography variant="h5">Nom</Typography>
              </TableCell>
              <TableCell component="th" scope="row" align="left">
                <Typography variant="h6">{userData.user.nom}</Typography>
              </TableCell>
    </TableRow>
    <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h5">Prénom</Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="h6">{userData.user.prenom}</Typography>
              </TableCell>
    </TableRow>
    <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h5">Intitulé de la thèse</Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="h6">{userData.user.intithe}</Typography>
              </TableCell>
    </TableRow>
    <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h5">Directeur de thèse</Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="h6">{userData.user.dirnom} {userData.user.dirprenom}</Typography>
              </TableCell>
    </TableRow>
    <TableRow>                                     
              <TableCell component="th" scope="row">
                <Typography variant="h5">Co-Directeur de thèse</Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="h6">{userData.user.codirnom} {userData.user.codirprenom}</Typography>
              </TableCell>
    </TableRow>
    <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h5">Date de soutenance</Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                {/*<Typography variant="h6">{idavncData.idavncup.ds}</Typography>*/}
              </TableCell>
    </TableRow>                      
    </TableBody>
    </Table>
    </div>
    </Box>
    <Toolbar className={classes.toolbar}>
        <div>
         <Button
          variant="contained"
          color="primary"
          disableElevation
        
        >
          Consulter fiche d'inscription
        </Button>
        </div>
        
        <div>
        <Button
          variant="contained"
          color="primary"
          disableElevation
         
        >
          Consulter fiche de reinscription
        </Button>
        </div>
</Toolbar>

        <Slider 
        className={classes.etapes}       
        aria-label="etapes"
        defaultValue={33}
        step={33}
        marks={marks}
        disabled
      />

    </Paper>
 )
}

DoctContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DoctContent);
