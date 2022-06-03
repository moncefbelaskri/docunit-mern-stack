import React, { memo, useCallback, useState, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";

const styles = (theme) => ({
  main: {
    marginTop: theme.spacing(14),
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
});


function Main(props) {
  const { classes } = props;
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [doct, setDoct] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );
  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);
 
  const selectDoct = useCallback(() => {
    smoothScrollTop();
    document.title = "Doctorant";
    setSelectedTab("Doct");
  }, [setSelectedTab]);
  return (
    <Fragment>
      
      <NavBar
        selectedTab={selectedTab}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
      />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)} >
        <Routing    
          pushMessageToSnackbar={pushMessageToSnackbar}
          
          doct={doct}
          setDoct={setDoct}
          selectDoct={selectDoct}          

        />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));