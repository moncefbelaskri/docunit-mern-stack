import React, { memo, useCallback, useState, Fragment,useContext,useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";
import UserContext from "../../../shared/components/UserContext";

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
 
  const { classes } = props;
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [stat, setStat] = useState([]);
  const [adj, setAdj] = useState([]);
  const [docto, setDocto] = useState([]);
  const [ense, setEnse] = useState([]);

  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const { userData } = useContext(UserContext);

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
 
  const selectStat = useCallback(() => {
    smoothScrollTop();
    document.title = "Statistiques du Département";
    setSelectedTab("Stat");
  }, [setSelectedTab]);
  const selectAdj = useCallback(() => {
    smoothScrollTop();
    document.title = "Liste des Doctorants valides";
    setSelectedTab("Adj");
  }, [setSelectedTab]);
  const selectDocto = useCallback(() => {
    smoothScrollTop();
    document.title = "Liste des Doctorants";
    setSelectedTab("Docto");
  }, [setSelectedTab]);
  const selectEnse = useCallback(() => {
    smoothScrollTop();
    document.title = "Liste des Enseignants";
    setSelectedTab("Ense");
  }, [setSelectedTab]);

  useEffect(() => {

    const fetchRandomDoctovalide = async() => {
    
      await axios.get("http://localhost:5000/users/secdoc").then(function (response) {
        const doclist = response.data.doc;
        const avlist = response.data.avnc;
        const adj = [];
        for (let i = 0; i < doclist.length; i += 1) {
          const randomdoc = doclist[i];
          if(userData.user.dept === randomdoc.dept)
          {
          for (let j = 0; j < avlist.length; j += 1) {     
          const randomav = avlist[j]; 
          if(randomdoc.username === randomav.usernamedoc)
          {
            if(randomav.status === true)
            {
          const target = {
            id: i,
            _id : randomdoc._id,
            nom: randomdoc.nom,
            prénom:  randomdoc.prenom,     
            intit: randomdoc.intithe,
            anac: randomav.aneactu,
            datesou: randomav.datesout,    
          };
          adj.push(target);
        }
        }
      }
    
  }
      
      setAdj(adj);
      
    }})
    .catch(function (error) {
      console.log(error);
    });

      };
    
    const fetchRandomDocto = async() => {
    
      await axios.get("http://localhost:5000/users/secdoc").then(function (response) {
      const doclist = response.data.doc;
      const avlist = response.data.avnc;
      const docto = [];
      for (let i = 0; i < doclist.length; i += 1) {
        const randomdoc = doclist[i];
        if(userData.user.dept === randomdoc.dept)
        {
        for (let j = 0; j < avlist.length; j += 1) {     
        const randomav = avlist[j]; 
        if(randomdoc.username === randomav.usernamedoc)
        {
        const target = {
          id: i,
          _id : randomdoc._id,
          nom: randomdoc.nom,
          prénom:  randomdoc.prenom,
          ndc:  randomdoc.username,
          mdp:  randomdoc.password,
          da:   randomdoc.dateN,
          li:   randomdoc.lieuN,
          ad:   randomdoc.adresse,
          nt:   randomdoc.numtel,     
          email : randomdoc.mail,
          ep:   randomdoc.etapro,
          pr:   randomdoc.preci,
          an:   randomdoc.anebac,
          seb:   randomdoc.seribac,
          nb:   randomdoc.numbac,
          cd:   randomdoc.catdoc,
          dd:   randomdoc.derdip,
          prr:  randomdoc.precii,
          sdd:  randomdoc.spederdip,
          dad:  randomdoc.datederdip,
          dap:  randomdoc.datepremdoc,
          sd:   randomdoc.spedoc,
          lr:   randomdoc.laborata,
          inti: randomdoc.intithe,
          ds:   randomdoc.datesout,
          dn:   randomdoc.dirnom,
          dp:   randomdoc.dirprenom,
          dg:   randomdoc.dirgrade,
          cdn:  randomdoc.codirnom,
          cdp:  randomdoc.codirprenom,
          cdg:  randomdoc.dirgrade,
          ac: randomav.aneactu,
          dtss: randomav.datesout,    
        };
        docto.push(target);
      }
    }
  
}
    
    setDocto(docto);
    
  }})
  .catch(function (error) {
    console.log(error);
  });

    };
      const fetchRandomEnse = async() => {
        await axios.get("http://localhost:5000/users/secens").then(function (response) {
          const enslist = response.data;
        const ense = [];
        for (let i = 0; i < enslist.length; i += 1) {
          const randomens = enslist[i];
          if(userData.user.dept === randomens.ensdept)
        {
          const targett = {
            id: i, 
            _id : randomens._id,
            nom: randomens.ensnom,
            prénom:  randomens.ensprenom,
            grade:  randomens.ensgrade,
            email: randomens.ensmail,
            eeb: randomens.ensetabori,
            elr: randomens.enslaborata,
            en: randomens.ensnumtel,
            ndc:  randomens.ensusername,
            mdp:  randomens.enspassword,
          };
          ense.push(targett);
        }
        }
        setEnse(ense);
      })
      .catch(function (error) {
        console.log(error);
      });
      
      };
      fetchRandomDoctovalide();
      fetchRandomDocto();
      fetchRandomEnse();
  }, []);

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
          
          stat={stat}
          setStat={setStat}
          selectStat={selectStat}

          adj={adj}
          setAdj={setAdj}
          selectAdj={selectAdj}
          
          docto={docto}
          setDocto={setDocto}
          selectDocto={selectDocto}    

          ense={ense}
          setEnse={setEnse}
          selectEnse={selectEnse}    

        />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
