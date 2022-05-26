import React, {useContext ,lazy } from "react";
import UserContext from "../../../shared/components/UserContext";
const SecudocComponent = lazy(() => import("./Main"));

const Security = () => {
    const { userData } = useContext(UserContext);
      return (
        <div>
           {userData.user ? (
            <SecudocComponent />
          ) : (
            null
      )}
        </div>
    )
}

export default Security