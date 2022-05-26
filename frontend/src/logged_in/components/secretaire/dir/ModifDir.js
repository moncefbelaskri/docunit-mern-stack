import React, { Fragment, useState, useRef , useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, List, ListItem, ListItemText, Button, Box} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { withRouter } from "react-router-dom";
import Bordered from "../../../../shared/components/Bordered";
import TextField from '@mui/material/TextField';
import UserContext from "../../../../shared/components/UserContext";
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import ActionPaper from "../../../../shared/components/ActionPaper";
import ButtonCircularProgress from "../../../../shared/components/ButtonCircularProgress";
const axios = require('axios');

const styles = () => ({
  dNone: {
    display: "none",
  },
});

function ModifDir(props) {
  const {
    pushMessageToSnackbar,
    onClose,
  } = props;
  const { iddirData } = useContext(UserContext);
  const { userData } = useContext(UserContext);
  const EnsNom = useRef();
  const EnsPrenom = useRef();
  const EnsMail = useRef();
  const EnsName = useRef();
  const EnsPassword = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  var existed = null;
  const formuens = useCallback( async () => {
    
        setIsLoading(true);
        await axios.put("http://localhost:5000/users/update/ens/" + iddirData.iddirup._id,
      {
       ensnom: EnsNom.current.value,
       ensprenom: EnsPrenom.current.value,
       ensmail: EnsMail.current.value,
       ensusername: EnsName.current.value,
       enspassword: EnsPassword.current.value,
       ensdept : userData.user.dept,
     }
      ,{headers: {"Content-Type": "application/json",}})          
     .then(() => {
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
      text: "modifié avec succès",
  });
  window.location.reload(false);
  }, 10);

}          
      },[ setIsLoading,pushMessageToSnackbar,onClose,EnsNom,EnsPrenom,EnsMail,EnsName,EnsPassword]);
   
    
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
            <TextField required variant="outlined" label="Nom" defaultValue={iddirData.iddirup.nom} inputRef={EnsNom}/>
            <TextField required variant="outlined" label="Prénom" defaultValue={iddirData.iddirup.prénom} inputRef={EnsPrenom}/>   
            <TextField  required variant="outlined" label="Email" name="email" type="email" defaultValue={iddirData.iddirup.email}  inputRef={EnsMail}/>                 
            </div> 
            <div>
            <TextField required variant="outlined" label="Nom de compte"  defaultValue={iddirData.iddirup.ndc}  inputRef={EnsName}/>
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              label="Mot de passe"
              defaultValue={iddirData.iddirup.mdp} 
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
              mettre à jour {isLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}


ModifDir.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
};

export default withRouter(withStyles(styles)(ModifDir));
