import React, { Fragment, useState,useContext} from "react";
import PropTypes from "prop-types";
import { Typography, List, ListItem, ListItemText, Button, Box} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { withRouter } from "react-router-dom";
import Bordered from "../../../../shared/components/Bordered";
import TextField from '@mui/material/TextField';
import UserContext from "../../../../shared/components/UserContext";
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import ActionPaper from "../../../../shared/components/ActionPaper";

const styles = () => ({
  dNone: {
    display: "none",
  },
});

function ViewDir(props) {
  const {
    onClose,
  } = props;
  const { iddirData } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  return (

    <Fragment>
      <ActionPaper
        helpPadding
        maxWidth="md"
        onClose={onClose}
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
            <TextField required variant="outlined" label="Nom" inputProps={{ readOnly: true }} defaultValue={iddirData.iddirup.nom} />
            <TextField required variant="outlined" label="Prénom" inputProps={{ readOnly: true }} defaultValue={iddirData.iddirup.prénom} />   
            <TextField  required variant="outlined" label="Email" inputProps={{ readOnly: true }} name="email" type="email" defaultValue={iddirData.iddirup.email}/>                 
            </div> 
            <div>
            <TextField required variant="outlined" label="Nom de compte"  inputProps={{ readOnly: true }} defaultValue={iddirData.iddirup.ndc}/>
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              label="Mot de passe"
              inputProps={{ readOnly: true }}
              defaultValue={iddirData.iddirup.mdp} 
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
              <Button onClick={onClose}>
                Retour
              </Button>
            </Box>
          </Fragment>
        }
      />
    </Fragment>
  );
}


ViewDir.propTypes = {
  onClose: PropTypes.func,
};

export default withRouter(withStyles(styles)(ViewDir));
