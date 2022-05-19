import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import Refresh from "../navigation/Refresh";
const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  logobar : {
    display: "flex",
    justifyContent: "start",
    padding : "0",
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400
  },
  noDecoration: {
    textDecoration: "none !important"
  }
});

function NavBarerror(props) {
  const {
    classes
  } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        <Toolbar className={classes.logobar}>
         <Link        
             to={"/"}
             onClick={Refresh}
             className={classes.noDecoration}
              >
            <img
             src={`${process.env.PUBLIC_URL}/images/faviconD-512x512.png`}
             width="32" height="31"
         /> 
         </Link>  
         <Link        
             to={"/"}
             onClick={Refresh}
             className={classes.noDecoration}
              >     
          <div> 
           
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="primary"
             
            >
               ocUniT
            </Typography>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="secondary"
             
            >              
            </Typography>
          </div>
          </Link>        
          </Toolbar>       
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBarerror.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(NavBarerror));
