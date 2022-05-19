import React, { useState, useCallback } from "react";
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
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";

const styles =(theme)=> ({
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
    id: "actions",
    label: "",
  },
];

const rowsPerPage = 25;

function DocContent(props) {
  const {
    pushMessageToSnackbar,
    setDocs,
    docs,
    openAddDocModal,
    classes, 
  } = props;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [isDeleteDocDialogOpen, setIsDeleteDocDialogOpen] = useState(
    false
  );
  const [deleteDocDialogRow, setDeleteDocDialogRow] = useState(null);
  const [isDeleteDocLoading, setIsDeleteDocLoading] = useState(false);

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

  const deleteDoc = useCallback(() => {
    setIsDeleteDocLoading(true);
    setTimeout(() => {
      setIsDeleteDocDialogOpen(false);
      setIsDeleteDocLoading(false);
      const _docs = [...docs];
      const index = _docs.findIndex(
        (element) => element.id === deleteDocDialogRow.id
      );
      _docs.splice(index, 1);
      setDocs(_docs);
      pushMessageToSnackbar({
        text: "Doctorant supprimé",
      });
    }, 1500);
  }, [
    setIsDeleteDocDialogOpen,
    setIsDeleteDocLoading,
    pushMessageToSnackbar,
    setDocs,
    deleteDocDialogRow,
    docs,
  ]);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  const handleDeleteDocDialogClose = useCallback(() => {
    setIsDeleteDocDialogOpen(false);
  }, [setIsDeleteDocDialogOpen]);

  const handleDeleteDocDialogOpen = useCallback(
    (row) => {
      setIsDeleteDocDialogOpen(true);
      setDeleteDocDialogRow(row);
    },
    [setIsDeleteDocDialogOpen, setDeleteDocDialogRow]
  );



  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Liste des Doctorants</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={openAddDocModal}
          disableElevation
        >
          Ajouter Doctorant
        </Button>
      </Toolbar>
      <Divider/>
      <ConfirmationDialog
          open={isDeleteDocDialogOpen}
          title="Confirmation"
          content={deleteDocDialogRow ? (
              <span>
                  {"Voulez vous vraiment supprimer le doctorant"}
                  <b>{deleteDocDialogRow.name}</b>
                  {" de votre liste?"}
              </span>
          ) : null}
          onClose={handleDeleteDocDialogClose}
          onConfirm={deleteDoc}
          loading={isDeleteDocLoading} /><Box width="100%">
              <div className={classes.tableWrapper}>
                  {docs.length > 0 ? (
                      <Table aria-labelledby="tableTitle">
                          <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={docs.length}
                              rows={rows} />
                          <TableBody>
                              {stableSort(docs, getSorting(order, orderBy))
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
                                              <Box display="flex" justifyContent="flex-end">
                                                  <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => {
                                                          handleDeleteDocDialogOpen(row);
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
                             Pas encore de doctorant créer.
                          </HighlightedInformation>
                      </Box>
                  )}
              </div>
              <div className={classes.alignRight}>
                  <TablePagination
                      component="div"
                      count={docs.length}
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
                          actions: docs.length > 0 ? classes.dBlock : classes.dNone,
                          caption: docs.length > 0 ? classes.dBlock : classes.dNone,
                      }}
                      labelRowsPerPage="" />
              </div>
          </Box>
    </Paper>
  );
}

DocContent.propTypes = {
  openAddDocModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  docs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDocs: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(DocContent);
