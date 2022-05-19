import React, { memo, useCallback, useState, useContext , Fragment,useEffect } from "react";
import  { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../../shared/components/ConsecutiveSnackbarMessages";
import UserContext from "../../../shared/components/UserContext";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";
import Doctorants from "../data/Doctorants";
import Enseignants from "../data/Enseignants";
const axios = require('axios');

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

  const [userDoc, setUserDoc] = useState({});

  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [docs, setDocs] = useState([]);
  const [dirs, setDirs] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
  
  const fetchRandomDocs = useCallback(() => {
    const getdoc = axios.get("http://localhost:5000/users/forsec");
        setDocs(getdoc);
    const docs = [];
    for (let i = 0; i < getdoc; i += 1) {
      const randomdoc = Doctorants[Math.floor(Math.random() * Doctorants.length)];
      const target = {
        id: i,
        nom: randomdoc.nom,
        prénom:  randomdoc.prénom,
        ndc:  randomdoc.ndc,
        mdp:  randomdoc.mdp,
        isActivated: Math.round(Math.random()) ? true : false,
      };
      docs.push(target);
    }
    setDocs(docs);
  }, [setDocs]);
  const fetchRandomDirs = useCallback(() => {
    const dirs = [];
    for (let i = 0; i < 35; i += 1) {
      const randomdocc = Enseignants[Math.floor(Math.random() * Enseignants.length)];
      const targett = {
        id: i,
        nom: randomdocc.nom,
        prénom:  randomdocc.prénom,
        ndc:  randomdocc.ndc,
        mdp:  randomdocc.mdp,
        isActivated: Math.round(Math.random()) ? true : false,
      };
      dirs.push(targett);
    }
    setDirs(dirs);
  }, [setDirs]);

  const selectDocs = useCallback(() => {
    smoothScrollTop();
    document.title = "Doctorant";
    setSelectedTab("Doc");
  }, [setSelectedTab]);
  const selectDirs = useCallback(() => {
    smoothScrollTop();
    document.title = "Enseignant";
    setSelectedTab("Dir");
  }, [setSelectedTab]);
  

  
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
    fetchRandomDocs();
    fetchRandomDirs();
  }, [
    fetchRandomDocs,
    fetchRandomDirs,
  ]);

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
          docs={docs}          
          selectDocs={selectDocs}         
          setDocs={setDocs}
          dirs={dirs}          
          selectDirs={selectDirs}       
          setDirs={setDirs}
        />
      </main>
    </Fragment>
  );
}



Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
