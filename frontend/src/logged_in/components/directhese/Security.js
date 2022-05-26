import React, {useContext ,lazy } from "react";
import UserContext from "../../../shared/components/UserContext";
const SecudirComponent = lazy(() => import("./Main"));

const Security = () => {
    const { userData } = useContext(UserContext);
      return (
        <div>
           {userData.user ? (
            <SecudirComponent />
          ) : (
            null
      )}
        </div>
    )
}

export default Security