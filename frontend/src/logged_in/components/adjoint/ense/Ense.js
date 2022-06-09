import React, { useEffect } from "react";
import PropTypes from "prop-types";
import EnseContent from "./EnseContent";


function Ens(props) {
  const {
    selectEnse,
    pushMessageToSnackbar,
    ense,
    setEnse,
  } = props;

  

  useEffect(() => {
    selectEnse();
  }, [selectEnse]);
  


  return <EnseContent
  ense={ense}
  setEnse={setEnse}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Ens.propTypes = {
  ense: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEnse: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectEnse: PropTypes.func.isRequired,

};

export default Ens;
