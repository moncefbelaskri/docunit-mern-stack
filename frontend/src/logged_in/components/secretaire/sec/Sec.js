import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";


function sec(props) {
  const { selectsec } = props;
  useEffect(() => {
    selectsec();
  }, [selectsec]);
  return (
      <Fragment>

      </Fragment>
  );
}

sec.propTypes = {
  selectsec: PropTypes.func.isRequired,
};

export default sec;
