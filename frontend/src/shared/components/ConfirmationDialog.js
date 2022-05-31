import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import ButtonCircularProgress from "./ButtonCircularProgress";

function ConfirmationDialog(props) {
  const { open, onClose, loading, title, content, onConfirm } = props;
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown={loading}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Fermer
        </Button>
        <Button
          color="secondary"
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
        >
          Confirmer {loading && <ButtonCircularProgress />}
        </Button>
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
