import React, { memo, useCallback, useState, Fragment,useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../../shared/components/ConsecutiveSnackbarMessages";
import Doctorants from "../data/Doctorants";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";


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
 
  const { classes } = props;
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [dirt, setDirt] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  const fetchRandomDirt = useCallback(() => {
    const dirt = [];
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
      dirt.push(target);
    }
    */
    setDirt(dirt);
  }, [setDirt]);

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
    fetchRandomDirt();
  }, [
    fetchRandomDirt,
    
  ]);
  const selectDirt = useCallback(() => {
    smoothScrollTop();
    document.title = "Directeur de These";
    setSelectedTab("Dirt");
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
          
          dirt={dirt}
          setDirt={setDirt}
          selectDirt={selectDirt}          

        />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
