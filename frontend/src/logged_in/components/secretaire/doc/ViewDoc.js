import React, { Fragment, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Typography, List, ListItem, ListItemText, Button, Box} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { withRouter } from "react-router-dom";
import Bordered from "../../../../shared/components/Bordered";
import TextField from '@mui/material/TextField';
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import ActionPaper from "../../../../shared/components/ActionPaper";
import UserContext from "../../../../shared/components/UserContext";


const styles = () => ({
  dNone: {
    display: "none",
  },
});


function ViewDoc(props) {
  
  const {
    onClose,
  } = props;
  const { iddocData } = useContext(UserContext);

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
        Informations Personnelle
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="standard" label="Nom" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.nom}/>            
            <TextField required variant="standard" label="Prénom" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.prénom}/>
            </div>
            <div>
            <TextField required variant="standard" label="Né(e) le" type="date" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.da}/>
            <TextField required variant="standard" label="à" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.li}/>
            <TextField required variant="standard" label="Adresse" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.ad} />
            </div>  
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>
      <br/>
      <Typography paragraph variant="h5">
        Contact
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>   
           <div>
           <TextField required variant="standard" label="N° de téléphone " name="phone"  defaultValue={iddocData.iddocup.nt} inputProps={{ readOnly: true }}/>
           <TextField required variant="standard" label="Email" name="email" type="email" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.email}/>            
           </div> 
           </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>

      <Typography paragraph variant="h5">
        Informations Professionnelle
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField  required variant="standard"  label="Etat professionnel"  inputProps={{ readOnly: true }}  defaultValue={iddocData.iddocup.ep}/>
        {iddocData.iddocup.ep==="sal"? <TextField  variant="standard" label="(Préciser)" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.pr}/>:null}
            </div>
            <div>
            <TextField required variant="standard" type="number" name="number"  label="Année d’obtention du BAC" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.an}/>
            <TextField required variant="standard"  label="Série du BAC " inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.seb}/>
            <TextField required variant="standard" type="number" name="number" label="N° du BAC " inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.nb}/>
            </div> 
            <div>      
        <TextField required variant="standard"    label="Fiche de reinscription en" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.cd}/>           
            <TextField required variant="standard"    label="Dernier diplome obtenu" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.dd}/>  
            {iddocData.iddocup.dd==="au"? <TextField  variant="standard" label="(Préciser)" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.prr}/>:null}
            </div>
            <div>
            <TextField required variant="standard" label="Spécialité dernier diplôme obtenu" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.sdd}/>
            <TextField required variant="standard" label="Date de son obtention"  type="date" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.dad}/>
            </div>  
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>

      <Typography paragraph variant="h5">
        Informations Doctorat
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>             
            <div>
            <TextField required variant="standard"    label="Fiche de reinscription en" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.cd}/>           
            <TextField required variant="standard" label="Date 1ère Inscription Doctorat"  type="date" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.dap}/>
            <TextField required variant="standard" label="Spécialité du Doctorat" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.sd}/>
            </div>
            <div>
            <TextField required variant="standard" label="Laboratoire de rattachement" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.lr}/>          
            <TextField required variant="standard" label="Intitulé de la thèse" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.inti}/>
            </div> 
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>
      <Typography paragraph variant="h5">
        Identifiants
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>              
            <div>
            <TextField required variant="standard" label="Nom de compte" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.ndc}/>
            <VisibilityPasswordTextField
              variant="standard"
              margin="normal"
              required
              fullWidth              
              label="Mot de passe"
              autoComplete="off"
              inputProps={{ readOnly: true }}
              defaultValue={iddocData.iddocup.mdp}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
              />            
              </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>

      <Typography paragraph variant="h5">
      Informations Directeur de thèse
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="standard" label="Nom" inputProps={{ readOnly: true }} defaultValue={ iddocData.iddocup.dn}/>
            <TextField required variant="standard" label="Prénom" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.dp}/>
            <TextField required variant="standard" label="Grade" inputProps={{ readOnly: true }} defaultValue={iddocData.iddocup.dg}/>
            </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

<br/>

      <Typography paragraph variant="h5">
      Informations Co-Directeur de thèse
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="standard" label="Nom"  inputProps={{ readOnly: true }} defaultValue={ iddocData.iddocup.cdn}/>
            <TextField required variant="standard" label="Prénom"  inputProps={{ readOnly: true }} defaultValue={ iddocData.iddocup.cdp}/>
            <TextField required variant="standard" label="Grade" inputProps={{ readOnly: true }} defaultValue={ iddocData.iddocup.cdg}/>
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


ViewDoc.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
};

export default withRouter(withStyles(styles)(ViewDoc));