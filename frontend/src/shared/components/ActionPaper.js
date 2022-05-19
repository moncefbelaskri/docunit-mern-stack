import React from "react";
import PropTypes from "prop-types";
import { Paper, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";

import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  helpPadding: {
    "@media (max-width:  400px)": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  fullWidth: {
    width: "100%"
  }
});

function ActionPaper(props) {
  const {
    theme,
    classes,
    title,
    content,
    maxWidth,
    actions,
    helpPadding,
    fullWidthActions,
    onFormSubmit
  } = props;
  return (
    <Box pt={1}>
      <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth] }}>
      <form onSubmit={onFormSubmit}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {content && (
          <DialogContent align="center"
            classes={helpPadding ? { root: classes.helpPadding } : null}
          >
            {content}
          </DialogContent>
        )}
        {actions && (
          <Box pb={2} pr={2}>
            <DialogActions
              classes={{ action: fullWidthActions ? classes.fullWidth : null }}
            >
              {actions}
            </DialogActions>
          </Box>
        )}
             </form>
      </Paper>
    </Box>
  );
}

ActionPaper.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.string
  ]),
  content: PropTypes.element,
  maxWidth: PropTypes.string,
  actions: PropTypes.element,
  helpPadding: PropTypes.bool,
  fullWidthActions: PropTypes.bool,
  onFormSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(ActionPaper);
