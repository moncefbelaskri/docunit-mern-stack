import React,{useEffect} from "react";
import PropTypes from "prop-types";
import DirtContent from "./DirtContent";

function Dirt(props) {
  const {
    selectDirt,
    pushMessageToSnackbar,
    dirt,
    setDirt,
  } = props;
  
  useEffect(() => {
    selectDirt();
  }, [selectDirt]);
  

  return <DirtContent
    dirt={dirt}
    setDirt={setDirt}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Dirt.propTypes = {
  dirt: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDirt: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default Dirt;
