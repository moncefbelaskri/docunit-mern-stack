import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import home from "./home/Home";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";
function Routing(props) {
  const {selecthome} = props;
  useLocationBlocker();
  return (
    <Switch>
       <PropsRoute path="/" component={home} selecthome={selecthome} />
    </Switch> 
  );
}

Routing.propTypes = {
  selecthome: PropTypes.func.isRequired,
};

export default memo(Routing);
