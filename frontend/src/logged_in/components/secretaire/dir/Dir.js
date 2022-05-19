import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import DirContent from "./DirContent";
import AddDir from "./AddDir";

function Dir(props) {
  const {
    selectDirs,
    pushMessageToSnackbar,
    dirs,
    setDirs,
  } = props;
  const [isAddDirPaperOpen, setIsAddDirPaperOpen] = useState(false);

  const openAddDirModal = useCallback(() => {
    setIsAddDirPaperOpen(true);
  }, [setIsAddDirPaperOpen]);

  const closeAddDirModal = useCallback(() => {
    setIsAddDirPaperOpen(false);
  }, [setIsAddDirPaperOpen]);

  useEffect(() => {
    selectDirs();
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
