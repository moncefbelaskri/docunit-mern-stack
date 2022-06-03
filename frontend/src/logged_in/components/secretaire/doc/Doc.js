import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import DocContent from "./DocContent";
import AddDoc from "./AddDoc";
import ModifDoc from "./ModifDoc";
import ViewDoc from "./ViewDoc";

function Doc(props) {
  const {
    selectDocs,
    pushMessageToSnackbar,
    docs,
    setDocs,
  } = props;
  const [isAddDocPaperOpen, setIsAddDocPaperOpen] = useState(false);
  const [isModifDocPaperOpen, setIsModifDocPaperOpen] = useState(false);
  const [isViewDocPaperOpen, setIsViewDocPaperOpen] = useState(false);

  const openAddDocModal = useCallback(() => {
    setIsAddDocPaperOpen(true);
  }, [setIsAddDocPaperOpen]);

  const closeAddDocModal = useCallback(() => {
    setIsAddDocPaperOpen(false);
  }, [setIsAddDocPaperOpen]);

  const openModifDocModal = useCallback(() => {
    setIsModifDocPaperOpen(true);
  }, [setIsModifDocPaperOpen]);

  const closeModifDocModal = useCallback(() => {
    setIsModifDocPaperOpen(false);
  }, [setIsModifDocPaperOpen]);

  const openViewDocModal = useCallback(() => {
    setIsViewDocPaperOpen(true);
  }, [setIsViewDocPaperOpen]);

  const closeViewDocModal = useCallback(() => {
    setIsViewDocPaperOpen(false);
  }, [setIsViewDocPaperOpen]);

  useEffect(() => {
    selectDocs();
  }, [selectDocs]);

  if (isAddDocPaperOpen) {
    return <AddDoc
      onClose={closeAddDocModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  if (isModifDocPaperOpen) {
    return <ModifDoc
      onClose={closeModifDocModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  if (isViewDocPaperOpen) {
    return <ViewDoc
      onClose={closeViewDocModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  return <DocContent
    openAddDocModal={openAddDocModal}
    openModifDocModal={openModifDocModal}
    openViewDocModal={openViewDocModal}
    docs={docs}
    setDocs={setDocs}
    pushMessageToSnackbar={pushMessageToSnackbar} 
  />
}

Doc.propTypes = {
  docs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDocs: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectDocs: PropTypes.func.isRequired,
};

export default Doc;