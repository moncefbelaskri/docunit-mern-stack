import React,{useEffect} from "react";
import PropTypes from "prop-types";
import DoctContent from "./DoctContent";

function Doct(props) {
  const {
    selectDoct,
    pushMessageToSnackbar,
  } = props;
  
  useEffect(() => {
    selectDoct();
  }, [selectDoct]);
  

  return <DoctContent
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Doct.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
};

export default Doct;
