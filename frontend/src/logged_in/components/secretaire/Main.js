import React, { memo, useCallback, useState, useContext , Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../../shared/components/ConsecutiveSnackbarMessages";
import UserContext from "../../../shared/components/UserContext";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";
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
  const { userData } = useContext(UserContext);
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [docs, setDocs] = useState([]);
  const [dirs, setDirs] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

  const { setiddtData } = useContext(UserContext);
  const { setidcdtData } = useContext(UserContext);

  

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
    const fetchRandomDocs = async() => {
    
      await axios.get("http://localhost:5000/users/secdoc").then(function (response) {
      const doclist = response.data;
      const docs = [];
      for (let i = 0; i < doclist.length; i += 1) {
        const randomdoc = doclist[i];
        if(userData.user.dept === randomdoc.dept){
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
          cdn:  randomdoc.codirnom,
          cdp:  randomdoc.codirprenom
        };
        docs.push(target);
      } 
      }
      setDocs(docs);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    await axios.get("http://localhost:5000/users/secdir").then(function (response) {
      const dirlist = response.data;
      const di = [];
      for (let x = 0; x < dirlist.length; x += 1) {
        const randomdir = dirlist[x];
        const targett = {
          id: x,
          _idd : randomdir._id,
          dnn:   randomdir.dirnom,
          dpp:   randomdir.dirprenom,
          dg:    randomdir.dirgrade,
          de:    randomdir.diretabori,
          dl:    randomdir.dirlaborata,
          dnm:   randomdir.dirnumtel,
          dml:   randomdir.dirmail,
        };
        di.push(targett);
      }
      setiddtData({
        iddtup: di,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

    await axios.get("http://localhost:5000/users/seccodir").then(function (response) {
      const codirlist = response.data;
      const dii = [];
      for (let y = 0; y < codirlist.length; y += 1) {
        const randomcodir = codirlist[y];
        const targettt = {
          id: y,
          _iddd : randomcodir._id,
          cdnn:   randomcodir.codirnom,
          cdpp:   randomcodir.codirprenom,
          cdg:    randomcodir.codirgrade,
          cde:    randomcodir.codiretabori,
          cdl:    randomcodir.codirlaborata,
          cdnm:   randomcodir.codirnumtel,
          cdml:   randomcodir.codirmail,
        };
        dii.push(targettt);
      }
      setidcdtData({
        idcdtup: dii,
      });
    })
    .catch(function (error) {
      console.log(error);
    });


      };
      const fetchRandomDirs = async() => {
        await axios.get("http://localhost:5000/users/secens").then(function (response) {
          const enslist = response.data;
        const dirs = [];
        for (let i = 0; i < enslist.length; i += 1) {
          const randomens = enslist[i];
          if(userData.user.dept === randomens.ensdept){
          const targett = {
            id: i,
            _id : randomens._id,
            nom: randomens.ensnom,
            prénom:  randomens.ensprenom,
            ndc:  randomens.ensusername,
            mdp:  randomens.enspassword,
            email: randomens.ensmail,
          };
          dirs.push(targett);
         }
        }
        setDirs(dirs);
      })
      .catch(function (error) {
        console.log(error);
      });
      
      };
      fetchRandomDocs();
      fetchRandomDirs();
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
