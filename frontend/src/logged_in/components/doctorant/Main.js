import React, { memo, useCallback, useState, Fragment , useEffect , useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";
import UserContext from "../../../shared/components/UserContext";

const styles = (theme) => ({
  main: {
    marginTop: theme.spacing(11),
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
  const { userData } = useContext(UserContext);
  const { classes } = props;
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [doct, setDoct] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  const fetchRandomDoct = useCallback(() => {
    const doct = [];
   /* for (let i = 0; i < 35; i += 1) {
      const randomdoc = Doctorants[Math.floor(Math.random() * Doctorants.length)];
      const target = {
        id: i,
        nom: randomdoc.nom,
        prénom:  randomdoc.prénom,
        intit: randomdoc.intit,
        etav:randomdoc.etav,
        datesou: randomdoc.datesou,
        isActivated: Math.round(Math.random()) ? true : false,
      };
      doct.push(target);
    }
    */
    setDoct(doct);
  }, [setDoct]);

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
 
  useEffect(() => {
    fetchRandomDoct();
  }, [
    fetchRandomDoct,
    
  ]);
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
