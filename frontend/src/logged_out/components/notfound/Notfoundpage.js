import React, { Fragment} from "react";
import NavBarerror from "./NavBarerror";
import Error404 from "./Error404";
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
