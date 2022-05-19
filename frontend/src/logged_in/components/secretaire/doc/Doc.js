import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import DocContent from "./DocContent";
import AddDoc from "./AddDoc";
function Doc(props) {
  const {
    selectDocs,
    pushMessageToSnackbar,
    docs,
    setDocs,
  } = props;
  const [isAddDocPaperOpen, setIsAddDocPaperOpen] = useState(false);

  const openAddDocModal = useCallback(() => {
    setIsAddDocPaperOpen(true);
  }, [setIsAddDocPaperOpen]);

  const closeAddDocModal = useCallback(() => {
    setIsAddDocPaperOpen(false);
  }, [setIsAddDocPaperOpen]);

  useEffect(() => {
    selectDocs();
  }, [selectDocs]);

  if (isAddDocPaperOpen) {
    return <AddDoc
      onClose={closeAddDocModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  return <DocContent
    openAddDocModal={openAddDocModal}
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
