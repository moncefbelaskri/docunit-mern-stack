import React, { useState} from "react";
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
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";



const styles = (theme) => ({

  dNone: {
    display: "none",
  },
});


function AddFormulaire()  {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Box
      component="form"
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
          <ListItem divider disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required id="outlined-required" label="Nom"/>
            <TextField required id="outlined-required" label="Prénom"/>         
            <TextField required id="outlined-required" label="Grade"/>            
            </div> 
            <div>
            <TextField required id="outlined-required" label="Nom de compte"/>
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth              
              label="Mot de passe"
              autoComplete="off"
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />           
            </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

     
    </Box>
  );
}

AddFormulaire.propTypes = {
  
  
  
}
export default withStyles(styles, { withTheme: true })(AddFormulaire);
