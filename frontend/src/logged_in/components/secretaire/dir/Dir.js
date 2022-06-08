import React, { useEffect } from "react";
import PropTypes from "prop-types";
import DirContent from "./DirContent";



function Dir(props) {
  const {
    selectDirs,
    pushMessageToSnackbar,
    dirs,
    setDirs,
  } = props;


  

 

  useEffect(() => {
    selectDirs();
  }, [selectDirs]);

  

  return <DirContent
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