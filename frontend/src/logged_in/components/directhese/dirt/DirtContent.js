import React, { useState, useCallback,useRef} from "react";
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
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';
import getSorting from "../../../../shared/functions/getSorting";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import MovingIcon from '@mui/icons-material/Moving';
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';


const styles = (theme) => ({
  cent:{
    paddingLeft: '90px',
  },
  centt:{
    paddingLeft: '60px',
  },
  centtt:{
    paddingLeft: '0px',
  },
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
    label: "Intitulé de la Thèse",
  },
  {
    id: "etav",
    label: "Pourcentage d'avancement",
  },
  {
    id: "aneactu",
    label: "Année courante",
  },
  {
    id: "action",
    label: "",
  },
];
const rowsPerPage = 25;
function valueLabelFormat(value) {
  const units = ['%'];
  let unitIndex = 0;
  let scaledValue = value;
  return `${scaledValue} ${units[unitIndex]}`;
}



function calculateValue(value) {
  return value;
}
function DirtContent(props) {
  const {
    pushMessageToSnackbar,
    setDirt,
    dirt,
    onFormSubmit,
    classes,
  } = props;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [isEtavDialogOpen, setIsEtavDialogOpen] = useState(
    false
  );
  const [value, setValue] = React.useState(0);
  const [EtavDialogRow, setEtavDialogRow] = useState(null);
  const [isEtavLoading, setIsEtavLoading] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
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
  
  const Avancementpct = useRef();
  const Avancementdatesout = useRef();
  const Avancementetav = useRef();
 
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
          text: "Doctorant desactivé",
        });
      } else {
        pushMessageToSnackbar({
          text: "Doctorant activé",
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
            <form onSubmit={onFormSubmit}>
            <Box>

              <div>

            <Typography id="non-linear-slider" gutterBottom>

            Pourcentage d'avancement : {valueLabelFormat(calculateValue(value))}

            </Typography>

            <input
          type="range"

          className={classes.rang}

           value={value}

           min="0"
           max="100"

           onChange={({ target: { value: radius } }) => {
            setValue(radius);
          }}

           //defaultValue={idavncData.idavncup.pct}
           ref={Avancementpct}
           
           />

            </div>
            <br/>
            <div>
            <Typography>
            Date prévue de soutenance
            </Typography>
            <br/>
              <input className={classes.date} type="date" required /*defaultValue={idavncData.idavncup.ds}*/  ref={Avancementdatesout}/>
            </div>
            <br/>
            <div>
            <Typography>
            Etat d'avancement
            </Typography>  
            <br/>
              <TextareaAutosize className={classes.Area} aria-label="Etatav" required /*defaultValue={idavncData.idavncup.eav}*/ minRows={7} maxRows={7}   ref={Avancementetav}/>
            </div>
            <br/>
             <div> 
             <HighlightedInformation className={classes.Highlight}>
            <b>Vérifiez bien vos informations avant de confirmer.</b>
            </HighlightedInformation>
             </div>
            
          </Box>
          </form>
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
                                      <TableRow hover tabIndex={-1} key={index} >                                   
                                          <TableCell component="th" scope="row">
                                              {row.nom}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              {row.prénom}
                                          </TableCell>
                                          <TableCell component="th" scope="row" className={classes.centtt}>
                                              {row.intit}
                                          </TableCell>
                                          <TableCell component="th" scope="row" className={classes.cent}>
                                              {row.etav}
                                          </TableCell>
                                          <TableCell component="th" scope="row" className={classes.centt}>
                                              {row.aneactu}
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
                                                    <Switch
                                                    color="secondary"
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    onClick={() => {
                                                              toggleDirt(row);
                                                          } }
                                                    inputProps={{ 'aria-label': 'Resume' }}
                                                    size="large"
                                                     />
                                                  ) : (
                                                    <Switch
                                                    color="secondary"
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    onClick={() => {
                                                              toggleDirt(row);
                                                          } }
                                                    inputProps={{ 'aria-label': 'Resume' }}
                                                    size="large"
                                                     />
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
