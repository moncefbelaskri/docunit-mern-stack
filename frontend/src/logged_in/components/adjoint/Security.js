import React, {useContext ,lazy } from "react";
import UserContext from "../../../shared/components/UserContext";
const SecuadjComponent = lazy(() => import("./Main"));

const Security = () => {
    const { userData } = useContext(UserContext);
      return (
        <div>
           {userData.user ? (
            <SecuadjComponent />
          ) : (
            null
      )}
        </div>
    )
}

export default Security