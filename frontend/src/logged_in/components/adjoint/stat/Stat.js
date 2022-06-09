import React,{useEffect} from "react";
import PropTypes from "prop-types";
import StatContent from "./StatContent";

function Stat(props) {
  const {
    selectStat,
    pushMessageToSnackbar,
    stat,
    setStat,
  } = props;
  
  useEffect(() => {
    selectStat();
  }, [selectStat]);
  

  return <StatContent
  stat={stat}
    setStat={setStat}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Stat.propTypes = {
  stat: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStat: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default Stat;
