import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import LoginDialog from "./LoginDialog";
import ModalBackdrop from "../../../shared/components/ModalBackdrop";

function DialogSelector(props) {
  const {
    dialogOpen,
    openLoginDialog,
    onClose,
  } = props;
  const [loginStatus, setLoginStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);

  const _onClose = useCallback(() => {
    setLoginStatus(null);
    onClose();
  }, [onClose, setLoginStatus, ]);

  const printDialog = useCallback(() => {
    switch (dialogOpen) {
      
      case "login":
        return (
          <LoginDialog
            onClose={_onClose}
            status={loginStatus}
            setStatus={setLoginStatus}
          />
        );
      
      default:
    }
  }, [
    dialogOpen,
    openLoginDialog,
    _onClose,
    loginStatus,
    registerStatus,
    setLoginStatus,
    setRegisterStatus,
  ]);

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

DialogSelector.propTypes = {
  dialogOpen: PropTypes.string,
  openLoginDialog: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogSelector;
