import React, { Fragment , useEffect , useState , useContext} from "react";
import PropTypes from "prop-types";
import { BrowserRouter} from "react-router-dom";
import NavBarerror from "./NavBarerror";
import UserContext from "./../../../shared/components/UserContext";
import Error404 from "./Error404";
const axios = require('axios');
function Notfoundpage() {

    return (  
        <Fragment>
                <NavBarerror />
                <Error404 />
        </Fragment>
    );
}
Notfoundpage.propTypes = {
  
  };

export default Notfoundpage;
