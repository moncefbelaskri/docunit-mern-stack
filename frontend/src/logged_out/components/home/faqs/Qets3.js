import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { BsChevronDown } from "react-icons/bs";
import { withStyles } from "@mui/styles";

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

function App(props) {
  const [active, setActive] = useState(false);

  const contentRef = useRef(null);

  const { classes}=props;

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };
  return (
    <>
      <div className={classes.containerFix} data-aos="zoom-in-up"
            data-aos-delay="150" >
        <div >
          <button
            className={`question-section ${active}`}
            onClick={toggleAccordion}
            
          >
            <div>
              <div className="question-align">
                <h3 className="question-style">
                Comment faire la reinscription au doctorat ?
                </h3>
                
                <BsChevronDown
                  className={active ? `question-icon rotate` : `question-icon rotate2`}
                />
              </div>

              <div
                ref={contentRef}
                className={active ? `answer answer-divider ` : `answer`}
                
              >
                <p>Connectez vous grâce aux identifiants fournis par l'administration, vous allez être diriger vers une page qui contient entre autre un bouton reinscription, cliquez dessus et vous aurez la possibilité de renseigner votre état ainsi que votre pourcentage d'avancement pour l'année en cours.
                </p>
              </div>

            </div>
          </button>
        </div>
      </div>
    </>
  );
}
export default withStyles(styles, { withTheme: true })(App);
