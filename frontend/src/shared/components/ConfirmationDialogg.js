import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function ConfirmationDialog(props) {
  const { open, onClose, loading, title, content, actions } = props;
  return (
    <Dialog  PaperProps={{ style: {
      minWidth: '59%',
      maxWidth: '59%',
    }}} open={open} onClose={onClose} disableEscapeKeyDown={loading}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent >
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
      {actions}
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onConfirm: PropTypes.func
};

export default ConfirmationDialog;
