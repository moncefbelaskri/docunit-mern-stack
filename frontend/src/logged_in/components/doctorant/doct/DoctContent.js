import React,{useState, useCallback, useContext} from "react";
import PropTypes from "prop-types";
import { Divider,Paper, Typography,Toolbar,Button,Box,Card,Table,TableBody,TableCell,TablePagination,TableRow,IconButton } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import UserContext from "../../../../shared/components/UserContext";





const styles =(theme)=> ({
  Area:{
    border:0,
    color: 'black',
    padding: '0 22px',
    resize: 'none',
    fontSize: '17px',
    width:320,
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

function DoctContent(props) {
    const{pushMessageToSnackbar,classes}=props;
    const { userData } = useContext(UserContext);
    const [isEtavDialogOpen, setIsEtavDialogOpen] = useState(
      false
    );
    const [isEtavLoading, setIsEtavLoading] = useState(false);
    const Etav = useCallback(() => {
      setIsEtavLoading(true);
      setTimeout(() => {
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
        pushMessageToSnackbar({
          text: "Avancement validé",
        });
      }, 1500);
    }, [
      setIsEtavDialogOpen,
      setIsEtavLoading,
      pushMessageToSnackbar,
    ]);
    const handleEtavDialogClose = useCallback(() => {
      setIsEtavDialogOpen(false);
    }, [setIsEtavDialogOpen]);
  
    const handleEtavDialogOpen = useCallback(
      () => {
        setIsEtavDialogOpen(true);
      },
      [setIsEtavDialogOpen]
    );


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
            <Box><div><TextField  sx={{ m: 1, width: 300 }} id="outlined-required" label="Pourcentage d'avancement" /></div>
            <div><TextareaAutosize className={classes.Area} aria-label="Etatav" minRows={8} maxRows={8}  placeholder="Etat d'avancement"/></div></Box>
          }
          onClose={handleEtavDialogClose}
          onConfirm={Etav}
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
                <text style={{textTransform: 'capitalize'}}>{userData.user.nom} </text>
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
                <Typography variant="h6"></Typography>
              </TableCell>
    </TableRow>
    <TableRow>                                     
              <TableCell component="th" scope="row">
                <Typography variant="h5">Co-Directeur de thèse</Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="h6"></Typography>
              </TableCell>
    </TableRow>
    <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h5">Date de soutenance</Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="h6">{userData.user.datesout}</Typography>
              </TableCell>
    </TableRow>                      
    </TableBody>
    </Table>
    </div>
    </Box>
    <Toolbar className={classes.toolbar}>

         <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            handleEtavDialogOpen();
          } } 
        >
          Consulter fiche d'inscription
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            handleEtavDialogOpen();
          } } 
        >
          Consulter fiche de reinscription
        </Button>
</Toolbar>
    
    </Paper>
 )
}

DoctContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DoctContent);
