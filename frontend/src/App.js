import React, { Fragment, Suspense, lazy , useState, useEffect } from "react";
import { ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import UserContext from "./shared/components/UserContext";
const axios = require('axios');
const AdjComponent = lazy(() => import("./logged_in/components/adjoint/Main"));
const DirtComponent = lazy(() => import("./logged_in/components/directhese/Main"));
const DoctComponent = lazy(() => import("./logged_in/components/doctorant/Main"));
const Notfoundpage = lazy(() => import("./logged_out/components/notfound/Notfoundpage"));
const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));
const SecComponent = lazy(() => import("./logged_in/components/secretaire/Security"));


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.primary.dark} />
          <Suspense fallback={<Fragment />}>
            <Switch>
            <Route exact path="/" >
              <LoggedOutComponent />
            </Route>
            
            <Route path="/sec" >
              <SecComponent />
            </Route>
            
         <Route path="/adj" >
              <AdjComponent />
              </Route>

               <Route path="/dirt" >
                <DirtComponent />
                </Route> 

               <Route path="/doct" >
               <DoctComponent />
               </Route>


            <Route>
              <Notfoundpage />
            </Route>

            </Switch>
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
