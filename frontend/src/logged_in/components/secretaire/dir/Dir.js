import React, { useState, useCallback,useContext, useEffect } from "react";
import PropTypes from "prop-types";
import DirContent from "./DirContent";
import { useHistory } from "react-router-dom";
import AddDir from "./AddDir";
import UserContext from "../../../../shared/components/UserContext";
const axios = require('axios');


function Dir(props) {
  const {
    selectDirs,
    pushMessageToSnackbar,
    dirs,
    setDirs,
  } = props;
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const [isAddDirPaperOpen, setIsAddDirPaperOpen] = useState(false);

  const openAddDirModal = useCallback(() => {
    setIsAddDirPaperOpen(true);
  }, [setIsAddDirPaperOpen]);

  const closeAddDirModal = useCallback(() => {
    setIsAddDirPaperOpen(false);
  }, [setIsAddDirPaperOpen]);

  useEffect(() => {

    selectDirs();
    const fetchRandomDirs = async() => {
      await axios.get("http://localhost:5000/users/secens").then(function (response) {
        const enslist = response.data;
      const dirs = [];
      for (let i = 0; i < enslist.length; i += 1) {
        const randomens = enslist[i];
        if(userData.user.dept === randomens.ensdept){
        const targett = {
          id: i,
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
    fetchRandomDirs();
  }, [selectDirs]);

  if (isAddDirPaperOpen) {
    return <AddDir
      onClose={closeAddDirModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  return <DirContent
    openAddDirModal={openAddDirModal}
    dirs={dirs}
    setDirs={setDirs}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Dir.propTypes = {
  dirs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDirs: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectDirs: PropTypes.func.isRequired,
};

export default Dir;
