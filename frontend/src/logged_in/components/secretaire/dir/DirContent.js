import React, { useState, useCallback , useContext } from "react";
import PropTypes from "prop-types";
import {Divider,
  Toolbar,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton,
  Box, } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import DeleteIcon from "@mui/icons-material/Delete";
import EnhancedTableHead from "../../../../shared/components/EnhancedTableHead";
import stableSort from "../../../../shared/functions/stableSort";
import getSorting from "../../../../shared/functions/getSorting";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import UserContext from "../../../../shared/components/UserContext";
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const axios = require('axios');

const styles = (theme) => ({
  tableWrapper: {
    overflowX: "auto",
  },
  alignRight: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
  },
  blackIcon: {
    color: theme.palette.common.black,
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  dBlock: {
    display: "block",
  },
  dNone: {
    display: "none",
  },
  toolbar: {
    justifyContent: "space-between",
  },
});
const rows = [
  {
    id: "nom",
    label: "Nom",
  },
  {
    id: "prénom",
    label: "Prénom",
  },
  {
    id: "ndc",
    label: "Nom de compte",
  },
  {
    id: "mdp",
    label: "Mot de passe",
  }, 
  {
    id: "email",
    label: "Email",
  }, 
  {
    id: "actions",
    label: "",
  },
];
const rowsPerPage = 25;

function DirContent(props) {
  const {
    pushMessageToSnackbar,
    setDirs,
    dirs,
    openAddDirModal,
    openModifDirModal,
    openViewDirModal,
    classes,
  } = props;
  const { setiddirData } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [isDeleteDirDialogOpen, setIsDeleteDirDialogOpen] = useState(false);
  const [deleteDirDialogRow, setDeleteDirDialogRow] = useState(null);
  const [isDeleteDirLoading, setIsDeleteDirLoading] = useState(false);
  
  const handleRequestSort = useCallback(
    (__, property) => {
      const _orderBy = property;
      let _order = "desc";
      if (orderBy === property && order === "desc") {
        _order = "asc";
      }
      setOrder(_order);
      setOrderBy(_orderBy);
    },
    [setOrder, setOrderBy, order, orderBy]
  );

  const deleteDir = useCallback(() => {
    setIsDeleteDirLoading(true);
    setTimeout(() => {
      setIsDeleteDirDialogOpen(false);
      setIsDeleteDirLoading(false);
      const _dirs = [...dirs];
      const index = _dirs.findIndex(
        (element) => element.id === deleteDirDialogRow.id
      );
      axios.delete(
        "http://localhost:5000/users/deleteens",
        {
          headers: {
            "x-delete": _dirs[index].ndc ,
          },
        }
      );
      _dirs.splice(index, 1);
      setDirs(_dirs);
      pushMessageToSnackbar({
        text: "supprimé avec succès",
      });
    }, 1500);
  }, [
    setIsDeleteDirDialogOpen,
    setIsDeleteDirLoading,
    pushMessageToSnackbar,
    setDirs,
    deleteDirDialogRow,
    dirs,
  ]);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );
  const updateDir = useCallback((row) => {
    openModifDirModal();
    setiddirData({
      iddirup: row,
    });
  }, []);

  const viewDir = useCallback((row) => {
    openViewDirModal();
    setiddirData({
      iddirup: row,
    });
  }, []);

  const handleDeleteDirDialogClose = useCallback(() => {
    setIsDeleteDirDialogOpen(false);
  }, [setIsDeleteDirDialogOpen]);

  const handleDeleteDirDialogOpen = useCallback(
    (row) => {

      setIsDeleteDirDialogOpen(true);
      setDeleteDirDialogRow(row);
    },
    [setIsDeleteDirDialogOpen, setDeleteDirDialogRow]
  );

  

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Liste des Enseignants</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={openAddDirModal}
          disableElevation
        >
          Ajouter Enseignant
        </Button>
      </Toolbar>
      <Divider />
      <ConfirmationDialog
          open={isDeleteDirDialogOpen}
          title="Confirmation"
          content={deleteDirDialogRow ? (
              <span>
                  {"Voulez vous vraiment supprimer l'enseignant "}
                  <b> {deleteDirDialogRow.nom} </b>
                  {" "}
                  <b> {deleteDirDialogRow.prénom} </b>
                  {"  de votre liste?"}
              </span>
          ) : null}
          onClose={handleDeleteDirDialogClose}
          onConfirm={deleteDir}
          loading={isDeleteDirLoading} /><Box width="100%">
              <div className={classes.tableWrapper}>
                  {dirs.length > 0 ? (
                      <Table aria-labelledby="tableTitle">
                          <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={dirs.length}
                              rows={rows} />
                          <TableBody>
                              {stableSort(dirs, getSorting(order, orderBy))
                                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                  .map((row, index) => (
                                      <TableRow hover tabIndex={-1} key={index}>                                   
                                          <TableCell component="th" scope="row">
                                              {row.nom}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              {row.prénom}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              {row.ndc}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              {row.mdp}
                                          </TableCell>     
                                          <TableCell component="th" scope="row">
                                              {row.email}
                                          </TableCell>                                   
                                          <TableCell component="th" scope="row">
                                              <Box display="flex" justifyContent="flex-end">  
                                                  <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => {
                                                        viewDir(row);
                                                      }}
                                                      aria-label="Delete"
                                                      size="large">
                                                      <RemoveRedEyeIcon className={classes.blackIcon} />
                                                  </IconButton>
                                                  <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => {
                                                        updateDir(row);
                                                      }}
                                                      aria-label="Delete"
                                                      size="large">
                                                      <SettingsIcon className={classes.blackIcon} />
                                                  </IconButton>                                               
                                                  <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => {
                                                          handleDeleteDirDialogOpen(row);
                                                      } }
                                                      aria-label="Delete"
                                                      size="large">
                                                      <DeleteIcon className={classes.blackIcon} />
                                                  </IconButton>
                                              </Box>
                                          </TableCell>
                                      </TableRow>
                                  ))}
                          </TableBody>
                      </Table>
                  ) : (
                      <Box m={2}>
                          <HighlightedInformation>
                             Pas encore d'enseignant créer.
                          </HighlightedInformation>
                      </Box>
                  )}
              </div>
              <div className={classes.alignRight}>
                  <TablePagination
                      component="div"
                      count={dirs.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      backIconButtonProps={{
                          "aria-label": "Previous Page",
                      }}
                      nextIconButtonProps={{
                          "aria-label": "Next Page",
                      }}
                      onPageChange={handleChangePage}
                      classes={{
                          select: classes.dNone,
                          selectIcon: classes.dNone,
                          actions: dirs.length > 0 ? classes.dBlock : classes.dNone,
                          caption: dirs.length > 0 ? classes.dBlock : classes.dNone,
                      }}
                      labelRowsPerPage="" />
              </div>
          </Box>
    </Paper>
  );
}

DirContent.propTypes = {
  openAddDirModal: PropTypes.func.isRequired,
  openModifDirModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dirs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDirs: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(DirContent);