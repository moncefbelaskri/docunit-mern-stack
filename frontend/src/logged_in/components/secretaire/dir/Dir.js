import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import DirContent from "./DirContent";
import AddDir from "./AddDir";
import ModifDir from "./ModifDir";


function Dir(props) {
  const {
    selectDirs,
    pushMessageToSnackbar,
    dirs,
    setDirs,
  } = props;
  const [isAddDirPaperOpen, setIsAddDirPaperOpen] = useState(false);
  const [isModifDirPaperOpen, setIsModifDirPaperOpen] = useState(false);

  const openAddDirModal = useCallback(() => {
    setIsAddDirPaperOpen(true);
  }, [setIsAddDirPaperOpen]);

  const closeAddDirModal = useCallback(() => {
    setIsAddDirPaperOpen(false);
  }, [setIsAddDirPaperOpen]);

  const openModifDirModal = useCallback(() => {
    setIsModifDirPaperOpen(true);
  }, [setIsModifDirPaperOpen]);

  const closeModifDirModal = useCallback(() => {
    setIsModifDirPaperOpen(false);
  }, [setIsModifDirPaperOpen]);

  useEffect(() => {
    selectDirs();
  }, [selectDirs]);

  if (isAddDirPaperOpen) {
    return <AddDir
      onClose={closeAddDirModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  if (isModifDirPaperOpen) {
    return <ModifDir
      onClose={closeModifDirModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  return <DirContent
    openAddDirModal={openAddDirModal}
    openModifDirModal={openModifDirModal}
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
