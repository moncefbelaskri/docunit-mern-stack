import React,{useEffect} from "react";
import PropTypes from "prop-types";
import AdjContent from "./AdjContent";

function Adj(props) {
  const {
    selectAdj,
    pushMessageToSnackbar,
    adj,
    setAdj,
  } = props;
  
  useEffect(() => {
    selectAdj();
  }, [selectAdj]);
  

  return <AdjContent
    adj={adj}
    setAdj={setAdj}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Adj.propTypes = {
  adj: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAdj: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default Adj;
