import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import withStyles from '@mui/styles/withStyles';
import Stat from "./stat/Stat";
import Adj from "./adj/Adj";
import Docto from "./docto/Docto";
import Ense from "./ense/Ense";
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
    stat,
    setStat,
    selectStat,
    adj,   
    setAdj,   
    selectAdj,
    docto,
    setDocto,
    selectDocto,
    ense,
    setEnse,
    selectEnse
  } = props;
  useLocationBlocker();
  return (
    <div className={classes.wrapper}>
      <Switch>
      <PropsRoute
          path="/adj/doc"
          component={Docto}          
          pushMessageToSnackbar={pushMessageToSnackbar}
          docto={docto}
          setDocto={setDocto}
          selectDocto={selectDocto}
        />  
        <PropsRoute
          path="/adj/ens"
          component={Ense}          
          pushMessageToSnackbar={pushMessageToSnackbar}
          ense={ense}
          setEnse={setEnse}
          selectEnse={selectEnse}
        />  
        <PropsRoute
          path="/adj/stat"
          component={Stat}          
          pushMessageToSnackbar={pushMessageToSnackbar}
          stat={stat}
          setStat={setStat}
          selectStat={selectStat}
        />             
        <PropsRoute
          path=""
          component={Adj}          
          pushMessageToSnackbar={pushMessageToSnackbar}         
          adj={adj}
          setAdj={setAdj}
          selectAdj={selectAdj}
        />            
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired, 
  pushMessageToSnackbar: PropTypes.func,  
  setStat: PropTypes.func.isRequired,
  stat: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectStat: PropTypes.func.isRequired,
  setAdj: PropTypes.func.isRequired,
  adj: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectAdj: PropTypes.func.isRequired,
  setDocto: PropTypes.func.isRequired,
  docto: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectDocto: PropTypes.func.isRequired,
  setEnse: PropTypes.func.isRequired,
  ense: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectEnse: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
