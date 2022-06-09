import React, {useEffect } from "react";
import PropTypes from "prop-types";
import DocContent from "./DocContent";


function Doc(props) {
  const {
    selectDocs,
    pushMessageToSnackbar,
    docs,
    setDocs,
  } = props;

 

  useEffect(() => {
    selectDocs();
  }, [selectDocs]);

  
  return <DocContent

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