import React from "react";
import {Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import Qets1 from "./faqs/Qets1";
import Qets2 from "./faqs/Qets2";


const styles = (theme) => ({
  containerFix: {
    [theme.breakpoints.down("lg")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
});


function Faqs(props) {
  const { classes}=props;
 
  return (
      <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
        <Typography variant="h3" align="center"  className="lg-mg-bottom">
        Foire Aux Questions
        </Typography>
        <div align="center" className={classes.containerFix}>
        <Qets1/>
        <br />
        <Qets2/>
        </div>
      </div>
  );
}


export default withStyles(styles, { withTheme: true })(Faqs);
