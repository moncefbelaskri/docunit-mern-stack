import React, { Fragment, useState, useRef , useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, List, ListItem, ListItemText, Button, Box, fabClasses } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { withRouter } from "react-router-dom";
import Bordered from "../../../../shared/components/Bordered";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import UserContext from "../../../../shared/components/UserContext";
import { useHistory } from "react-router-dom";
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import DirContent from "./DirContent";
import ActionPaper from "../../../../shared/components/ActionPaper";
import ButtonCircularProgress from "../../../../shared/components/ButtonCircularProgress";
const axios = require('axios');

const styles = () => ({
  dNone: {
    display: "none",
  },
});

function AddDir(props) {

  const {
    pushMessageToSnackbar,
    onClose,
  } = props;
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const EnsNom = useRef();
  const [dirs, setDirs] = useState([]);
  const EnsPrenom = useRef();
  const EnsMail = useRef();
  const EnsName = useRef();
  const EnsPassword = useRef();
  const [dep, setDep] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  var existed = null;
  const formuens = useCallback( async () => {
    //if( (DirtNom.current.value === EnsNom.current.value && DirtPrenom.current.value === EnsPrenom.current.value)
        //|| (CoDirtNom.current.value === EnsNom.current.value && CoDirtPrenom.current.value === EnsPrenom.current.value))
        setIsLoading(true);
        await axios.post("http://localhost:5000/users/register_ens",
      {
       ensnom: EnsNom.current.value,
       ensprenom: EnsPrenom.current.value,
       ensmail: EnsMail.current.value,
       ensusername: EnsName.current.value,
       enspassword: EnsPassword.current.value,
       ensdept : userData.user.dept,
     }
      ,{headers: {"Content-Type": "application/json",}})          
     .then((response) => {
       // Success 🎉
   }).catch((error) => {
     if(error.response.data.msg === "enseignant existe déjà.")
          {
           setIsLoading(false);
           pushMessageToSnackbar({
             text: "Enseignant existe déjà",
           });
           existed = "yes";
           setIsLoading(false);
         }
 });    
 if(existed !== "yes") {
  setIsLoading(true);
  
setTimeout(() => {
  
  pushMessageToSnackbar({
      text: "ajouté avec succès",
  });
  window.location.reload(false);
  }, 10);

}          
      },[ setIsLoading,pushMessageToSnackbar,onClose,EnsNom,EnsPrenom,EnsMail,EnsName,EnsPassword,history]);
   
    
  const handleUpload = useCallback(async () => {
    setIsLoading(true);
    if(EnsNom.current.value === "" ||
    EnsPrenom.current.value === "" ||
    EnsName.current.value === "" ||
    EnsPassword.current.value === "" ||
    EnsMail.current.value === ""
    ) {
      setIsLoading(false);
      
    }
    else{

    formuens();
    
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
        Enseignant
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="outlined" label="Nom" inputRef={EnsNom}/>
            <TextField required variant="outlined" label="Prénom" inputRef={EnsPrenom}/>   
            <TextField  required variant="outlined" label="Email" name="email" type="email" inputRef={EnsMail}/>                 
            </div> 
            <div>
            <TextField required variant="outlined" label="Nom de compte" inputRef={EnsName}/>
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              label="Mot de passe"
              inputRef={EnsPassword}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />        
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


AddDir.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
};

export default withRouter(withStyles(styles)(AddDir));
