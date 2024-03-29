import React, {useContext ,lazy } from "react";
import UserContext from "../../../shared/components/UserContext";
const SecusecComponent = lazy(() => import("./Main"));

const Security = () => {
    const { userData } = useContext(UserContext);
      return (
        <div>
           {userData.user ? (
            <SecusecComponent />
          ) : (
            null
      )}
        </div>
    )
}

export default Security