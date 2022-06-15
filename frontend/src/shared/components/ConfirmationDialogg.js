import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function ConfirmationDialogg(props) {
  const { open, onClose, loading, title, content, actions,    onFormSubmit,
  } = props;
  return (
    <Dialog  PaperProps={{ style: {
      minWidth: '65%',
      maxWidth: '65%',
    }}} open={open} onClose={onClose} disableEscapeKeyDown={loading}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent >
      <form onSubmit={onFormSubmit}>
        <DialogContentText>{content}</DialogContentText>
      <DialogActions>
      {actions}
      </DialogActions>
      </form>
      </DialogContent>
    </Dialog>
  );
}

ConfirmationDialogg.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onConfirm: PropTypes.func
};

export default ConfirmationDialogg;
