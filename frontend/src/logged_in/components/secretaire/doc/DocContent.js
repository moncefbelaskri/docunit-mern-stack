import React, { useState, useCallback, useContext, Fragment, useRef } from "react";
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
import MenuItem from '@mui/material/MenuItem';
import SearchBar from 'search-bar-react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';

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

const currencies = [
  {
    value: 'sal',
    label: 'Salarié(e)',
  },
  {
    value: 'nonsal',
    label: 'Non Salarié(e)',
  },
];

const currencies2 = [
  {
    value: 'sci',
    label: 'Doctorat en Sciences',
  },
  {
    value: 'lmd',
    label: 'Doctorat en LMD',
  },
];
const currencies3 = [
  {
    value: 'mag',
    label: 'Magister',
  },
  {
    value: 'mas',
    label: 'Master',
  },
  {
    value: 'au',
    label: 'Autre',
  },
];

const rowsPerPage = 25;

function DocContent(props) {
  const {
    pushMessageToSnackbar,
    setDocs,
    docs,
    onClose,
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

  const [isDeleteDocDialogOpen, setIsDeleteDocDialogOpen] = useState(
    false
  );
  const [deleteDocDialogRow, setDeleteDocDialogRow] = useState(null);
  const [isDeleteDocLoading, setIsDeleteDocLoading] = useState(false);
  
  const deleteDoc = useCallback(() => {
    setIsDeleteDocLoading(true);
    setTimeout(() => {
      setIsDeleteDocDialogOpen(false);
      setIsDeleteDocLoading(false);
      const _docs = [...docs];
      const index = _docs.findIndex(
        (element) => element.id === deleteDocDialogRow.id
      );
      axios.delete(
        "http://localhost:5000/users/deletedoc",
        {
          headers: {
            "x-delete": _docs[index].ndc ,
          },
        }
      );
      _docs.splice(index, 1);
      setDocs(_docs);
      pushMessageToSnackbar({
        text: "supprimé avec succès",
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
  
  const [isCreateDocDialogOpen, setIsCreateDocDialogOpen] = useState(false);
  const [isCreateDocLoading, setIsCreateDocLoading] = useState(false);
  const { userData } = useContext(UserContext);
  const DoctorantNom = useRef();
  const DoctorantPrenom = useRef();
  const DoctorantDateN = useRef();
  const DoctorantLieuN = useRef();
  const DoctorantAdresse = useRef();
  const DoctorantNumtel = useRef();
  const DoctorantMail = useRef();
  const DoctorantEtapro = useRef();
  const DoctorantAnebac = useRef();
  const DoctorantSeribac = useRef();
  const DoctorantNumbac = useRef();
  const DoctorantCatdoc = useRef();
  const DoctorantDerdip = useRef();
  const DoctorantSpederdip = useRef();
  const DoctorantDatederdip = useRef();
  const DoctorantDatepremdoc = useRef();
  const DoctorantSpedoc = useRef();
  const DoctorantLaborata = useRef();
  const DoctorantIntithe = useRef();
  const DoctorantPreci = useRef();
  const DoctorantPrecii = useRef();
  const DoctorantName = useRef();
  const DoctorantPassword = useRef();
  const DoctorantdirNom = useRef();
  const DoctorantdirPrenom = useRef();
  const DoctorantdirGrade = useRef();
  const DoctorantcodirNom = useRef();
  const DoctorantcodirPrenom = useRef();
  const DoctorantcodirGrade = useRef();
  const [,setTypedoc] = React.useState('');
  const [etapro, setEtapro] = React.useState('');
  const [derdip, setDerdip] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const handleChangeTypedoc = (event) => {   
    setTypedoc(event.target.value);
  };
  const handleChangeEtapro = (event) => {   
    setEtapro(event.target.value);
  };
  const handleChangeDerdip = (event) => {   

    setDerdip(event.target.value);
  };

  const handleCreateDocDialogClose = useCallback(() => {
    setIsCreateDocDialogOpen(false);
  }, [setIsCreateDocDialogOpen]);

  const handleCreateDocDialogOpen = useCallback(
    () => {

      setIsCreateDocDialogOpen(true);
    },
    [setIsCreateDocDialogOpen]
  );
  const formudoc = useCallback( async () => {

    setIsCreateDocLoading(true);

    if(DoctorantEtapro.current.value === "sal" && DoctorantDerdip.current.value === "au")
          {
             await axios.post("http://localhost:5000/users/register_doc",
           {
            nom: DoctorantNom.current.value,
            prenom: DoctorantPrenom.current.value,
            username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
            dateN: DoctorantDateN.current.value,
            lieuN: DoctorantLieuN.current.value,
            adresse: DoctorantAdresse.current.value,
            numtel: DoctorantNumtel.current.value,
            mail: DoctorantMail.current.value,
            etapro: DoctorantEtapro.current.value,
            preci: DoctorantPreci.current.value,
            anebac: DoctorantAnebac.current.value,
            seribac: DoctorantSeribac.current.value,
            numbac: DoctorantNumbac.current.value,
            dept : userData.user.dept,
            catdoc:DoctorantCatdoc.current.value,
            derdip: DoctorantDerdip.current.value,
            precii: DoctorantPrecii.current.value,
            spederdip: DoctorantSpederdip.current.value,
            datederdip: DoctorantDatederdip.current.value,
            datepremdoc: DoctorantDatepremdoc.current.value,
            spedoc: DoctorantSpedoc.current.value,
            laborata: DoctorantLaborata.current.value,
            intithe: DoctorantIntithe.current.value,
            dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,

          }
           ,{headers: {"Content-Type": "application/json",}})
           .then((response) => {
            // Success 🎉
      axios.get("http://localhost:5000/users/secdoc").then(function (response) {
      const doclist = response.data.doc;
      const docs = [];
      for (let i = 0; i < doclist.length; i += 1) {
        const randomdoc = doclist[i];
        if(userData.user.dept === randomdoc.dept){
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
          dn:   randomdoc.dirnom,
          dp:   randomdoc.dirprenom,
          dg:   randomdoc.dirgrade,
          cdn:  randomdoc.codirnom,
          cdp:  randomdoc.codirprenom,
          cdg:  randomdoc.dirgrade,
        };
        docs.push(target);
      } 
      }
      setDocs(docs);
    })
                     
            setIsCreateDocLoading(true);
  
        }).catch((error) => {
          if(error.response.data.msg === "doctorant existe déjà.")
               {
                setIsCreateDocLoading(false);
                pushMessageToSnackbar({
                  text: "doctorant existe déjà",
                });
                setIsCreateDocLoading(false);
                }
      });
      
      setIsCreateDocLoading(false);
      setIsCreateDocDialogOpen(false);       
      setTimeout(() => {
       
       pushMessageToSnackbar({
           text: "ajouté avec succès",
       });
       }, 10);

          }

    else if(DoctorantEtapro.current.value === "sal" && DoctorantDerdip.current.value !== "au")
             {
               await axios.post("http://localhost:5000/users/register_doc",
               {
                nom: DoctorantNom.current.value,
                prenom: DoctorantPrenom.current.value,
                username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
                dateN: DoctorantDateN.current.value,
                lieuN: DoctorantLieuN.current.value,
                adresse: DoctorantAdresse.current.value,
                numtel: DoctorantNumtel.current.value,
                mail: DoctorantMail.current.value,
                etapro: DoctorantEtapro.current.value,
                preci: DoctorantPreci.current.value,
                anebac: DoctorantAnebac.current.value,
                seribac: DoctorantSeribac.current.value,
                numbac: DoctorantNumbac.current.value,
                dept: userData.user.dept,
                catdoc:DoctorantCatdoc.current.value,
                derdip: DoctorantDerdip.current.value,
                spederdip: DoctorantSpederdip.current.value,
                datederdip: DoctorantDatederdip.current.value,
                datepremdoc: DoctorantDatepremdoc.current.value,
                spedoc: DoctorantSpedoc.current.value,
                laborata: DoctorantLaborata.current.value,
                intithe: DoctorantIntithe.current.value,         
                dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,
        
              }
               ,{headers: {"Content-Type": "application/json",},})
               .then((response) => {
                // Success 🎉
                axios.get("http://localhost:5000/users/secdoc").then(function (response) {
                  const doclist = response.data.doc;
                  const docs = [];
                  for (let i = 0; i < doclist.length; i += 1) {
                    const randomdoc = doclist[i];
                    if(userData.user.dept === randomdoc.dept){
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
                      dn:   randomdoc.dirnom,
                      dp:   randomdoc.dirprenom,
                      dg:   randomdoc.dirgrade,
                      cdn:  randomdoc.codirnom,
                      cdp:  randomdoc.codirprenom,
                      cdg:  randomdoc.dirgrade,
                    };
                    docs.push(target);
                  } 
                  }
                  setDocs(docs);
                })         

                setIsCreateDocLoading(true);
  
            }).catch((error) => {
              if(error.response.data.msg === "doctorant existe déjà.")
                   {
                    setIsCreateDocLoading(false);
                    pushMessageToSnackbar({
                      text: "doctorant existe déjà",
                    });
                    setIsCreateDocLoading(false);
                  }
          });

          setIsCreateDocLoading(false);
          setIsCreateDocDialogOpen(false);       
          setTimeout(() => {
           
           pushMessageToSnackbar({
               text: "ajouté avec succès",
           });
           }, 10);

             }
      else if(DoctorantEtapro.current.value !== "sal" && DoctorantDerdip.current.value === "au")
             {
          await axios.post("http://localhost:5000/users/register_doc",
            {  
              nom: DoctorantNom.current.value,
      prenom: DoctorantPrenom.current.value,
      username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
      dateN: DoctorantDateN.current.value,
      lieuN: DoctorantLieuN.current.value,
      adresse: DoctorantAdresse.current.value,
      numtel: DoctorantNumtel.current.value,
      mail: DoctorantMail.current.value,
      etapro: DoctorantEtapro.current.value,
      anebac: DoctorantAnebac.current.value,
      seribac: DoctorantSeribac.current.value,
      numbac: DoctorantNumbac.current.value,
      dept: userData.user.dept,
      catdoc:DoctorantCatdoc.current.value,
      derdip: DoctorantDerdip.current.value,
      precii: DoctorantPrecii.current.value,
      spederdip: DoctorantSpederdip.current.value,
      datederdip: DoctorantDatederdip.current.value,
      datepremdoc: DoctorantDatepremdoc.current.value,
      spedoc: DoctorantSpedoc.current.value,
      laborata: DoctorantLaborata.current.value,
      intithe: DoctorantIntithe.current.value,
      dirnom: DoctorantdirNom.current.value,
      dirprenom: DoctorantdirPrenom.current.value,
      dirgrade:  DoctorantdirGrade.current.value,
      codirnom: DoctorantcodirNom.current.value,
      codirprenom: DoctorantcodirPrenom.current.value,
      codirgrade: DoctorantcodirGrade.current.value,
         } 
               ,{headers: {"Content-Type": "application/json",},})
               .then((response) => {
                // Success 🎉
                axios.get("http://localhost:5000/users/secdoc").then(function (response) {
                  const doclist = response.data.doc;
                  const docs = [];
                  for (let i = 0; i < doclist.length; i += 1) {
                    const randomdoc = doclist[i];
                    if(userData.user.dept === randomdoc.dept){
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
                      dn:   randomdoc.dirnom,
                      dp:   randomdoc.dirprenom,
                      dg:   randomdoc.dirgrade,
                      cdn:  randomdoc.codirnom,
                      cdp:  randomdoc.codirprenom,
                      cdg:  randomdoc.dirgrade,
                    };
                    docs.push(target);
                  } 
                  }
                  setDocs(docs);
                })         
                setIsCreateDocLoading(true);

            }).catch((error) => {
              if(error.response.data.msg === "doctorant existe déjà.")
                   {
                    setIsCreateDocLoading(false);
                      pushMessageToSnackbar({
                       text: "doctorant existe déjà",
                          });
                          setIsCreateDocLoading(false);
                  }
          });

          setIsCreateDocLoading(false);
          setIsCreateDocDialogOpen(false);       
          setTimeout(() => {
           
           pushMessageToSnackbar({
               text: "ajouté avec succès",
           });
           }, 10);
              }
      else 
        {
       await axios.post("http://localhost:5000/users/register_doc",
          {
            nom: DoctorantNom.current.value,
          prenom: DoctorantPrenom.current.value,
          username: DoctorantName.current.value,
          password: DoctorantPassword.current.value,
          dateN: DoctorantDateN.current.value,
          lieuN: DoctorantLieuN.current.value,
          adresse: DoctorantAdresse.current.value,
          numtel: DoctorantNumtel.current.value,
          mail: DoctorantMail.current.value,
          etapro: DoctorantEtapro.current.value,
          anebac: DoctorantAnebac.current.value,
          seribac: DoctorantSeribac.current.value,
          numbac: DoctorantNumbac.current.value,
          dept: userData.user.dept,
          catdoc:DoctorantCatdoc.current.value,
          derdip: DoctorantDerdip.current.value,
          spederdip: DoctorantSpederdip.current.value,
          datederdip: DoctorantDatederdip.current.value,
          datepremdoc: DoctorantDatepremdoc.current.value,
          spedoc: DoctorantSpedoc.current.value,
          laborata: DoctorantLaborata.current.value,
          intithe: DoctorantIntithe.current.value,
          dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,
          }
          ,
          {headers: {"Content-Type": "application/json",},})
          .then((response) => { 
            // Success 🎉
            axios.get("http://localhost:5000/users/secdoc").then(function (response) {
              const doclist = response.data.doc;
              const docs = [];
              for (let i = 0; i < doclist.length; i += 1) {
                const randomdoc = doclist[i];
                if(userData.user.dept === randomdoc.dept){
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
                  dn:   randomdoc.dirnom,
                  dp:   randomdoc.dirprenom,
                  dg:   randomdoc.dirgrade,
                  cdn:  randomdoc.codirnom,
                  cdp:  randomdoc.codirprenom,
                  cdg:  randomdoc.dirgrade,
                };
                docs.push(target);
              } 
              }
              setDocs(docs);
            })  
            setIsCreateDocLoading(true);

    
        }).catch((error) => {
          if(error.response.data.msg === "doctorant existe déjà.")
               {
                setIsCreateDocLoading(false);
                pushMessageToSnackbar({
                  text: "doctorant existe déjà",
                });
                setIsCreateDocLoading(false);
              }
      });

      setIsCreateDocLoading(false);
      setIsCreateDocDialogOpen(false);       
      setTimeout(() => {
       
       pushMessageToSnackbar({
           text: "ajouté avec succès",
       });
       }, 10);
        }     
    
      }
  ,[ setIsCreateDocLoading, setIsCreateDocDialogOpen ,pushMessageToSnackbar,onClose,DoctorantNom,DoctorantPrenom,DoctorantDateN,DoctorantLieuN,DoctorantAdresse,DoctorantNumtel,DoctorantMail,DoctorantEtapro,DoctorantPreci,DoctorantAnebac,DoctorantSeribac,DoctorantNumbac,DoctorantCatdoc,DoctorantDerdip,DoctorantPrecii,DoctorantSpederdip,DoctorantDatederdip,DoctorantDatepremdoc,DoctorantSpedoc,DoctorantLaborata,DoctorantIntithe,DoctorantName,DoctorantPassword
    ,DoctorantdirNom,DoctorantdirPrenom,DoctorantdirGrade,DoctorantcodirNom,DoctorantcodirPrenom,DoctorantcodirGrade]);

  const handleUpload = useCallback(async () => {
    setIsCreateDocLoading(true);
    if(DoctorantNom.current.value === "" ||
    DoctorantPrenom.current.value === "" ||
    DoctorantDateN.current.value === "" ||
    DoctorantLieuN.current.value === "" ||
    DoctorantAdresse.current.value === "" ||
    DoctorantNumtel.current.value === "" ||
    DoctorantMail.current.value === "" ||
    DoctorantEtapro.current.value === "" ||
    DoctorantAnebac.current.value === "" ||
    DoctorantSeribac.current.value === "" ||
    DoctorantNumbac.current.value === "" ||
    DoctorantCatdoc.current.value === "" ||
    DoctorantDerdip.current.value === "" ||
    DoctorantSpederdip.current.value === "" ||
    DoctorantDatederdip.current.value === "" ||
    DoctorantDatepremdoc.current.value === "" ||
    DoctorantSpedoc.current.value === "" ||
    DoctorantIntithe.current.value === "" ||
    DoctorantLaborata.current.value === "" ||   
    DoctorantName.current.value === "" ||
    DoctorantPassword.current.value === ""  ||
    DoctorantdirNom.current.value === ""  ||
    DoctorantdirPrenom.current.value === ""  ||
    DoctorantdirGrade.current.value === ""  ||
    DoctorantcodirNom.current.value === ""  ||
    DoctorantcodirPrenom.current.value === ""  ||
    DoctorantcodirGrade.current.value === ""  
    ) {     
      setIsCreateDocLoading(false);     
    }
    else if(DoctorantEtapro.current.value === "sal" && DoctorantPreci.current.value === "" )
      {
        setIsCreateDocLoading(false);     
      }
      else if(DoctorantDerdip.current.value === "au" && DoctorantPrecii.current.value === "" )
      {
        setIsCreateDocLoading(false);     
      }
    else{

    formudoc();
      
  }
  }, [setIsCreateDocLoading , onClose, pushMessageToSnackbar]);


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
  

  const [isUpdateDocDialogOpen, setIsUpdateDocDialogOpen] = useState(false);
  const [updateDocDialogRow, setUpdateDocDialogRow] = useState(null);
  const [isUpdateDocLoading, setIsUpdateDocLoading] = useState(false);
  const [Id, setId] = useState();
  const handleUpdateDocDialogClose = useCallback(() => {
    setIsUpdateDocDialogOpen(false);
  }, [setIsUpdateDocDialogOpen]);

  const handleUpdateDocDialogOpen = useCallback(
    (row) => {
      setId(row._id);
      setEtapro(row.ep);
      setDerdip(row.dd);
      setIsUpdateDocDialogOpen(true);
      setUpdateDocDialogRow(row);
      
    },
    [setIsUpdateDocDialogOpen,setUpdateDocDialogRow,setId,setEtapro,setDerdip]
  );

  const formudocc = useCallback( async () => {

    setIsUpdateDocLoading(true);

    if(DoctorantEtapro.current.value === "sal" && DoctorantDerdip.current.value === "au")
          {
            await axios.put("http://localhost:5000/users/update/doc/" + Id,
           {
            nom: DoctorantNom.current.value,
            prenom: DoctorantPrenom.current.value,
            username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
            dateN: DoctorantDateN.current.value,
            lieuN: DoctorantLieuN.current.value,
            adresse: DoctorantAdresse.current.value,
            numtel: DoctorantNumtel.current.value,
            mail: DoctorantMail.current.value,
            etapro: DoctorantEtapro.current.value,
            preci: DoctorantPreci.current.value,
            anebac: DoctorantAnebac.current.value,
            seribac: DoctorantSeribac.current.value,
            numbac: DoctorantNumbac.current.value,
            dept : userData.user.dept,
            catdoc:DoctorantCatdoc.current.value,
            derdip: DoctorantDerdip.current.value,
            precii: DoctorantPrecii.current.value,
            spederdip: DoctorantSpederdip.current.value,
            datederdip: DoctorantDatederdip.current.value,
            datepremdoc: DoctorantDatepremdoc.current.value,
            spedoc: DoctorantSpedoc.current.value,
            laborata: DoctorantLaborata.current.value,
            intithe: DoctorantIntithe.current.value,
            dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,

          }
           ,{headers: {"Content-Type": "application/json",}})
           .then((response) => {
            // Success 🎉
            axios.get("http://localhost:5000/users/secdoc").then(function (response) {
              const doclist = response.data.doc;
              const docs = [];
              for (let i = 0; i < doclist.length; i += 1) {
                const randomdoc = doclist[i];
                if(userData.user.dept === randomdoc.dept){
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
                  dn:   randomdoc.dirnom,
                  dp:   randomdoc.dirprenom,
                  dg:   randomdoc.dirgrade,
                  cdn:  randomdoc.codirnom,
                  cdp:  randomdoc.codirprenom,
                  cdg:  randomdoc.dirgrade,
                };
                docs.push(target);
              } 
              }
              setDocs(docs);
            })
            setIsUpdateDocLoading(true);
            
        }).catch((error) => {
          if(error.response.data.msg === "doctorant existe déjà.")
               {
                setIsUpdateDocLoading(false);
                pushMessageToSnackbar({
                  text: "doctorant existe déjà",
                });
                setIsUpdateDocLoading(false);
                }
      });

      setIsUpdateDocLoading(false);
      setIsUpdateDocDialogOpen(false);
      setTimeout(() => {
        pushMessageToSnackbar({
            text: "modifié avec succès",
        });
        }, 10);
          }

    else if(DoctorantEtapro.current.value === "sal" && DoctorantDerdip.current.value !== "au")
             {
              await axios.put("http://localhost:5000/users/update/doc/" + Id,
               {
                nom: DoctorantNom.current.value,
            prenom: DoctorantPrenom.current.value,
            username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
            dateN: DoctorantDateN.current.value,
            lieuN: DoctorantLieuN.current.value,
            adresse: DoctorantAdresse.current.value,
            numtel: DoctorantNumtel.current.value,
            mail: DoctorantMail.current.value,
            etapro: DoctorantEtapro.current.value,
            preci: DoctorantPreci.current.value,
            anebac: DoctorantAnebac.current.value,
            seribac: DoctorantSeribac.current.value,
            numbac: DoctorantNumbac.current.value,
            dept : userData.user.dept,
            catdoc:DoctorantCatdoc.current.value,
            derdip: DoctorantDerdip.current.value,
            precii: DoctorantPrecii.current.value,
            spederdip: DoctorantSpederdip.current.value,
            datederdip: DoctorantDatederdip.current.value,
            datepremdoc: DoctorantDatepremdoc.current.value,
            spedoc: DoctorantSpedoc.current.value,
            laborata: DoctorantLaborata.current.value,
            intithe: DoctorantIntithe.current.value,
            dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,
        
              }
               ,{headers: {"Content-Type": "application/json",},})
               .then((response) => {
                // Success 🎉
                axios.get("http://localhost:5000/users/secdoc").then(function (response) {
                  const doclist = response.data.doc;
                  const docs = [];
                  for (let i = 0; i < doclist.length; i += 1) {
                    const randomdoc = doclist[i];
                    if(userData.user.dept === randomdoc.dept){
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
                      dn:   randomdoc.dirnom,
                      dp:   randomdoc.dirprenom,
                      dg:   randomdoc.dirgrade,
                      cdn:  randomdoc.codirnom,
                      cdp:  randomdoc.codirprenom,
                      cdg:  randomdoc.dirgrade,
                    };
                    docs.push(target);
                  } 
                  }
                  setDocs(docs);
                })
                setIsUpdateDocLoading(true);
  
            }).catch((error) => {
              if(error.response.data.msg === "doctorant existe déjà.")
                   {
                    setIsUpdateDocLoading(false);
                    pushMessageToSnackbar({
                      text: "doctorant existe déjà",
                    });
                    setIsUpdateDocLoading(false);
                  }
          });
          
          setIsUpdateDocLoading(false);
          setIsUpdateDocDialogOpen(false);
          setTimeout(() => {
            pushMessageToSnackbar({
                text: "modifié avec succès",
            });
            }, 10);

             }
      else if(DoctorantEtapro.current.value !== "sal" && DoctorantDerdip.current.value === "au")
             {
              await axios.put("http://localhost:5000/users/update/doc/" + Id,
            {  
              nom: DoctorantNom.current.value,
            prenom: DoctorantPrenom.current.value,
            username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
            dateN: DoctorantDateN.current.value,
            lieuN: DoctorantLieuN.current.value,
            adresse: DoctorantAdresse.current.value,
            numtel: DoctorantNumtel.current.value,
            mail: DoctorantMail.current.value,
            etapro: DoctorantEtapro.current.value,
            preci: DoctorantPreci.current.value,
            anebac: DoctorantAnebac.current.value,
            seribac: DoctorantSeribac.current.value,
            numbac: DoctorantNumbac.current.value,
            dept : userData.user.dept,
            catdoc:DoctorantCatdoc.current.value,
            derdip: DoctorantDerdip.current.value,
            precii: DoctorantPrecii.current.value,
            spederdip: DoctorantSpederdip.current.value,
            datederdip: DoctorantDatederdip.current.value,
            datepremdoc: DoctorantDatepremdoc.current.value,
            spedoc: DoctorantSpedoc.current.value,
            laborata: DoctorantLaborata.current.value,
            intithe: DoctorantIntithe.current.value,
            dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,
         } 
               ,{headers: {"Content-Type": "application/json",},})
               .then((response) => {
                // Success 🎉
                axios.get("http://localhost:5000/users/secdoc").then(function (response) {
                  const doclist = response.data.doc;
                  const docs = [];
                  for (let i = 0; i < doclist.length; i += 1) {
                    const randomdoc = doclist[i];
                    if(userData.user.dept === randomdoc.dept){
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
                      dn:   randomdoc.dirnom,
                      dp:   randomdoc.dirprenom,
                      dg:   randomdoc.dirgrade,
                      cdn:  randomdoc.codirnom,
                      cdp:  randomdoc.codirprenom,
                      cdg:  randomdoc.dirgrade,
                    };
                    docs.push(target);
                  } 
                  }
                  setDocs(docs);
                })
                setIsUpdateDocLoading(true);
  

            }).catch((error) => {
              if(error.response.data.msg === "doctorant existe déjà.")
                   {
                    setIsUpdateDocLoading(false);
                      pushMessageToSnackbar({
                       text: "doctorant existe déjà",
                          });
                          setIsUpdateDocLoading(false);
                  }
          });

          setIsUpdateDocLoading(false);
          setIsUpdateDocDialogOpen(false);
          setTimeout(() => {
            pushMessageToSnackbar({
                text: "modifié avec succès",
            });
            }, 10);
              }
      else 
        {
          await axios.put("http://localhost:5000/users/update/doc/" + Id,
          {
            nom: DoctorantNom.current.value,
            prenom: DoctorantPrenom.current.value,
            username: DoctorantName.current.value,
            password: DoctorantPassword.current.value,
            dateN: DoctorantDateN.current.value,
            lieuN: DoctorantLieuN.current.value,
            adresse: DoctorantAdresse.current.value,
            numtel: DoctorantNumtel.current.value,
            mail: DoctorantMail.current.value,
            etapro: DoctorantEtapro.current.value,
            preci: DoctorantPreci.current.value,
            anebac: DoctorantAnebac.current.value,
            seribac: DoctorantSeribac.current.value,
            numbac: DoctorantNumbac.current.value,
            dept : userData.user.dept,
            catdoc:DoctorantCatdoc.current.value,
            derdip: DoctorantDerdip.current.value,
            precii: DoctorantPrecii.current.value,
            spederdip: DoctorantSpederdip.current.value,
            datederdip: DoctorantDatederdip.current.value,
            datepremdoc: DoctorantDatepremdoc.current.value,
            spedoc: DoctorantSpedoc.current.value,
            laborata: DoctorantLaborata.current.value,
            intithe: DoctorantIntithe.current.value,
            dirnom: DoctorantdirNom.current.value,
          dirprenom: DoctorantdirPrenom.current.value,
          dirgrade:  DoctorantdirGrade.current.value,
          codirnom: DoctorantcodirNom.current.value,
          codirprenom: DoctorantcodirPrenom.current.value,
          codirgrade: DoctorantcodirGrade.current.value,
          }
          ,
          {headers: {"Content-Type": "application/json",},})
          .then((response) => { 
            // Success 🎉
      axios.get("http://localhost:5000/users/secdoc").then(function (response) {
      const doclist = response.data.doc;
      const docs = [];
      for (let i = 0; i < doclist.length; i += 1) {
        const randomdoc = doclist[i];
        if(userData.user.dept === randomdoc.dept){
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
          dn:   randomdoc.dirnom,
          dp:   randomdoc.dirprenom,
          dg:   randomdoc.dirgrade,
          cdn:  randomdoc.codirnom,
          cdp:  randomdoc.codirprenom,
          cdg:  randomdoc.dirgrade,
        };
        docs.push(target);
      } 
      }
      setDocs(docs);
    })
            setIsUpdateDocLoading(true);
  
        }).catch((error) => {
          if(error.response.data.msg === "doctorant existe déjà.")
               {
                setIsUpdateDocLoading(false);
                pushMessageToSnackbar({
                  text: "doctorant existe déjà",
                });
                setIsUpdateDocLoading(false);
              }
      });
      setIsUpdateDocLoading(false);
      setIsUpdateDocDialogOpen(false);
      setTimeout(() => {
        pushMessageToSnackbar({
            text: "modifié avec succès",
        });
        }, 10);
        }     
      
        }  
  ,[ setIsUpdateDocLoading,setId,setEtapro,setDerdip,Id,etapro,derdip, setIsUpdateDocDialogOpen ,pushMessageToSnackbar,onClose,DoctorantNom,DoctorantPrenom,DoctorantDateN,DoctorantLieuN,DoctorantAdresse,DoctorantNumtel,DoctorantMail,DoctorantEtapro,DoctorantPreci,DoctorantAnebac,DoctorantSeribac,DoctorantNumbac,DoctorantCatdoc,DoctorantDerdip,DoctorantPrecii,DoctorantSpederdip,DoctorantDatederdip,DoctorantDatepremdoc,DoctorantSpedoc,DoctorantLaborata,DoctorantIntithe,DoctorantName,DoctorantPassword
    ,DoctorantdirNom,DoctorantdirPrenom,DoctorantdirGrade,DoctorantcodirNom,DoctorantcodirPrenom,DoctorantcodirGrade]);

    const handleUploadd = useCallback(async () => {
      setIsUpdateDocLoading(true);
      if(DoctorantNom.current.value === "" ||
      DoctorantPrenom.current.value === "" ||
      DoctorantDateN.current.value === "" ||
      DoctorantLieuN.current.value === "" ||
      DoctorantAdresse.current.value === "" ||
      DoctorantNumtel.current.value === "" ||
      DoctorantMail.current.value === "" ||
      DoctorantEtapro.current.value === "" ||
      DoctorantAnebac.current.value === "" ||
      DoctorantSeribac.current.value === "" ||
      DoctorantNumbac.current.value === "" ||
      DoctorantCatdoc.current.value === "" ||
      DoctorantDerdip.current.value === "" ||
      DoctorantSpederdip.current.value === "" ||
      DoctorantDatederdip.current.value === "" ||
      DoctorantDatepremdoc.current.value === "" ||
      DoctorantSpedoc.current.value === "" ||
      DoctorantIntithe.current.value === "" ||
      DoctorantLaborata.current.value === "" ||   
      DoctorantName.current.value === "" ||
      DoctorantPassword.current.value === ""  ||
      DoctorantdirNom.current.value === ""  ||
      DoctorantdirPrenom.current.value === ""  ||
      DoctorantdirGrade.current.value === ""  ||
      DoctorantcodirNom.current.value === ""  ||
      DoctorantcodirPrenom.current.value === ""  ||
      DoctorantcodirGrade.current.value === ""  
      ) {     
        setIsUpdateDocLoading(false);     
      }
      else if(DoctorantEtapro.current.value === "sal" && DoctorantPreci.current.value === "" )
        {
          setIsUpdateDocLoading(false);     
        }
        else if(DoctorantDerdip.current.value === "au" && DoctorantPrecii.current.value === "" )
        {
          setIsUpdateDocLoading(false);     
        }
      else{
  
      formudocc();
        
    }
    }, [setIsUpdateDocLoading , onClose, pushMessageToSnackbar , setId,setEtapro,setDerdip,Id,etapro,derdip]);


    const [searched, setSearched] = useState("");

    const onChangeSearch = useCallback(
      (searchVal) => {
  
        axios.get("http://localhost:5000/users/secdoc").then(function (response) {
          const doclist = response.data.doc;
          const docs = [];
          for (let i = 0; i < doclist.length; i += 1) {
            const randomdoc = doclist[i];
            if(userData.user.dept === randomdoc.dept){
              if((doclist[i].nom.toLowerCase().includes(searchVal.toLowerCase())) || (doclist[i].prenom.toLowerCase().includes(searchVal.toLowerCase())) ){
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
            };
            docs.push(target);
          } }
          }
          setDocs(docs);
        })
        .catch(function (error) {
          console.log(error);
        });
  
      },
      [setDocs]
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
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateDocDialogOpen}
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
                  <b> {deleteDocDialogRow.nom} </b>
                  {" "}
                  <b> {deleteDocDialogRow.prénom} </b>
                  {" de votre liste?"}
              </span>
          ) : null}
          onClose={handleDeleteDocDialogClose}
          onConfirm={deleteDoc}
          loading={isDeleteDocLoading} />
          
          <ConfirmationDialogg
          open={isCreateDocDialogOpen}
          onClose={handleCreateDocDialogClose}
          loading={isCreateDocLoading}
          onFormSubmit={(e) => {
            e.preventDefault();
            handleUpload();
          }}
          title="Création d'un Doctorant"
          content={
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
            <TextField required variant="outlined" label="Nom" inputRef={DoctorantNom}/>            
            <TextField required variant="outlined" label="Prénom" inputRef={DoctorantPrenom} />
            </div>
            <div>
            <TextField required variant="outlined" label="Né(e) le" type="date" inputRef={DoctorantDateN}
             InputLabelProps={{
               shrink: true  
               }}/>
            <TextField required variant="outlined" label="à" inputRef={DoctorantLieuN} />
            <TextField required variant="outlined" label="Adresse" inputRef={DoctorantAdresse} />
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
           <TextField required variant="outlined" label="N° de téléphone " name="phone"  inputRef={DoctorantNumtel} />
           <TextField required variant="outlined" label="Email" name="email" type="email" inputRef={DoctorantMail}/>            
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
            <TextField  required variant="outlined" select   label="Etat professionnel"  defaultValue={""} inputRef={DoctorantEtapro} onChange={handleChangeEtapro} >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {etapro==="sal"? <TextField  variant="outlined" label="(Préciser)" inputRef={DoctorantPreci}/>:null}
            </div>
            <div>
            <TextField required variant="outlined" type="number" name="number" inputProps={{min:1950}} label="Année d’obtention du BAC" inputRef={DoctorantAnebac}/>
            <TextField required variant="outlined"  label="Série du BAC " inputRef={DoctorantSeribac}/>
            <TextField required variant="outlined" type="number" name="number" label="N° du BAC " inputRef={DoctorantNumbac}/>
            </div> 
            <div>                    
            <TextField required variant="outlined" select   label="Dernier diplome obtenu" defaultValue={""} inputRef={DoctorantDerdip} onChange={handleChangeDerdip} >
          {currencies3.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>  
            {derdip==="au"? <TextField  variant="outlined" label="(Préciser)" inputRef={DoctorantPrecii}/>:null}
            </div>
            <div>
            <TextField required variant="outlined" label="Spécialité dernier diplôme obtenu" inputRef={DoctorantSpederdip}/>
            <TextField required variant="outlined" label="Date de son obtention"  type="date" inputRef={DoctorantDatederdip}
              InputLabelProps={{
               shrink: true
               }}
            />
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
            <TextField required variant="outlined" select   label="Fiche de reinscription en" defaultValue={""} inputRef={DoctorantCatdoc} onChange={handleChangeTypedoc} >
          {currencies2.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>  
            <TextField required variant="outlined" label="Date 1ère Inscription Doctorat"  type="date" inputRef={DoctorantDatepremdoc}
              InputLabelProps={{
               shrink: true
               }}
              />
            <TextField required variant="outlined" label="Spécialité du Doctorat" inputRef={DoctorantSpedoc}/>
            </div>
            <div>
            <TextField required variant="outlined" label="Laboratoire de rattachement" inputRef={DoctorantLaborata}/>
            <TextField required variant="outlined" label="Intitulé de la thèse" inputRef={DoctorantIntithe}/>
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
            <TextField required variant="outlined" label="Nom de compte" inputRef={DoctorantName}
          InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth              
              label="Mot de passe"
              autoComplete="off"
              inputRef={DoctorantPassword}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
              />            </div>
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
            <TextField required variant="outlined" label="Nom" inputRef={DoctorantdirNom}/>
            <TextField required variant="outlined" label="Prénom" inputRef={DoctorantdirPrenom}/>
            <TextField required variant="outlined" label="Grade" inputRef={DoctorantdirGrade}/>
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
            <TextField required variant="outlined" label="Nom" inputRef={DoctorantcodirNom}/>
            <TextField required variant="outlined" label="Prénom" inputRef={DoctorantcodirPrenom}/>
            <TextField required variant="outlined" label="Grade" inputRef={DoctorantcodirGrade}/>
            </div>
            </ListItemText>
          </ListItem>          
        </Bordered>
      </List>
       
    </Box>
          }
        actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={handleCreateDocDialogClose} disabled={isCreateDocLoading}>
                Retour
              </Button>
            </Box>
            <Button
              type="submit" 
              variant="contained"
              color="secondary"
              disabled={isCreateDocLoading}
            >
              Valider {isCreateDocLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
          />
          
          <ConfirmationDialogg
          open={isViewDocDialogOpen}
          onClose={handleViewDocDialogClose}
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
          
          <ConfirmationDialogg
           open={isUpdateDocDialogOpen}
           onClose={handleUpdateDocDialogClose}
           loading={isUpdateDocLoading}
           onFormSubmit={(e) => {
             e.preventDefault();
             handleUploadd();
           }}
          title="Modification d'un Doctorant"
          content={updateDocDialogRow ? (
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
            <TextField required variant="outlined" label="Nom" defaultValue={updateDocDialogRow.nom} inputRef={DoctorantNom}/>            
            <TextField required variant="outlined" label="Prénom" defaultValue={updateDocDialogRow.prénom} inputRef={DoctorantPrenom} />
            </div>
            <div>
            <TextField required variant="outlined" label="Né(e) le" type="date" defaultValue={updateDocDialogRow.da} inputRef={DoctorantDateN}
             InputLabelProps={{
               shrink: true  
               }}/>
            <TextField required variant="outlined" label="à" defaultValue={updateDocDialogRow.li} inputRef={DoctorantLieuN} />
            <TextField required variant="outlined" label="Adresse" defaultValue={updateDocDialogRow.ad} inputRef={DoctorantAdresse} />
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
           <TextField required variant="outlined" label="N° de téléphone " name="phone" defaultValue={updateDocDialogRow.nt}  inputRef={DoctorantNumtel} />
           <TextField required variant="outlined" label="Email" name="email" type="email" defaultValue={updateDocDialogRow.email} inputRef={DoctorantMail}/>            
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
            <TextField  required variant="outlined" select   label="Etat professionnel"  defaultValue={updateDocDialogRow.ep} inputRef={DoctorantEtapro} onChange={handleChangeEtapro} >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {etapro==="sal"?  <TextField  variant="outlined" label="(Préciser)" defaultValue={updateDocDialogRow.pr} inputRef={DoctorantPreci}/> :null}
          </div>
            <div>
            <TextField required variant="outlined" type="number" name="number" inputProps={{min:1950}} label="Année d’obtention du BAC" defaultValue={updateDocDialogRow.an} inputRef={DoctorantAnebac}/>
            <TextField required variant="outlined"  label="Série du BAC "  defaultValue={updateDocDialogRow.seb} inputRef={DoctorantSeribac}/>
            <TextField required variant="outlined" type="number" name="number" label="N° du BAC " defaultValue={updateDocDialogRow.nb} inputRef={DoctorantNumbac}/>
            </div> 
            <div>                    
            <TextField required variant="outlined" select   label="Dernier diplome obtenu" defaultValue={updateDocDialogRow.dd} inputRef={DoctorantDerdip} onChange={handleChangeDerdip} >
          {currencies3.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>  
        {derdip==="au"? <TextField  variant="outlined" label="(Préciser)" defaultValue={updateDocDialogRow.prr} inputRef={DoctorantPrecii}/>:null}
            </div>
            <div>
            <TextField required variant="outlined" label="Spécialité dernier diplôme obtenu" defaultValue={updateDocDialogRow.sdd} inputRef={DoctorantSpederdip}/>
            <TextField required variant="outlined" label="Date de son obtention"  type="date" defaultValue={updateDocDialogRow.dad} inputRef={DoctorantDatederdip}
              InputLabelProps={{
               shrink: true
               }}
            />
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
            <TextField required variant="outlined" select   label="Fiche de reinscription en" defaultValue={updateDocDialogRow.cd} inputRef={DoctorantCatdoc} onChange={handleChangeTypedoc} >
          {currencies2.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>  
            <TextField required variant="outlined" label="Date 1ère Inscription Doctorat"  type="date" defaultValue={updateDocDialogRow.dap} inputRef={DoctorantDatepremdoc}
              InputLabelProps={{
               shrink: true
               }}
              />
            <TextField required variant="outlined" label="Spécialité du Doctorat" defaultValue={updateDocDialogRow.sd} inputRef={DoctorantSpedoc}/>
            </div>
            <div>
            <TextField required variant="outlined" label="Laboratoire de rattachement" defaultValue={updateDocDialogRow.lr} inputRef={DoctorantLaborata}/>
            <TextField required variant="outlined" label="Intitulé de la thèse" defaultValue={updateDocDialogRow.inti} inputRef={DoctorantIntithe}/>
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
            <TextField required variant="outlined" label="Nom de compte" defaultValue={updateDocDialogRow.ndc} inputRef={DoctorantName}/>
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth              
              label="Mot de passe"
              autoComplete="off"
              defaultValue={updateDocDialogRow.mdp}
              inputRef={DoctorantPassword}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
              />            </div>
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
            <TextField required variant="outlined" label="Nom" defaultValue={ updateDocDialogRow.dn} inputRef={DoctorantdirNom} />
            <TextField required variant="outlined" label="Prénom" defaultValue={updateDocDialogRow.dp} inputRef={DoctorantdirPrenom}/>
            <TextField required variant="outlined" label="Grade" defaultValue={updateDocDialogRow.dg} inputRef={DoctorantdirGrade} />
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
            <TextField required variant="outlined" label="Nom" defaultValue={ updateDocDialogRow.cdn} inputRef={DoctorantcodirNom}/>
            <TextField required variant="outlined" label="Prénom" defaultValue={ updateDocDialogRow.cdp} inputRef={DoctorantcodirPrenom}/>
            <TextField required variant="outlined" label="Grade" defaultValue={ updateDocDialogRow.cdg} inputRef={DoctorantcodirGrade}/>
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
              <Button onClick={handleUpdateDocDialogClose} disabled={isUpdateDocLoading}>
                Retour
              </Button>
            </Box>
            <Button
              type="submit" 
              variant="contained"
              color="secondary"
              disabled={isUpdateDocLoading}
            >
              Valider {isUpdateDocLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
            />
          

          <Box width="100%">
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
                                              {row.email}
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
                                                  <IconButton
                                                      className={classes.iconButton}
                                                      onClick={() => {
                                   
                                                        
                                                        handleUpdateDocDialogOpen(row);
                                                    } }
                                                      aria-label="Update"
                                                      size="large">
                                                      <SettingsIcon className={classes.blackIcon} />
                                                  </IconButton>      
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
  classes: PropTypes.object.isRequired,
  docs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDocs: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(DocContent);