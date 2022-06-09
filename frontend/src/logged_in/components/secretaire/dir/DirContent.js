import React, { useState, useCallback , useContext, useRef, Fragment } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EnhancedTableHead from "../../../../shared/components/EnhancedTableHead";
import stableSort from "../../../../shared/functions/stableSort";
import getSorting from "../../../../shared/functions/getSorting";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import UserContext from "../../../../shared/components/UserContext";
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";
import ConfirmationDialogg from "../../../../shared/components/ConfirmationDialogg";
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityPasswordTextField from "../../../../shared/components/VisibilityPasswordTextField";
import TextField from '@mui/material/TextField';
import Bordered from "../../../../shared/components/Bordered";
import ButtonCircularProgress from "../../../../shared/components/ButtonCircularProgress";
import SearchBar from 'search-bar-react';

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
    label: "Adresse email",
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
    onClose,
    classes,
    onFormSubmit,
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
 

  const [isDeleteDirDialogOpen, setIsDeleteDirDialogOpen] = useState(false);
  const [deleteDirDialogRow, setDeleteDirDialogRow] = useState(null);
  const [isDeleteDirLoading, setIsDeleteDirLoading] = useState(false);
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

  const [isCreateDirDialogOpen, setIsCreateDirDialogOpen] = useState(false);
  const [isCreateDirLoading, setIsCreateDirLoading] = useState(false);
  const { userData } = useContext(UserContext);
  const EnsNom = useRef();
  const EnsPrenom = useRef();
  const EnsGrade = useRef();
  const EnsEtabori = useRef();
  const EnsLaborata = useRef();
  const EnsNumtel = useRef();
  const EnsMail = useRef();
  const EnsName = useRef();
  const EnsPassword = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  var existed = null;
  const handleCreateDirDialogClose = useCallback(() => {
    setIsCreateDirDialogOpen(false);
  }, [setIsCreateDirDialogOpen]);

  const handleCreateDirDialogOpen = useCallback(
    () => {

      setIsCreateDirDialogOpen(true);
    },
    [setIsCreateDirDialogOpen]
  );
  const formuens = useCallback( async () => {
    
    setIsCreateDirLoading(true);
        await axios.post("http://localhost:5000/users/register_ens",
      {
       ensnom: EnsNom.current.value,
       ensprenom: EnsPrenom.current.value,
       ensgrade: EnsGrade.current.value,
       ensetabori: EnsEtabori.current.value,
       enslaborata: EnsLaborata.current.value,
       ensnumtel: EnsNumtel.current.value,  
       ensmail: EnsMail.current.value,
       ensusername: EnsName.current.value,
       enspassword: EnsPassword.current.value,
       ensdept : userData.user.dept,
     }
      ,{headers: {"Content-Type": "application/json",}})          
     .then(() => {
       // Success 🎉
   }).catch((error) => {
     if(error.response.data.msg === "enseignant existe déjà.")
          {
            setIsCreateDirLoading(false);
           pushMessageToSnackbar({
             text: "Enseignant existe déjà",
           });
           existed = "yes";
           setIsCreateDirLoading(false);
         }
 });    
 if(existed !== "yes") {
  setIsCreateDirLoading(true);
  
setTimeout(() => {
  
  pushMessageToSnackbar({
      text: "ajouté avec succès",
  });
  window.location.reload(false);
  }, 10);

}          
      },[ setIsCreateDirLoading,pushMessageToSnackbar,onClose,EnsNom,EnsPrenom,EnsGrade,EnsEtabori,EnsLaborata,EnsNumtel,EnsMail,EnsName,EnsPassword]);
   
    
  const handleUpload = useCallback(async () => {
    setIsCreateDirLoading(true);
    if(EnsNom.current.value === "" ||
    EnsPrenom.current.value === "" ||
    EnsGrade.current.value === "" ||
    EnsEtabori.current.value === "" ||
    EnsLaborata.current.value === "" ||
    EnsNumtel.current.value === "" ||
    EnsName.current.value === "" ||
    EnsPassword.current.value === "" ||
    EnsMail.current.value === ""
    ) {
      setIsCreateDirLoading(false);  
    }
    else{

    formuens();
    
  }
  
  }, [setIsCreateDirLoading , onClose, pushMessageToSnackbar]);


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
  

  const [isUpdateDirDialogOpen, setIsUpdateDirDialogOpen] = useState(false);
  const [updateDirDialogRow, setUpdateDirDialogRow] = useState(null);
  const [isUpdateDirLoading, setIsUpdateDirLoading] = useState(false);
  const [Id, setId] = useState();

  const handleUpdateDirDialogClose = useCallback(() => {
    setIsUpdateDirDialogOpen(false);
  }, [setIsUpdateDirDialogOpen]);

  const handleUpdateDirDialogOpen = useCallback(
    (row) => {
      setIsUpdateDirDialogOpen(true);
      setUpdateDirDialogRow(row);
      setId(row._id);
    },
    [setIsUpdateDirDialogOpen,setUpdateDirDialogRow]
  );

  const formuenss = useCallback( async () => {
    
    setIsUpdateDirLoading(true);
    await axios.put("http://localhost:5000/users/update/ens/" +Id,
  {
    ensnom: EnsNom.current.value,
   ensprenom: EnsPrenom.current.value,
   ensgrade: EnsGrade.current.value,
   ensetabori: EnsEtabori.current.value,
   enslaborata: EnsLaborata.current.value,
   ensnumtel: EnsNumtel.current.value,  
   ensmail: EnsMail.current.value,
   ensusername: EnsName.current.value,
   enspassword: EnsPassword.current.value,
   ensdept : userData.user.dept,
 }
  ,{headers: {"Content-Type": "application/json",}})          
 .then(() => {
   // Success 🎉
}).catch((error) => {
 if(error.response.data.msg === "enseignant existe déjà.")
      {
        setIsUpdateDirLoading(false);
       pushMessageToSnackbar({
         text: "Enseignant existe déjà",
       });
       existed = "yes";
       setIsUpdateDirLoading(false);
     }
});    
if(existed !== "yes") {
  setIsUpdateDirLoading(true);

setTimeout(() => {

pushMessageToSnackbar({
  text: "modifié avec succès",
});
window.location.reload(false);
}, 10);

}          
  },[ setIsUpdateDirLoading,pushMessageToSnackbar,onClose,EnsNom,EnsPrenom,EnsMail,EnsName,EnsPassword]);


