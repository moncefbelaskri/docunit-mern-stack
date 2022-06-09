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
            data-aos-delay="200" >
        <div >
          <button
            className={`question-section ${active}`}
            onClick={toggleAccordion}
            
          >
            <div>
              <div className="question-align">
                <h3 className="question-style">
                Comment contacter le support en cas de problème?
                </h3>
                
                <BsChevronDown
                  className={active ? `question-icon rotate` : `question-icon rotate2`}
                />
              </div>

              <div
                ref={contentRef}
                className={active ? `answer answer-divider ` : `answer`}
                
              >
                <p>En bas de la page d'accueil, vous avez le possibilité d'écrire un message qui sera envoyer au support du site. Veuillez juste  joindre votre email à la fin du message pour être sur d'avoir une réponse à votre requête.
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
