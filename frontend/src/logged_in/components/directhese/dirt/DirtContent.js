import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {Divider,
  Toolbar,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton,
  Box, } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import PlayCirlceOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import EnhancedTableHead from "../../../../shared/components/EnhancedTableHead";
import stableSort from "../../../../shared/functions/stableSort";
import getSorting from "../../../../shared/functions/getSorting";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import MovingIcon from '@mui/icons-material/Moving';
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';


const styles = (theme) => ({
  Area:{
    border:0,
    color: 'black',
    padding: '0 22px',
    resize: 'none',
    fontSize: '17px',
    width:320,
  },
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
    id: "intit",
    label: "Intitulé Thèse",
  },
  {
    id: "etav",
    label: "Pourcentage d'avancement",
  },
  {
    id: "datesou",
    label: "Date Soutenance",
  },
  {
    id: "action",
    label: "",
  },
];
const rowsPerPage = 25;

function DirtContent(props) {
  const {
    pushMessageToSnackbar,
    setDirt,
    dirt,
    classes,
  } = props;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [isEtavDialogOpen, setIsEtavDialogOpen] = useState(
    false
  );
  const [EtavDialogRow, setEtavDialogRow] = useState(null);
  const [isEtavLoading, setIsEtavLoading] = useState(false);

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

 
  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );
  const Etav = useCallback(() => {
    setIsEtavLoading(true);
    setTimeout(() => {
      setIsEtavDialogOpen(false);
      setIsEtavLoading(false);
      pushMessageToSnackbar({
        text: "Avancement validé",
      });
    }, 1500);
  }, [
    setIsEtavDialogOpen,
    setIsEtavLoading,
    pushMessageToSnackbar,
  ]);
  const handleEtavDialogClose = useCallback(() => {
    setIsEtavDialogOpen(false);
  }, [setIsEtavDialogOpen]);

  const handleEtavDialogOpen = useCallback(
    (row) => {
      setIsEtavDialogOpen(true);
      setEtavDialogRow(row);
    },
    [setIsEtavDialogOpen, setEtavDialogRow]
  );

  const toggleDirt = useCallback(
    (row) => {
      const _dirt = [...dirt];
      const index = _dirt.findIndex((element) => element.id === row.id);
      row.isActivated = !row.isActivated;
      _dirt[index] = row;
      if (row.isActivated) {
        pushMessageToSnackbar({
          text: "Doctorant activé",
        });
      } else {
        pushMessageToSnackbar({
          text: "Doctorant desactivé",
        });
      }
      setDirt(_dirt);
    },
    [pushMessageToSnackbar, dirt, setDirt]
  );

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Liste des Doctorants</Typography>
      </Toolbar>
      <Divider />
      <ConfirmationDialog
          open={isEtavDialogOpen}
          title="Avancement global du doctorant"
          content={EtavDialogRow ? (
            <Box><div><TextField  sx={{ m: 1, width: 300 }} id="outlined-required" label="Pourcentage d'avancement" /></div>
            <div><TextareaAutosize className={classes.Area} aria-label="Etatav" minRows={5} maxRows={5}  placeholder="Etat d'avancement"/></div></Box>
          ) : null}
          onClose={handleEtavDialogClose}
          onConfirm={Etav}
          loading={isEtavLoading} />
      <Box width="100%">
              <div className={classes.tableWrapper}>
                  {dirt.length > 0 ? (
                      <Table aria-labelledby="tableTitle">
                          <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={dirt.length}
                              rows={rows} />
                          <TableBody>
                              {stableSort(dirt, getSorting(order, orderBy))
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
                                              {row.intit}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              {row.etav}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              {row.datesou}
                                          </TableCell>                                                                            
                                          <TableCell component="th" scope="row">
                                              <Box display="flex" justifyContent="flex-end">
                                              <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => {
                                                        handleEtavDialogOpen(row);
                                                      } }                                                     
                                                      aria-label="Voir Avancement"
                                                      size="large">
                                                      <MovingIcon className={classes.blackIcon} />
                                                  </IconButton>
                                                  {row.isActivated ? (
                                                      <IconButton
                                                          className={classes.iconButton}
                                                          onClick={() => {
                                                              toggleDirt(row);
                                                          } }
                                                          aria-label="Pause"
                                                          size="large">
                                                          <PauseCircleOutlineIcon
                                                              className={classes.blackIcon} />
                                                      </IconButton>
                                                  ) : (
                                                      <IconButton
                                                          className={classes.iconButton}
                                                          color="primary"
                                                          onClick={() => {
                                                              toggleDirt(row);
                                                          } }
                                                          aria-label="Resume"
                                                          size="large">
                                                          <PlayCirlceOutlineIcon />
                                                      </IconButton>
                                                  )}                                               
                                              </Box>
                                          </TableCell>
                                      </TableRow>
                                  ))}
                          </TableBody>
                      </Table>
                  ) : (
                      <Box m={2}>
                          <HighlightedInformation>
                             Pas encore de doctorants valides.
                          </HighlightedInformation>
                      </Box>
                  )}
              </div>
              <div className={classes.alignRight}>
                  <TablePagination
                      component="div"
                      count={dirt.length}
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
                          actions: dirt.length > 0 ? classes.dBlock : classes.dNone,
                          caption: dirt.length > 0 ? classes.dBlock : classes.dNone,
                      }}
                      labelRowsPerPage="" />
              </div>
          </Box>
    </Paper>
  );
}

DirtContent.propTypes = {
  classes: PropTypes.object.isRequired,
  dirt: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDirt: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(DirtContent);
