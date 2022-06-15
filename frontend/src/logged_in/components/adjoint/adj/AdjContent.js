import React, { useState, useCallback , useContext} from "react";
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
 } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import UserContext from "../../../../shared/components/UserContext";
import DownloadIcon from '@mui/icons-material/Download';
import EnhancedTableHead from "../../../../shared/components/EnhancedTableHead";
import stableSort from "../../../../shared/functions/stableSort";
import getSorting from "../../../../shared/functions/getSorting";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import { saveAs } from 'file-saver';
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
    setAdj,
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
      saveAs(pdfBlob, 'Fiche de Réinscription.pdf')
    }
  );
     axios.post('http://localhost:5000/users/creates-pdf',
      row
       ).then(() => 
     axios.get('http://localhost:5000/users/gets-pdf', { responseType: 'blob' }))
     .then((res) => { 
      const pdfsBlob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(pdfsBlob, 'Attestation Inscription.pdf')
    }
     );
    },
    []
  );

  const { userData } = useContext(UserContext);

  const [searched, setSearched] = useState("");

  const onChangeSearch = useCallback(
    (searchVal) => {
      
      axios.get("http://localhost:5000/users/secdoc").then(function (response) {
        const doclist = response.data.doc;
        const avlist = response.data.avnc;
        const enslist = response.data.ens;
        const adj = [];
        for (let i = 0; i < doclist.length; i += 1) {
          const randomdoc = doclist[i];
          if(userData.user.dept === randomdoc.dept)
          {
          for (let j = 0; j < avlist.length; j += 1) {     
          const randomav = avlist[j]; 
          if(randomdoc.username === randomav.usernamedoc)
          {
            if(randomav.status === true)
            {
              for (let z = 0; z < enslist.length; z += 1) {
                const randomDens = enslist[z]; 
                if ((randomdoc.dirnom === enslist[z].ensnom) && (randomdoc.dirprenom === enslist[z].ensprenom))
                {  
              for (let k = 0; k < enslist.length; k += 1) {
                const randomCens = enslist[k]; 
                if ((randomdoc.codirnom === enslist[k].ensnom) && (randomdoc.codirprenom === enslist[k].ensprenom))
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
          intit: randomdoc.intithe,
          ds:   randomdoc.datesout,
          dn:   randomdoc.dirnom,
          dp:   randomdoc.dirprenom,
          dg:   randomdoc.dirgrade,
          dmail:randomDens.ensmail,
          dnum:randomDens.ensnumtel,
          dlt:randomDens.enslaborata,
          detab:randomDens.ensetabori,
          cdmail:randomCens.ensmail,
          cdnum:randomCens.ensnumtel,
          cdlt:randomCens.enslaborata,
          cdetab:randomCens.ensetabori,
          cdn:  randomdoc.codirnom,
          cdp:  randomdoc.codirprenom,
          cdg:  randomdoc.dirgrade,    
          anac: randomav.aneactu,
          datesou: randomav.datesout,
          etv: randomav.etav,
          pctv: randomav.pctav,
          dep:userData.user.dept,
          };
          adj.push(target);
        }
      } }
    } }
        } }
      }

  }

    }
    setAdj(adj);
  })
    .catch(function (error) {
      console.log(error);
    });

    },
    [setAdj]
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
        <Typography variant="h6">Liste des Doctorants Activés</Typography>
        <SearchBar
          placeholder="Search..."
          value={searched}
          onChange={(searchVal) => onChangeSearch(searchVal)}
          onClear={() => cancelSearch()}
        />
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
                                                      onClick={() =>
                                                       getindice(row)}
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
