import React, { memo, useCallback, useState, useContext , Fragment,useEffect ,lazy } from "react";
import UserContext from "../../../shared/components/UserContext";
import  { Redirect } from 'react-router-dom';
const SecuComponent = lazy(() => import("./Main"));
const ErrorComponent = lazy(() => import("../../../logged_out/components/notfound/Notfoundpage"));

const Security = () => {
    const { userData } = useContext(UserContext);
      return (
        <div>
           {userData.user ? (
            <SecuComponent />
          ) : (
            null
      )}
        </div>
    )
}

export default Security