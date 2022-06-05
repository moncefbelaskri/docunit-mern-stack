import React, { Fragment, Suspense, lazy , useState, useEffect } from "react";
import { ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import UserContext from "./shared/components/UserContext";
const axios = require('axios');
const Notfoundpage = lazy(() => import("./logged_out/components/notfound/Notfoundpage"));
const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));
const SecusecComponent = lazy(() => import("./logged_in/components/secretaire/Security"));
const SecudocComponent = lazy(() => import("./logged_in/components/doctorant/Security"));
const SecudirComponent = lazy(() => import("./logged_in/components/directhese/Security"));
const SecuadjComponent = lazy(() => import("./logged_in/components/adjoint/Security"));


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [iddirData, setiddirData] = useState({
    iddirup: undefined,
  });
  const [iddocData, setiddocData] = useState({
    iddocup: undefined,
  });
 

  useEffect(() => {

    const checkLoggedIn = async () => {

       let role =  localStorage.getItem("auth-role");

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

      if (tokenRes.data) {

        if(role === "sec") {

        const userRes = await axios.get("http://localhost:5000/users/", {

          headers: { "x-auth-token": token },

        });

        setUserData({

          token,

          user : userRes.data,

        });

      }

      else if(role === "adj") {

        const userRes = await axios.get("http://localhost:5000/users/adj", {

          headers: { "x-auth-token": token },

        });

        setUserData({

          token,

          user : userRes.data,

        });

      }

      else if(role === "doc"){

        const userRes = await axios.get("http://localhost:5000/users/doc", {

          headers: { "x-auth-token": token },

        });

        setUserData({

          token,

          user : userRes.data,

        });

      }

      else if(role === "ens"){

        const userRes = await axios.get("http://localhost:5000/users/ens", {

          headers: { "x-auth-token": token },

        });

        setUserData({

          token,

          user : userRes.data,

        });

      }

      }

    };

    checkLoggedIn();

 

  }, []);
  return (
    <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData, iddirData, setiddirData, iddocData, setiddocData}}>
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
                <SecusecComponent />
              </Route>
            
              <Route path="/adj" >
                <SecuadjComponent />
              </Route>

              <Route path="/ens" >
                <SecudirComponent />
              </Route> 

              <Route path="/doct" >
                <SecudocComponent />
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