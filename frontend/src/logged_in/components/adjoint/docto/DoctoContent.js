import React, { useState, useCallback, useContext, Fragment} from "react";
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
  Button,
  ListItem,
  ListItemText,
  List,
  Box, } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import EnhancedTableHead from "../../../../shared/components/EnhancedTableHead";
import stableSort from "../../../../shared/functions/stableSort";
import getSorting from "../../../../shared/functions/getSorting";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ConfirmationDialogg from "../../../../shared/components/ConfirmationDialogg";
import TextField from '@mui/material/TextField';
import Bordered from "../../../../shared/components/Bordered";
import SearchBar from 'search-bar-react';
import UserContext from "../../../../shared/components/UserContext";
const axios = require('axios');

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
    id: "email",
    label: "Adresse email",
  }, 
  {
    id: "ac",
    label: "Année Courante",
  }, 
  {
    id: "dtss",
    label: "Date Prévue de Soutenance",
  }, 
  {
    id: "actions",
    label: "",
  },
];

const rowsPerPage = 25;

function DoctoContent(props) {
  const {
    docto,
    setDocto,
    classes, 
  } = props;
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const [isViewDocDialogOpen, setIsViewDocDialogOpen] = useState(false);
  const [viewDocDialogRow, setViewDocDialogRow] = useState(null);
  const handleViewDocDialogClose = useCallback(() => {
    setIsViewDocDialogOpen(false);
  }, [setIsViewDocDialogOpen]);

  const handleViewDocDialogOpen = useCallback(
    (row) => {
      setIsViewDocDialogOpen(true);
      setViewDocDialogRow(row);
    },
    [setIsViewDocDialogOpen,setViewDocDialogRow]
  );

  const { userData } = useContext(UserContext);
  const [searched, setSearched] = useState("");

  const onChangeSearch = useCallback(
    (searchVal) => {
       
      axios.get("http://localhost:5000/users/secdoc").then(function (response) {
      const doclist = response.data.doc;
      const avlist = response.data.avnc;
      const docto = [];
      for (let i = 0; i < doclist.length; i += 1) {
        const randomdoc = doclist[i];
        if(userData.user.dept === randomdoc.dept)
        {
        for (let j = 0; j < avlist.length; j += 1) {     
        const randomav = avlist[j]; 
        if(randomdoc.username === randomav.usernamedoc)
        {
          if((randomdoc.nom.toLowerCase().includes(searchVal.toLowerCase())) || (randomdoc.prenom.toLowerCase().includes(searchVal.toLowerCase())) ){
        const target = {
          id: i,
          _id : randomdoc._id,
          nom: randomdoc.nom,
          prénom:  randomdoc.prenom,
          ndc:  randomdoc.username,
          mdp:  randomdoc.password,
          da:   randomdoc.dateN,
          li:   randomdoc.lieuN,
          ad:   randomdoc.adresse,
          nt:   randomdoc.numtel,     
          email : randomdoc.mail,
          ep:   randomdoc.etapro,
          pr:   randomdoc.preci,
          an:   randomdoc.anebac,
          seb:   randomdoc.seribac,
          nb:   randomdoc.numbac,
          cd:   randomdoc.catdoc,
          dd:   randomdoc.derdip,
          prr:  randomdoc.precii,
          sdd:  randomdoc.spederdip,
          dad:  randomdoc.datederdip,
          dap:  randomdoc.datepremdoc,
          sd:   randomdoc.spedoc,
          lr:   randomdoc.laborata,
          inti: randomdoc.intithe,
          ds:   randomdoc.datesout,
          dn:   randomdoc.dirnom,
          dp:   randomdoc.dirprenom,
          dg:   randomdoc.dirgrade,
          cdn:  randomdoc.codirnom,
          cdp:  randomdoc.codirprenom,
          cdg:  randomdoc.dirgrade,
          ac: randomav.aneactu,
          dtss: randomav.datesout,    
        };
        docto.push(target);
      }
     }
    }
  
}
}
    setDocto(docto);
    
  })
  .catch(function (error) {
    console.log(error);
  });
    },
    [setDocto]
  );

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
        <Typography variant="h6">Liste des Doctorants</Typography>
        <SearchBar
          placeholder="Search..."
          value={searched}
          onChange={(searchVal) => onChangeSearch(searchVal)}
          onClear={() => cancelSearch()}
        />
      </Toolbar>
      <Divider/>

      <ConfirmationDialogg
          open={isViewDocDialogOpen}
          title="Données d'un Doctorant"
          content={viewDocDialogRow ? (
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
            <TextField required variant="standard" label="Nom" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.nom}/>            
            <TextField required variant="standard" label="Prénom" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.prénom}/>
            </div>
            <div>
            <TextField required variant="standard" label="Né(e) le" type="date" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.da}/>
            <TextField required variant="standard" label="à" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.li}/>
            <TextField required variant="standard" label="Adresse" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.ad} />
            </div>  
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>
      <br/>
      <Typography paragraph variant="h5">
      <center> Contact</center>
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>   
           <div>
           <TextField required variant="standard" label="N° de téléphone " name="phone" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.nt} />
           <TextField required variant="standard" label="Email" name="email" type="email" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.email}/>            
           </div> 
           </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>

      <Typography paragraph variant="h5">
      <center> Informations Professionnelle</center>
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField  required variant="standard"  label="Etat professionnel"  inputProps={{ readOnly: true }}  defaultValue={viewDocDialogRow.ep}/>
        {viewDocDialogRow.ep==="sal"? <TextField  variant="standard" label="(Préciser)" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.pr}/>:null}
            </div>
            <div>
            <TextField required variant="standard" type="number" name="number"  label="Année d’obtention du BAC" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.an}/>
            <TextField required variant="standard"  label="Série du BAC " inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.seb}/>
            <TextField required variant="standard" type="number" name="number" label="N° du BAC " inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.nb}/>
            </div> 
            <div>      
        <TextField required variant="standard"    label="Fiche de reinscription en" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.cd}/>           
            <TextField required variant="standard"    label="Dernier diplome obtenu" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.dd}/>  
            {viewDocDialogRow.dd==="au"? <TextField  variant="standard" label="(Préciser)" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.prr}/>:null}
            </div>
            <div>
            <TextField required variant="standard" label="Spécialité dernier diplôme obtenu" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.sdd}/>
            <TextField required variant="standard" label="Date de son obtention"  type="date" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.dad}/>
            </div>  
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>

      <Typography paragraph variant="h5">
      <center>Informations Doctorat</center>
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>             
            <div>
            <TextField required variant="standard"    label="Fiche de reinscription en" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.cd}/>           
            <TextField required variant="standard" label="Date 1ère Inscription Doctorat"  type="date" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.dap}/>
            <TextField required variant="standard" label="Spécialité du Doctorat" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.sd}/>
            </div>
            <div>
            <TextField required variant="standard" label="Laboratoire de rattachement" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.lr}/>          
            <TextField required variant="standard" label="Intitulé de la thèse" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.inti}/>
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
            <TextField required variant="standard" label="Nom de compte" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.ndc}/>
            <VisibilityPasswordTextField
              variant="standard"
              margin="normal"
              required
              fullWidth              
              label="Mot de passe"
              autoComplete="off"
              inputProps={{ readOnly: true }}
              defaultValue={viewDocDialogRow.mdp}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
              />            
              </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

      <br/>

      <Typography paragraph variant="h5">
      <center>Informations Directeur de thèse</center>
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="standard" label="Nom" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.dn}/>
            <TextField required variant="standard" label="Prénom" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.dp}/>
            <TextField required variant="standard" label="Grade" inputProps={{ readOnly: true }} defaultValue={viewDocDialogRow.dg}/>
            </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>

