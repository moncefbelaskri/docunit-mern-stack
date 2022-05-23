import React, { useState, Fragment , useCallback ,useRef , useContext } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { TextField, Button} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { useHistory } from "react-router-dom";
import UserContext from "../../../shared/components/UserContext";
import FormDialog from "../../../shared/components/FormDialog";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
const axios = require('axios');

const styles = (theme) => ({
  
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

function LoginDialog(props) {
  const {
    setStatus,
    onClose,
    status,
  } = props;
  const history = useHistory();
  const loginName = useRef();
  const loginPassword = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setUserData } = useContext(UserContext);

  const login = useCallback( async () => {
    setIsLoading(true);
    setStatus(null);
    await axios.post(
        "http://localhost:5000/users/login",
        {
          name: loginName.current.value,
          password: loginPassword.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setUserData({
          token: response.data.token,
          user: response.data.user,
        })
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem('auth-token', response.data.token);
          
          if(response.data.user.role === "sec")
          history.push("/sec");
          else if(response.data.user.role === "doc")
          history.push("/doct");
          else if(response.data.user.role === "ens")
          history.push("/dirt");
        }, 1000);
        
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          if(error.response.data.errorMessage === "Username is incorrect!" ) 
          setStatus("invalidname");
          else if(error.response.data.errorMessage === "password is incorrect!") 
          setStatus("invalidpassword");
        }, 1000);
      });
  },[ setIsLoading, loginName, loginPassword, history , setStatus]);
  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        hideBackdrop
        headline="connexion"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"     
              error={status === "invalidname"}       
              fullWidth
              required
              label="nom d'utilisateur"             
              autoFocus
              autoComplete="off"
              type="text"   
              inputRef={loginName} 
              onChange={() => {
                if (status === "invalidname") {
                  setStatus(null);
                }
              }}   
              helperText={
                status === "invalidname" &&
                "Ce nom d'utilisateur n'est pas lié à un compte."
              }
              FormHelperTextProps={{ error: true }} 
            />

            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth  
              error={status === "invalidpassword"}            
              label="Mot de passe"
              autoComplete="off"
              inputRef={loginPassword}
              onChange={() => {
                if (status === "invalidpassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidpassword" &&
                "Mot de passe incorrect. Réessayez !"
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              disabled={isLoading} 
            >
              Connexion
              {isLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
