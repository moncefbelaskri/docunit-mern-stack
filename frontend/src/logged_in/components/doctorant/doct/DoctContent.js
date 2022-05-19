import React,{useState, useCallback} from "react";
import PropTypes from "prop-types";
import { Divider,Paper, Typography,Toolbar,Button,Box,Card } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import classNames from "classnames";
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';

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
  });

function DoctContent(props) {
    const{pushMessageToSnackbar,theme,classes}=props;
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
    <Paper >
    <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Profil</Typography>
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
            <div><TextareaAutosize className={classes.Area} aria-label="Etatav" minRows={5} maxRows={5}  placeholder="Etat d'avancement"/></div></Box>
          }
          onClose={handleEtavDialogClose}
          onConfirm={Etav}
          loading={isEtavLoading} />
    </Toolbar>
    <Divider/>
    <Box>
      <Card variant="outlined">
        <CardContent>
         <Typography variant="h6" content="h2">Nom </Typography>
         <Typography variant="h6" content="h2">Prénom </Typography>
         <Typography variant="h6" content="h2">Intitulé de la thèse </Typography>
         <Typography variant="h6" content="h2">Etat d'avancement </Typography>
         <Typography variant="h6" content="h2">Pourcentage d'avancement </Typography>
         <Typography variant="h6" content="h2">Date de soutenance </Typography>
        </CardContent>
      </Card>
    </Box>
    </Paper>
 )
}

DoctContent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DoctContent);
