import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import withStyles from '@mui/styles/withStyles';
import Dirt from "./dirt/Dirt";
import PropsRoute from "../../../shared/components/PropsRoute";
import useLocationBlocker from "../../../shared/functions/useLocationBlocker";
const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "82.5%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

function Routing(props) {
 
  const {
    classes,   
    pushMessageToSnackbar,
    dirt,   
    setDirt,   
    selectDirt,
  } = props;
  useLocationBlocker();
  return (
    <div className={classes.wrapper}>
      <Switch>
        <PropsRoute
          path=""
          component={Dirt}          
          pushMessageToSnackbar={pushMessageToSnackbar}
          dirt={dirt}
          setDirt={setDirt}
          selectDirt={selectDirt}
        />       
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired, 
  pushMessageToSnackbar: PropTypes.func,  
  setDirt: PropTypes.func.isRequired,
  dirt: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectDirt: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
