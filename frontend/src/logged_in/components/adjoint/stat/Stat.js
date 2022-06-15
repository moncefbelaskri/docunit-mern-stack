import React,{useEffect} from "react";
import PropTypes from "prop-types";
import StatContent from "./StatContent";

function Stat(props) {
  const {
    selectStat,
    pushMessageToSnackbar,
    stat1,
    stat2,
    stat3,
    stat4,
    stat5,
    stat6,
    stat7,
    stat8,
    stat9,
    stat10,
    stat11,
    stat12,
    setStat1,
    setStat2,
    setStat3,
    setStat4,
    setStat5,
    setStat6,
    setStat7,
    setStat8,
    setStat9,
    setStat10,
    setStat11,
    setStat12
  } = props;
  
  useEffect(() => {
    selectStat();
  }, [selectStat]);
  

  return <StatContent
          stat1={stat1}
          setStat1={setStat1}
          stat2={stat2}
          setStat2={setStat2}
          stat3={stat3}
          setStat3={setStat3}
          stat4={stat4}
          setStat4={setStat4}
          stat5={stat5}
          setStat5={setStat5}
          stat6={stat6}
          setStat6={setStat6}
          stat7={stat7}
          setStat7={setStat7}
          stat8={stat8}
          setStat8={setStat8}
          stat9={stat9}
          setStat9={setStat9}
          stat10={stat10}
          setStat10={setStat10}
          stat11={stat11}
          setStat11={setStat11}
          stat12={stat12}
          setStat12={setStat12}
    pushMessageToSnackbar={pushMessageToSnackbar}
  />
}

Stat.propTypes = {

  pushMessageToSnackbar: PropTypes.func,
};

export default Stat;
