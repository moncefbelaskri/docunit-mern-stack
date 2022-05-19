import React, { Fragment, useState, useRef , useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { withRouter } from "react-router-dom";
import Bordered from "../../../../shared/components/Bordered";
import TextField from '@mui/material/TextField';
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import UserContext from "../../../../shared/components/UserContext";
import ActionPaper from "../../../../shared/components/ActionPaper";
import ButtonCircularProgress from "../../../../shared/components/ButtonCircularProgress";

const axios = require('axios');

const styles = (theme) => ({
  
  dNone: {
    display: "none",
  },
});


function AddDir(props) {
  
  const {
    pushMessageToSnackbar,
    onClose,
  } = props;  
  const EnsNom = useRef();
  const EnsPrenom = useRef();
  const EnsDep = useRef();
  const EnsName = useRef();
  const EnsPassword = useRef();
 
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useContext(UserContext);
  
 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  
  const formul = useCallback( async () => {
  
  },[ setIsLoading,EnsNom,EnsPrenom,EnsDep,EnsName,EnsPassword]);

  const handleUpload = useCallback(async () => {
    setIsLoading(true);
    if(EnsNom.current.value === "" ||
    EnsPrenom.current.value === "" ||
    EnsDep.current.value === "" ||
    EnsName.current.value === "" ||
    EnsPassword.current.value === ""
    ) {
      setIsLoading(false);
      
    }
    else{
    setIsLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Enseignant ajouté avec succès",
      });
      onClose();
    }, 1500);
  }
  }, [setIsLoading, onClose, pushMessageToSnackbar]);

  return (
    <Fragment>
      <ActionPaper
        helpPadding
        maxWidth="md"
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          formul();
          handleUpload();
        }}
      noValidate
      autoComplete="off"
        content={
          <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '29.5ch' },
      }}
      noValidate
      autoComplete="off"
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
            <TextField required variant="outlined" label="Departement" inputRef={EnsDep}/>            
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
              onClick={handleUpload}
              variant="contained"
              color="secondary"
              disabled={ false || isLoading}
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
