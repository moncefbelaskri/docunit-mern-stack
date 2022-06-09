import React, { useState, useCallback,useRef , useContext} from "react";
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
import UserContext from "../../../../shared/components/UserContext"; 
import EnhancedTableHead from "../../../../shared/components/EnhancedTableHead";
import stableSort from "../../../../shared/functions/stableSort";
import Switch from '@mui/material/Switch';
import getSorting from "../../../../shared/functions/getSorting";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import ConfirmationDialog from "../../../../shared/components/ConfirmationDialog";
import TextareaAutosize from 'react-textarea-autosize';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchBar from 'search-bar-react';

const axios = require('axios');

const styles = (theme) => ({
  Highlight:{
    textAlign: 'center',
    marginLeft:theme.spacing(-1),
    padding: '3',
    width:390,
  },
  Area:{
    marginLeft:theme.spacing(1),
    color: 'black',
    padding: '0 22px',
    fontSize: '17px',
    width:355,
  },
  date:{
    marginLeft:theme.spacing(1),
    padding: '0 22px',
    height:40,
    width:355,
  },
  rang:{
    marginLeft:theme.spacing(1),
    width:355,
  },
  cent:{
    paddingLeft: '90px',
  },
  centt:{
    paddingLeft: '60px',
  },
  centtt:{
    paddingLeft: '0px',
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
  const { userData } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [isEtavDialogOpen, setIsEtavDialogOpen] = useState(
    false
  );
  const [searched, setSearched] = useState("");
  const [value, setValue] = React.useState(0);
  const [EtavDialogRow, setEtavDialogRow] = useState(null);
  const [isEtavLoading, setIsEtavLoading] = useState(false);
  const [,setChecked] = React.useState();
  
  const [Date, setDate] = useState();
  const [Etat, setEtat] = useState();
  const [Usern, setUsern] = useState();
  
  const handleChange = (row) => {
    setChecked(row.status);
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

  const handleEtavDialogClose = useCallback(() => {
    setIsEtavDialogOpen(false);
  }, [setIsEtavDialogOpen]);

  const handleEtavDialogOpen = useCallback(
    (row) => {
      setUsern(row.username);
      setIsEtavDialogOpen(true);
      setEtavDialogRow(row);
      setValue(row.etav);
      setDate(row.datesout);
      setEtat(row.etatavan);
      
    },
    [setIsEtavDialogOpen, setEtavDialogRow , setUsern ,setValue ,setEtat ,setDate]
  );

  const onChangeSearch = useCallback(
    (searchVal) => {

      axios.get("http://localhost:5000/users/secdoc").then(function (response) {

        const doclist1 = response.data.doc;
        const doclist2 = response.data.avnc;
        const dirt = [];
        for (let i = 0; i < doclist1.length; i += 1) {
          const randomdoc = doclist1;
          if(userData.user.dept === randomdoc[i].dept)
          {
            if(((userData.user.ensnom === randomdoc[i].dirnom) && (userData.user.ensprenom === randomdoc[i].dirprenom))
            ||((userData.user.ensnom === randomdoc[i].codirnom) && (userData.user.ensprenom === randomdoc[i].codirprenom)))
            {
          for (let j = 0; j < doclist2.length; j += 1) {     
          const randomdoc2 = doclist2; 
          if(doclist1[i].username === doclist2[j].usernamedoc)
          {
            if((doclist1[i].nom.toLowerCase().includes(searchVal.toLowerCase())) || (doclist1[i].prenom.toLowerCase().includes(searchVal.toLowerCase())) ){
              
            const target = {
            id: i,
            _id : randomdoc[i]._id,
            nom: randomdoc[i].nom,
            prénom:  randomdoc[i].prenom,
            intit:  randomdoc[i].intithe,
            etav: randomdoc2[j].pctav,
            aneactu : randomdoc2[j].aneactu,
            etatavan: randomdoc2[j].etav,
            datesout: randomdoc2[j].datesout,
            username: randomdoc2[j].usernamedoc,
            status : randomdoc2[j].status,
          };
          dirt.push(target);
          }
        }
        }
      }
    }
        }
        setDirt(dirt);
        
      })
      .catch(function (error) {
        console.log(error);
      });
      
    },
    [setDirt]
  );

  const cancelSearch = useCallback(
    () => {
      setSearched("");
      onChangeSearch(searched);
    },
    [setSearched]
  );


  const toggleDirt = useCallback(
    (row) => {
      const _dirt = [...dirt];
      const index = _dirt.findIndex((element) => element.id === row.id);
      row.status = !row.status;
      _dirt[index] = row;
      if (row.status) {
         axios.put("http://localhost:5000/users/update/avancstatus/"+ row.username,
        {
          status: true,
      },{headers: {"Content-Type": "application/json",}})
      .then((response) => {
        pushMessageToSnackbar({
          text: "Doctorant activé",
        });
      }).catch((error) => {});

      } else {
        axios.put("http://localhost:5000/users/update/avancstatus/"+ row.username,
        {
          status: false,
      },{headers: {"Content-Type": "application/json",}})
      .then((response) => {
        pushMessageToSnackbar({
          text: "Doctorant desactivé",
        });
        
      }).catch((error) => {});

      }
      setDirt(_dirt);
    },
    [pushMessageToSnackbar, dirt, setDirt]
  );


  const updateAvnc = useCallback( async() => {
    
    setIsEtavDialogOpen(true);
      setIsEtavLoading(true);
      await axios.put("http://localhost:5000/users/update/avancdoc/"+ Usern,
      {
        pctav: Avancementpct.current.value,
        datesout: Avancementdatesout.current.value,
        etav: Avancementetav.current.value,
    },{headers: {"Content-Type": "application/json",}})
    .then((response) => {
      setIsEtavDialogOpen(true);
      setIsEtavLoading(true);

      axios.get("http://localhost:5000/users/secdoc").then(function (response) {

      const doclist1 = response.data.doc;
      const doclist2 = response.data.avnc;
      const dirt = [];

      for (let i = 0; i < doclist1.length; i += 1) {
        const randomdoc = doclist1;
        if(userData.user.dept === randomdoc[i].dept)
        {
          if(((userData.user.ensnom === randomdoc[i].dirnom) && (userData.user.ensprenom === randomdoc[i].dirprenom))
          ||((userData.user.ensnom === randomdoc[i].codirnom) && (userData.user.ensprenom === randomdoc[i].codirprenom)))
          {
        for (let j = 0; j < doclist2.length; j += 1) {     
        const randomdoc2 = doclist2; 
        if(doclist1[i].username === doclist2[j].usernamedoc)
        {
          const target = {
          id: i,
          _id : randomdoc[i]._id,
          nom: randomdoc[i].nom,
          prénom:  randomdoc[i].prenom,
          intit:  randomdoc[i].intithe,
          etav: randomdoc2[j].pctav,
          aneactu : randomdoc2[j].aneactu,
          etatavan: randomdoc2[j].etav,
          datesout: randomdoc2[j].datesout,
          username: randomdoc2[j].usernamedoc,
          status : randomdoc2[j].status,
        };
        dirt.push(target);
        }
      }
    }
  }
      }
      setDirt(dirt);
      
    })
    .catch(function (error) {
      console.log(error);
    });

      setTimeout(() => {
        setIsEtavDialogOpen(false);
        setIsEtavLoading(false);
        pushMessageToSnackbar({
          text: "Avancement validé",
        });
      
      
        
      }, 1500);
    }).catch((error) => {
     
  });
  }, [setIsEtavDialogOpen,setDirt,setUsern,Usern,setValue,value,setIsEtavLoading,pushMessageToSnackbar,Avancementpct,Avancementdatesout,Avancementetav]);


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

           ref={Avancementpct}
           
           />

            </div>
            <br/>
            <div>
            <Typography>
            Date prévue de soutenance
            </Typography>
            <br/>
              <input className={classes.date} type="date" required  defaultValue={Date} ref={Avancementdatesout}/>
            </div>
            <br/>
            <div>
            <Typography>
            Etat d'avancement
            </Typography>  
            <br/>
              <TextareaAutosize className={classes.Area} aria-label="Etatav" required defaultValue={Etat} minRows={7} maxRows={7}   ref={Avancementetav}/>
            </div>
            <br/>
          </Box>
          </form>
          ) : null}
          onClose={handleEtavDialogClose}
          onConfirm={() => {
            updateAvnc();
          } }
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
                                          <TableCell component="th" scope="row" >
                                          {row.etav } %
                                          </TableCell>
                                          <TableCell component="th" scope="row" >
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
                                                      <SettingsIcon className={classes.blackIcon} />
                                                  </IconButton>
                                                  {row.status ? (
                                                    <Switch
                                                    color="secondary"
                                                    checked={true}
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
                                                    checked={false}
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