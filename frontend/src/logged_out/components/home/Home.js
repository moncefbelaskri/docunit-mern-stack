import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Headsection from "./HeadSection";
import Featuresection from "./FeatureSection";
import Faqs from "./Faqs";

function home(props) {
  const { selecthome } = props;
  useEffect(() => {
    selecthome();
  }, [selecthome]);
  return (
      <Fragment>
        <Headsection />
        <Featuresection />
        <Faqs />
      </Fragment>
  );
}

home.propTypes = {
  selecthome: PropTypes.func.isRequired,
};

export default home;
