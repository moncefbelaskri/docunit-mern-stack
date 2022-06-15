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
  const [adj, setAdj] = useState([]);
  const [docto, setDocto] = useState([]);
  const [ense, setEnse] = useState([]);
  const [stat1, setStat1] = useState([]);
  const [stat2, setStat2] = useState([]);
  const [stat3, setStat3] = useState([]);
  const [stat4, setStat4] = useState([]);
  const [stat5, setStat5] = useState([]);
  const [stat6, setStat6] = useState([]);
  const [stat7, setStat7] = useState([]);
  const [stat8, setStat8] = useState([]);
  const [stat9, setStat9] = useState([]);
  const [stat10, setStat10] = useState([]);
  const [stat11, setStat11] = useState([]);
  const [stat12, setStat12] = useState([]);

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
        const enslist = response.data.ens;
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
              for (let z = 0; z < enslist.length; z += 1) {
                const randomDens = enslist[z]; 
                if ((randomdoc.dirnom === enslist[z].ensnom) && (randomdoc.dirprenom === enslist[z].ensprenom))
                {  
              for (let k = 0; k < enslist.length; k += 1) {
                const randomCens = enslist[k]; 
                if ((randomdoc.codirnom === enslist[k].ensnom) && (randomdoc.codirprenom === enslist[k].ensprenom))
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
          intit: randomdoc.intithe,
          ds:   randomdoc.datesout,
          dn:   randomdoc.dirnom,
          dp:   randomdoc.dirprenom,
          dg:   randomdoc.dirgrade,
          cdn:  randomdoc.codirnom,
          cdp:  randomdoc.codirprenom,
          cdg:  randomdoc.dirgrade,    
          anac: randomav.aneactu,
          datesou: randomav.datesout,
          etv: randomav.etav,
          pctv: randomav.pctav,
          dep:userData.user.dept,
          dmail:randomDens.ensmail,
          dnum:randomDens.ensnumtel,
          dlt:randomDens.enslaborata,
          detab:randomDens.ensetabori,
          cdmail:randomCens.ensmail,
          cdnum:randomCens.ensnumtel,
          cdlt:randomCens.enslaborata,
          cdetab:randomCens.ensetabori,
          };
          adj.push(target);
        }
      } 
    } }
        }
        }
      }
    
  }
      
}
setAdj(adj);
})
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
} 
    setDocto(docto);
    
  })
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
      const fetchstat = async() => {
        await axios.get("http://localhost:5000/users/secdoc").then(function (response) {
        const statt1 = response.data.doc;
        const statt2 = response.data.avnc;
        const stat1 = [];
        const stat2 = [];
        const stat3 = [];
        const stat4 = [];
        const stat5 = [];
        const stat6 = [];
        const stat7 = [];
        const stat8 = [];
        const stat9 = [];
        const stat10 = [];
        const stat11 = [];
        const stat12 = [];
        for (let i = 0; i < statt1.length; i += 1) {
          const random2 = statt2[i];
          const random1 = statt1[i];
          if(userData.user.dept === random1.dept)
            {
          if(random1.catdoc === "lmd")
          {
            const target = {
              id: i,     
            };
            stat11.push(target);
    
            if(random2.aneactu<=1)
          {const target = {
            id: i,     
          };
          stat1.push(target);
        }
        else if(random2.aneactu<=2)
          {const target = {
            id: i,     
          };
          stat2.push(target);
        }
        else if(random2.aneactu<=3)
          {const target = {
            id: i,     
          };
          stat3.push(target);
        }
        else if(random2.aneactu<=4)
          {const target = {
            id: i,     
          };
          stat4.push(target);
        }
        else
          {const target = {
            id: i,     
          };
          stat5.push(target);
        }
      }
      if(random1.catdoc === "sci")
          {
            const target = {
            id: i,     
          };
          stat12.push(target);
        
            if(random2.aneactu<=1)
          {const target = {
            id: i,     
          };
          stat6.push(target);
        }
        else if(random2.aneactu<=2)
          {const target = {
            id: i,     
          };
          stat7.push(target);
        }
        else if(random2.aneactu<=3)
          {const target = {
            id: i,     
          };
          stat8.push(target);
        }
        else if(random2.aneactu<=4)
          {const target = {
            id: i,     
          };
          stat9.push(target);
        }
        else
          {const target = {
            id: i,     
          };
          stat10.push(target);
        }
      }
      }
    }
        setStat1(stat1.length);
        setStat2(stat2.length);
        setStat3(stat3.length);
        setStat4(stat4.length);
        setStat5(stat5.length);
        setStat6(stat6.length);
        setStat7(stat7.length);
        setStat8(stat8.length);
        setStat9(stat9.length);
        setStat10(stat10.length);
        setStat11(stat11.length);
        setStat12(stat12.length);
    
      })
      .catch(function (error) {
        console.log(error);
      });
        };
      fetchRandomDoctovalide();
      fetchRandomDocto();
      fetchRandomEnse();
      fetchstat();
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
