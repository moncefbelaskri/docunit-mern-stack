import React, { useRef , useCallback } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Hidden,
  TextField,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import emailjs from "emailjs-com";
import DocUniTBorder from "../../../shared/components/DocUniTBorder";
import useMediaQuery from "@mui/material/useMediaQuery";
import ColoredButton from "../../../shared/components/ColoredButton";


const styles = (theme) => ({
  footerInner: {
    backgroundColor: theme.palette.common.darkBlack,
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    color: theme.palette.common.white,
  },
  footerLinks: {
    marginTop: theme.spacing(2.5),
    marginBot: theme.spacing(1.5),
    color: theme.palette.common.white,
  },
  infoIcon: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: "#33383b !important",
  },
  socialIcon: {
    fill: theme.palette.common.white,
    backgroundColor: "#33383b",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  link: {
    cursor: "Pointer",
    color: theme.palette.common.white,
    transition: theme.transitions.create(["color"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  whiteBg: {
    backgroundColor: theme.palette.common.white,
  },
});

const infos = [
  {
    icon: <PhoneIcon />,
    description: "+213 (0) 43 21 63 70",
  },
  {
    icon: <MailIcon />,
    description: "vdrpg.facscience@gmail.com",
  },
 
];

const socialIcons = [
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>siteweb</title>
        <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79l4.79 4.79v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1v-2h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    label: "siteweb",
    href: "https://fs.univ-tlemcen.dz/fr",
  },
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Facebook</title>
        <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
      </svg>
    ),
    label: "Facebook",
    href: "https://www.facebook.com/Facult%C3%A9-des-Sciences-Tlemcen-390394901164787/",
    target: '_blank',
  },
  {
    icon: (
      <svg
        role="img"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>LinkedIn</title>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/abou-bekr-belkaid-university-of-tlemcen/",
  },
];

function Footer(props) {
  const { classes, theme } = props;
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const form = useRef();

  const sendEmail = useCallback(async (e) => {
 
    emailjs.send("service_docunit","template_7gzrk76",{
      message: form.current.value
      },"33t43J5a_v1TO4FQs")
   .then((result) => {
       console.log(result.text);
   
   }, (error) => {
       console.log(error.text);
   });

   form.current.value = "";              
   e.preventDefault();
   
  }, []);

  


  return (
    <footer className="lg-p-top">
    <DocUniTBorder
      upperColor="#FFFFFF"
      lowerColor={theme.palette.common.darkBlack}
      animationNegativeDelay={4}
    />
    <div className={classes.footerInner}>
      <Grid container spacing={isWidthUpMd ? 10 : 5}>
        <Grid item xs={12} md={6} lg={4}>
          <form onSubmit={sendEmail}>
            <Box display="flex" flexDirection="column">
              <Box mb={1}>
                <TextField
                  variant="outlined"
                  multiline
                  placeholder="Veuillez joindre votre adresse mail en bas de votre message."
                  InputProps={{
                    className: classes.whiteBg,
                    "aria-label": "contact",
                  }}
                  rows={4}
                  fullWidth
                  required
                  inputRef={form}
                />
              </Box>
              <ColoredButton
              type="submit"
                color={theme.palette.common.white}
                variant="outlined"
              >
                Envoyer Un Message
              </ColoredButton>
            </Box>
          </form>
        </Grid>
        <Hidden lgDown>
          <Grid item xs={12} md={6} lg={4}>
            <Box display="flex" justifyContent="center">
              <div>
                {infos.map((info, index) => (
                  <Box display="flex" mb={1} key={index}>
                    <Box mr={2}>
                      <IconButton
                        className={classes.infoIcon}
                        tabIndex={-1}
                        disabled
                        size="large"
                      >
                        {info.icon}
                      </IconButton>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Typography variant="h6" className="text-white">
                        {info.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </div>
            </Box>
            </Grid>
        </Hidden>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h6" paragraph className="text-white">
          A PROPOS
          </Typography>
          <Typography style={{ color: "#8f9296" }} paragraph>
          Gestion en ligne du processus d'inscription Post Concours au Doctorat pour la Faculté des Sciences Tlemcen.
          </Typography>
          <Box display="flex">
            {socialIcons.map((socialIcon, index) => (
              <Box key={index} mr={index !== socialIcons.length - 1 ? 1 : 0}>
                <IconButton
                  aria-label={socialIcon.label}
                  className={classes.socialIcon}
                  href={socialIcon.href}
                  size="large"
                >
                  {socialIcon.icon}
                </IconButton>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </div>
  </footer>
  );
}

Footer.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Footer);


