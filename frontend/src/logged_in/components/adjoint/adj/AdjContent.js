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
  Box,
TextField } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import DownloadIcon from '@mui/icons-material/Download';
import EnhancedTableHead from "../../../../shared/components/EnhancedTableHead";
import stableSort from "../../../../shared/functions/stableSort";
import getSorting from "../../../../shared/functions/getSorting";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { saveAs } from 'file-saver';
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
    id: "intit",
    label: "Intitulé Thèse",
  },
  {
    id: "anac",
    label: "Année Courante",
  },
  {
    id: "datesou",
    label: "Date Prévue de Soutenance",
  },
  {
    id: "action",
    label: "",
  },
];
const rowsPerPage = 25;

function AdjContent(props) {
  const {
    adj,
    classes,
  } = props;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
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
  const getindice = useCallback(
    (row) => {
       axios.post('http://localhost:5000/users/create-pdf',
      row
       ).then(() => 
     axios.get('http://localhost:5000/users/get-pdf', { responseType: 'blob' }))
     .then((res) => { 
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'generatedDocument.pdf')
    }
     )
    },
    []
  );

 

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Liste des Doctorants</Typography>
        
      </Toolbar>
      <Divider />
      <Box width="100%">
              <div className={classes.tableWrapper}>
                  {adj.length > 0 ? (
                      <Table aria-labelledby="tableTitle">
                          <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={adj.length}
                              rows={rows} />
                          <TableBody>
                              {stableSort(adj, getSorting(order, orderBy))
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
                                              {row.anac}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              {row.datesou}
                                          </TableCell>                                                                            
                                          <TableCell component="th" scope="row">
                                              <Box display="flex" justifyContent="flex-end">
                                                  <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => getindice(row)}
                                                      aria-label="Télécharger"
                                                      size="large">
                                                      <DownloadIcon className={classes.blackIcon} />
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
                             Pas encore de doctorants valides.
                          </HighlightedInformation>
                      </Box>
                  )}
              </div>
              <div className={classes.alignRight}>
                  <TablePagination
                      component="div"
                      count={adj.length}
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
                          actions: adj.length > 0 ? classes.dBlock : classes.dNone,
                          caption: adj.length > 0 ? classes.dBlock : classes.dNone,
                      }}
                      labelRowsPerPage="" />
              </div>
          </Box>
    </Paper>
  );
}

AdjContent.propTypes = {
  classes: PropTypes.object.isRequired,
  adj: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAdj: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(AdjContent);
