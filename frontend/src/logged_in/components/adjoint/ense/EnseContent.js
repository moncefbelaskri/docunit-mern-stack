import React, { useState, useCallback , useContext, Fragment } from "react";
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
  List, ListItem, ListItemText,
  Box, } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import EnhancedTableHead from "../../../../shared/components/EnhancedTableHead";
import stableSort from "../../../../shared/functions/stableSort";
import getSorting from "../../../../shared/functions/getSorting";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import ConfirmationDialogg from "../../../../shared/components/ConfirmationDialogg";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import TextField from '@mui/material/TextField';
import Bordered from "../../../../shared/components/Bordered";
import SearchBar from 'search-bar-react';
import UserContext from "../../../../shared/components/UserContext";

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
    id: "grade",
    label: "Grade",
  },
  {
    id: "email",
    label: "Adresse email",
  }, 
  {
    id: "numtel",
    label: "Numéro de téléphone",
  }, 
  {
    id: "actions",
    label: "",
  },
];
const rowsPerPage = 25;

function EnseContent(props) {
  const {
    ense,
    setEnse,
    classes,
  } = props;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  
  const { userData } = useContext(UserContext);

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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isViewDirDialogOpen, setIsViewDirDialogOpen] = useState(false);
  const [viewDirDialogRow, setViewDirDialogRow] = useState(null);
  const handleViewDirDialogClose = useCallback(() => {
    setIsViewDirDialogOpen(false);
  }, [setIsViewDirDialogOpen]);

  const handleViewDirDialogOpen = useCallback(
    (row) => {
      setIsViewDirDialogOpen(true);
      setViewDirDialogRow(row);
    },
    [setIsViewDirDialogOpen,setViewDirDialogRow]
  );
  
  const [searched, setSearched] = useState("");

  const onChangeSearch = useCallback(
    (searchVal) => {

      axios.get("http://localhost:5000/users/secens").then(function (response) {
        const enslist = response.data;
      const ense = [];
      for (let i = 0; i < enslist.length; i += 1) {
        const randomens = enslist[i];
        if(userData.user.dept === randomens.ensdept)
      {
        if((randomens.ensnom.toLowerCase().includes(searchVal.toLowerCase())) || (randomens.ensprenom.toLowerCase().includes(searchVal.toLowerCase())) )
        {
        const targett = {
          id: i, 
          _id : randomens._id,
          nom: randomens.ensnom,
          prénom:  randomens.ensprenom,
          grade:  randomens.ensgrade,
          email: randomens.ensmail,
          eeb: randomens.ensetabori,
          elr: randomens.enslaborata,
          en: randomens.ensnumtel,
          ndc:  randomens.ensusername,
          mdp:  randomens.enspassword,
        };
        ense.push(targett);
      }
    }
      }
      setEnse(ense);
    })
    })
  const cancelSearch = useCallback(
    () => {
      setSearched("");
      onChangeSearch(searched);
    },
    [setSearched]
  );

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Liste des Enseignants</Typography>
        <SearchBar
          placeholder="Search..."
          value={searched}
          onChange={(searchVal) => onChangeSearch(searchVal)}
          onClear={() => cancelSearch()}
        />
      </Toolbar>
      <Divider />

      <ConfirmationDialogg
          open={isViewDirDialogOpen}
          onClose={handleViewDirDialogClose}
          title="Données d'un Enseignant"
          content={viewDirDialogRow ? (
            <Box
            sx={{
          '& .MuiTextField-root': { m: 1, width: '29.5ch' },
        }}
        
        
      >
         <Typography paragraph variant="h5">      
         <center>Informations Personnelle</center>
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="standard" label="Nom" inputProps={{ readOnly: true }} defaultValue={viewDirDialogRow.nom}/>
            <TextField required variant="standard" label="Prénom" inputProps={{ readOnly: true }} defaultValue={viewDirDialogRow.prénom}/>                
            </div> 
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

  <br/>
      <Typography paragraph variant="h5">      
      <center>Contact</center>
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="standard" label="N° de téléphone " name="phone" inputProps={{ readOnly: true }}  defaultValue={viewDirDialogRow.en}/>
            <TextField  required variant="standard" label="Email" name="email" type="email" inputProps={{ readOnly: true }} defaultValue={viewDirDialogRow.email}/>
            </div>   
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>
            <Typography paragraph variant="h5">      
            <center>Informations Professionnelle</center>
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="standard" label="Grade" inputProps={{ readOnly: true }} defaultValue={viewDirDialogRow.grade}/>
            <TextField required variant="standard" label="Etablissement d'origine" inputProps={{ readOnly: true }} defaultValue={viewDirDialogRow.eeb}/>
            <TextField required variant="standard" label="Laboratoire de rattachement" inputProps={{ readOnly: true }} defaultValue={viewDirDialogRow.elr}/>
            </div> 
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>
            <Typography paragraph variant="h5">      
            <center>Identifiants</center>
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="standard" label="Nom de compte"  inputProps={{ readOnly: true }} defaultValue={viewDirDialogRow.ndc}/>
            <VisibilityPasswordTextField
              variant="standard"
              margin="normal"
              required
              label="Mot de passe"
              inputProps={{ readOnly: true }}
              defaultValue={viewDirDialogRow.mdp} 
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />        
            </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>
       
    </Box>
         ) : null }
         actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={handleViewDirDialogClose}>
                Retour
              </Button>
            </Box>
          </Fragment>
        }
          />

      <Box width="100%">
              <div className={classes.tableWrapper}>
                  {ense.length > 0 ? (
                      <Table aria-labelledby="tableTitle">
                          <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={ense.length}
                              rows={rows} />
                          <TableBody>
                              {stableSort(ense, getSorting(order, orderBy))
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
                                              {row.grade}
                                          </TableCell>    
                                          <TableCell component="th" scope="row">
                                              {row.email}
                                          </TableCell>  
                                          <TableCell component="th" scope="row">
                                              {row.en}
                                          </TableCell>                                  
                                          <TableCell component="th" scope="row">
                                              <Box display="flex" justifyContent="flex-end">  
                                                  <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => {
                                                        handleViewDirDialogOpen(row);
                                                    } }
                                                      aria-label="Delete"
                                                      size="large">
                                                      <RemoveRedEyeIcon className={classes.blackIcon} />
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
                      count={ense.length}
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
                          actions: ense.length > 0 ? classes.dBlock : classes.dNone,
                          caption: ense.length > 0 ? classes.dBlock : classes.dNone,
                      }}
                      labelRowsPerPage="" />
              </div>
          </Box>
    </Paper>
  );
}

EnseContent.propTypes = {
  classes: PropTypes.object.isRequired,
  ense: PropTypes.arrayOf(PropTypes.object).isRequired,
  openViewEnseModal: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(EnseContent);