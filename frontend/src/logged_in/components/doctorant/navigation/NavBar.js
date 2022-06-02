import React,{useRef, useCallback, useState, useContext} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Hidden,Drawer,List, ListItem,
  ListItemIcon,
  Tooltip,Box,IconButton} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import Refresh from "./Refresh";
import NavigationDrawer from "../../../../shared/components/NavigationDrawer";
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuIcon from "@mui/icons-material/Menu";
import UserContext from "../../../../shared/components/UserContext";
import { MdOutlineLogout } from "react-icons/md";
import { FaClipboardList } from "react-icons/md";
const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    backgroundColor: theme.palette.common.black,
  },
  smBordered: {
    [theme.breakpoints.down("sm")]: {
      borderRadius: "50% !important",
    },
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.secondary.main,
  },
  justifyCenter: {
    justifyContent: "center",
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  noDecoration: {
    textDecoration: "none !important",
  }
  
});

function NavBar(props) {
  const {
    classes,
    selectedTab,
  } = props;
  const links = useRef([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {setUserData } = useContext(UserContext);

  const logout = useCallback(() => {

    setUserData({

      token: undefined,

      user: undefined,

    });

    localStorage.setItem("auth-token", "");

  }, [setUserData]);

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);
  const menuItems = [
    {
      link: "/doct",
      name: "Doctorant",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <PersonIcon
            className={
              selectedTab === "Doct" ? classes.textPrimary : "text-white"
            }           
          />
        ),
        mobile: <PersonIcon className="text-white" />,
      },
    },
    {link: "/",
    name: "Logout",
    onclick:logout,
    icon: {
      desktop: (
        <MdOutlineLogout className="text-white" />
      ),
      mobile: <MdOutlineLogout className="text-white" />,
    },
  }
  ];
  return (
    <div className={classes.root}>
     <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.Toolbar}>
        <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                  color="primary"
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden smDown>
        <Link        
             to="/doct"
             onClick={Refresh}
             className={classes.noDecoration}
              >
            <img
             src={`${process.env.PUBLIC_URL}/images/faviconD-512x512.png`}
             alt="logo DocUniT"
             width="32" height="31"
         /> 
         </Link>  
         <Link        
             to="/doct"
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
          </div>
          </Link>       
          </Hidden>
          </Box>
        </Toolbar>
        </AppBar>

        <Hidden smDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => (
              <Link
                to={element.link}
                className={classes.menuLink}
                onClick={element.onClick}
                key={index}
                ref={(node) => {
                  links.current[index] = node;
                }}
              >
                <Tooltip
                  title={element.name}
                  placement="right"
                  key={element.name}
                >
                  <ListItem
                    selected={selectedTab === element.name}
                    button
                    divider={index !== menuItems.length - 1}
                    className={classes.permanentDrawerListItem}
                    onClick={() => {
                      links.current[index].click();
                    }}
                    aria-label={
                      element.name === "Logout"
                        ? "Logout"
                        : `Go to ${element.name}`
                    }
                  >
                    <ListItemIcon className={classes.justifyCenter}>
                      {element.icon.desktop}
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </Link>
            ))}
          </List> 
        </Drawer>
      </Hidden>
      <NavigationDrawer
       menuItems={menuItems.map((element) => ({
        link: element.link,
        name: element.name,
        icon: element.icon.mobile,
        onClick: element.onClick,
      }))}
      anchor="left"
      open={isMobileOpen}
      selectedItem={selectedTab}
      onClose={closeMobileDrawer}
      />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedTab: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(NavBar);