const handleUploadd = useCallback(async () => {
  setIsUpdateDirLoading(true);
if(EnsNom.current.value === "" ||
EnsPrenom.current.value === "" ||
EnsGrade.current.value === "" ||
EnsEtabori.current.value === "" ||
EnsLaborata.current.value === "" ||
EnsNumtel.current.value === "" ||
EnsName.current.value === "" ||
EnsPassword.current.value === "" ||
EnsMail.current.value === ""
) {
  setIsUpdateDirLoading(false);
  
}
else{

formuenss();

}

}, [setIsUpdateDirLoading , onClose, pushMessageToSnackbar]);


const [searched, setSearched] = useState("");

const onChangeSearch = useCallback(
  (searchVal) => {

   axios.get("http://localhost:5000/users/secens").then(function (response) {
      const enslist = response.data;
    const dirs = [];
    for (let i = 0; i < enslist.length; i += 1) {
      const randomens = enslist[i];
      if(userData.user.dept === randomens.ensdept){
        if((enslist[i].ensnom.toLowerCase().includes(searchVal.toLowerCase())) || (enslist[i].ensprenom.toLowerCase().includes(searchVal.toLowerCase())) ){
      const targett = {
        id: i, 
        _id : randomens._id,
        nom: randomens.ensnom,
        prénom:  randomens.ensprenom,
        eg: randomens.ensgrade,
        eeb: randomens.ensetabori,
        elr: randomens.enslaborata,
        en: randomens.ensnumtel,
        ndc:  randomens.ensusername,
        mdp:  randomens.enspassword,
        email: randomens.ensmail,
      };
      dirs.push(targett);
     } }
    }
    setDirs(dirs);
  })
  .catch(function (error) {
    console.log(error);
  });
  },
  [setDirs]
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
        <Typography variant="h6">Liste des Enseignants</Typography>
        <SearchBar
          placeholder="Search..."
          value={searched}
          onChange={(searchVal) => onChangeSearch(searchVal)}
          onClear={() => cancelSearch()}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateDirDialogOpen}
          disableElevation
        >
         <center> Ajouter Enseignant</center>
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
          loading={isDeleteDirLoading} 
          />
          <ConfirmationDialogg
          open={isCreateDirDialogOpen}
          title="Création d'un Enseignant"
          content={
            <form onSubmit={onFormSubmit}>
            <Box
            sx={{
          '& .MuiTextField-root': { m: 1, width: '29.5ch' },
        }}
        
        
      >
        <Typography paragraph variant="h5">      
        <center> Informations Personnelle</center>
        </Typography>
        <List disablePadding> 
          <Bordered disableVerticalPadding disableBorderRadius>
            <ListItem  disableGutters className="listItemLeftPadding">
              <ListItemText>
              <div>
              <TextField required variant="outlined" label="Nom" inputRef={EnsNom}/>
              <TextField required variant="outlined" label="Prénom" inputRef={EnsPrenom}/>                          
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
              <TextField required variant="outlined" label="N° de téléphone " name="phone"  inputRef={EnsNumtel}/>
              <TextField  required variant="outlined" label="Email" name="email" type="email" inputRef={EnsMail}/>
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
              <TextField required variant="outlined" label="Grade" inputRef={EnsGrade}/>
              <TextField required variant="outlined" label="Etablissement d'origine" inputRef={EnsEtabori}/>
              <TextField required variant="outlined" label="Laboratoire de rattachement" inputRef={EnsLaborata}/>
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
              <TextField required variant="outlined" label="Nom de compte" inputRef={EnsName}/>
              <VisibilityPasswordTextField
                variant="outlined"
                margin="normal"
                required
                label="Mot de passe"
                inputRef={EnsPassword}
                onVisibilityChange={setIsPasswordVisible}
                isVisible={isPasswordVisible}
              />        
              </div>
              </ListItemText>
            </ListItem>          
          </Bordered>
        </List>
         
      </Box>
      </form>
          }
        actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={handleCreateDirDialogClose} disabled={isCreateDirLoading}>
                Retour
              </Button>
            </Box>
            <Button
              type="submit" 
              variant="contained"
              color="secondary"
              disabled={isCreateDirLoading}
              onClick={handleUpload}
            >
              Valider {isCreateDirLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
          />
          
          <ConfirmationDialogg
          open={isViewDirDialogOpen}
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
            <TextField required variant="standard" label="Grade" inputProps={{ readOnly: true }} defaultValue={viewDirDialogRow.eg}/>
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
          
          <ConfirmationDialogg
          open={isUpdateDirDialogOpen}
          title="Modification d'un Enseignant"
          content={updateDirDialogRow ? (
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
            <TextField required variant="outlined" label="Nom"  defaultValue={updateDirDialogRow.nom} inputRef={EnsNom}/>
            <TextField required variant="outlined" label="Prénom"  defaultValue={updateDirDialogRow.prénom} inputRef={EnsPrenom}/>                               
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
            <TextField required variant="outlined" label="N° de téléphone " name="phone"   defaultValue={updateDirDialogRow.en} inputRef={EnsNumtel}/>
            <TextField  required variant="outlined" label="Email" name="email" type="email"  defaultValue={updateDirDialogRow.email}inputRef={EnsMail}/>
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
            <TextField required variant="outlined" label="Grade"  defaultValue={updateDirDialogRow.eg} inputRef={EnsGrade}/>
            <TextField required variant="outlined" label="Etablissement d'origine"  defaultValue={updateDirDialogRow.eeb} inputRef={EnsEtabori}/>
            <TextField required variant="outlined" label="Laboratoire de rattachement"  defaultValue={updateDirDialogRow.elr} inputRef={EnsLaborata}/>
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
            <TextField required variant="outlined" label="Nom de compte"  defaultValue={updateDirDialogRow.ndc}  inputRef={EnsName}/>
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              label="Mot de passe"
              defaultValue={updateDirDialogRow.mdp} 
              inputRef={EnsPassword}
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
              <Button onClick={handleUpdateDirDialogClose} disabled={isUpdateDirLoading}>
                Retour
              </Button>
            </Box>
            <Button
              type="submit" 
              variant="contained"
              color="secondary"
              disabled={isUpdateDirLoading}
              onClick={handleUploadd}
            >
              Valider {isUpdateDirLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
            />

          <Box width="100%">
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
                                                        handleViewDirDialogOpen(row);
                                                    } }
                                                      aria-label="View"
                                                      size="large">
                                                      <RemoveRedEyeIcon className={classes.blackIcon} />
                                                  </IconButton>
                                                  <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => {
                                                        handleUpdateDirDialogOpen(row);
                                                    } }
                                                      aria-label="Update"
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
  classes: PropTypes.object.isRequired,
  dirs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDirs: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(DirContent);