<br/>

      <Typography paragraph variant="h5">
      <center>Informations Co-Directeur de thèse</center>
      </Typography>
      <List disablePadding> 
        <Bordered disableVerticalPadding disableBorderRadius>
          <ListItem  disableGutters className="listItemLeftPadding">
            <ListItemText>
            <div>
            <TextField required variant="standard" label="Nom"  inputProps={{ readOnly: true }} defaultValue={ viewDocDialogRow.cdn}/>
            <TextField required variant="standard" label="Prénom"  inputProps={{ readOnly: true }} defaultValue={ viewDocDialogRow.cdp}/>
            <TextField required variant="standard" label="Grade" inputProps={{ readOnly: true }} defaultValue={ viewDocDialogRow.cdg}/>
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
              <Button onClick={handleViewDocDialogClose}>
                Retour
              </Button>
            </Box>
          </Fragment>
        }
          />

      <Box width="100%">
              <div className={classes.tableWrapper}>
                  {docto.length > 0 ? (
                      <Table aria-labelledby="tableTitle">
                          <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={docto.length}
                              rows={rows} />
                          <TableBody>
                              {stableSort(docto, getSorting(order, orderBy))
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
                                          {row.email}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                          {row.ac}
                                          </TableCell>   
                                          <TableCell component="th" scope="row">
                                              {row.dtss}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              <Box display="flex" justifyContent="flex-end">
                                                  <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => {
                                                        handleViewDocDialogOpen(row);
                                                    } }
                                                      aria-label="View"
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
                             Pas encore de doctorant créer.
                          </HighlightedInformation>
                      </Box>
                  )}
              </div>
              <div className={classes.alignRight}>
                  <TablePagination
                      component="div"
                      count={docto.length}
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
                          actions: docto.length > 0 ? classes.dBlock : classes.dNone,
                          caption: docto.length > 0 ? classes.dBlock : classes.dNone,
                      }}
                      labelRowsPerPage="" />
              </div>
          </Box>
    </Paper>
  );
}

DoctoContent.propTypes = {
  classes: PropTypes.object.isRequired,
  docto: PropTypes.arrayOf(PropTypes.object).isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(DoctoContent);