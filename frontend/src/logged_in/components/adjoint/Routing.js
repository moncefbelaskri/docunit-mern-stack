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
    stat1,
    stat2,
    stat3,
    stat4,
    stat5,
    stat6,
    stat7,
    stat8,
    stat9,
    stat10,
    stat11,
    stat12,
    setStat1,
    setStat2,
    setStat3,
    setStat4,
    setStat5,
    setStat6,
    setStat7,
    setStat8,
    setStat9,
    setStat10,
    setStat11,
    setStat12,
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
          stat1={stat1}
          setStat1={setStat1}
          stat2={stat2}
          setStat2={setStat2}
          stat3={stat3}
          setStat3={setStat3}
          stat4={stat4}
          setStat4={setStat4}
          stat5={stat5}
          setStat5={setStat5}
          stat6={stat6}
          setStat6={setStat6}
          stat7={stat7}
          setStat7={setStat7}
          stat8={stat8}
          setStat8={setStat8}
          stat9={stat9}
          setStat9={setStat9}
          stat10={stat10}
          setStat10={setStat10}
          stat11={stat11}
          setStat11={setStat11}
          stat12={stat12}
          setStat12={setStat12}
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
