import React, { useEffect } from "react";
import PropTypes from "prop-types";
import DoctoContent from "./DoctoContent";

function Docto(props) {
  const {
    selectDocto,
    pushMessageToSnackbar,
    docto,
    setDocto,
  } = props;
  
  useEffect(() => {
    selectDocto();
  }, [selectDocto]);

 

  return <DoctoContent
    docto={docto}
    setDocto={setDocto}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Docto.propTypes = {
    docto: PropTypes.arrayOf(PropTypes.object).isRequired,
    setDocto: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectDocto: PropTypes.func.isRequired,

};

export default Docto;
