import React,{useEffect} from "react";
import PropTypes from "prop-types";
import DoctContent from "./DoctContent";

function Doct(props) {
  const {
    doct,
    setDoct,
    selectDoct,
    pushMessageToSnackbar,
  } = props;
  
  useEffect(() => {
    selectDoct();
  }, [selectDoct]);
  

  return <DoctContent
    doct={doct}
    setDoct={setDoct}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Doct.propTypes = {
  doct: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDoct: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default Doct;
