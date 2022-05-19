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
  const [adj, setAdj] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  const fetchRandomAdj = useCallback(() => {
    const adj = [];
    for (let i = 0; i < 35; i += 1) {
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
      adj.push(target);
    }
    setAdj(adj);
  }, [setAdj]);

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
    fetchRandomAdj();
  }, [
    fetchRandomAdj,
    
  ]);
  const selectAdj = useCallback(() => {
    smoothScrollTop();
    document.title = "Adjoint de Post Graduation";
    setSelectedTab("Adj");
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
          
          adj={adj}
          setAdj={setAdj}
          selectAdj={selectAdj}          

        />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
