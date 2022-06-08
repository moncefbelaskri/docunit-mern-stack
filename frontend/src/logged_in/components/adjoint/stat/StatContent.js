import React,{useState,useContext,Fragment} from "react";
import PropTypes from "prop-types";
import {
  Typography,
  CardContent,
  Box,
  Grid,
  Card,
  Button,
  Paper,
  Toolbar,
  ListItemText,
  } from "@mui/material";
import {Bar,Line,Doughnut,Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import withStyles from '@mui/styles/withStyles';
import UserContext from "../../../../shared/components/UserContext";

const axios = require('axios');


const styles = (theme) => ({
  toolbar: { justifyContent: "space-between" },
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







function StatContent(props) {
  const {
    classes,
  } = props;
  const { userData } = useContext(UserContext);

  const [stat1, setStat1] = useState([]);
  const [stat2, setStat2] = useState([]);
  const [stat3, setStat3] = useState([]);
  const [stat4, setStat4] = useState([]);
  const [stat5, setStat5] = useState([]);
  const [stat6, setStat6] = useState([]);
  const [stat7, setStat7] = useState([]);
  const [stat8, setStat8] = useState([]);
  const [stat9, setStat9] = useState([]);
  const [stat10, setStat10] = useState([]);
  const [stat11, setStat11] = useState([]);
  const [stat12, setStat12] = useState([]);

  const fetchstat = async() => {
    await axios.get("http://localhost:5000/users/secdoc").then(function (response) {
    const statt1 = response.data.doc;
    const statt2 = response.data.avnc;
    const stat1 = [];
    for (let i = 0; i < statt1.length; i += 1) {
      const random2 = statt2[i];
      const random1 = statt1[i];
      if(userData.user.dept === random1.dept)
        {
      if(random1.catdoc === "lmd")
      {
        const target = {
          id: i,     
        };
        stat11.push(target);

        if(random2.aneactu<=1)
      {const target = {
        id: i,     
      };
      stat1.push(target);
    }
    else if(random2.aneactu<=2)
      {const target = {
        id: i,     
      };
      stat2.push(target);
    }
    else if(random2.aneactu<=3)
      {const target = {
        id: i,     
      };
      stat3.push(target);
    }
    else if(random2.aneactu<=4)
      {const target = {
        id: i,     
      };
      stat4.push(target);
    }
    else
      {const target = {
        id: i,     
      };
      stat5.push(target);
    }
  }
  if(random1.catdoc === "sci")
      {
        const target = {
        id: i,     
      };
      stat12.push(target);
    
        if(random2.aneactu<=1)
      {const target = {
        id: i,     
      };
      stat6.push(target);
    }
    else if(random2.aneactu<=2)
      {const target = {
        id: i,     
      };
      stat7.push(target);
    }
    else if(random2.aneactu<=3)
      {const target = {
        id: i,     
      };
      stat8.push(target);
    }
    else if(random2.aneactu<=4)
      {const target = {
        id: i,     
      };
      stat9.push(target);
    }
    else
      {const target = {
        id: i,     
      };
      stat10.push(target);
    }
  }
  }
}
    setStat1(stat1);
    setStat2(stat2);
    setStat3(stat3);
    setStat4(stat4);
    setStat5(stat5);
    setStat6(stat6);
    setStat7(stat7);
    setStat8(stat8);
    setStat9(stat9);
    setStat10(stat10);
    setStat11(stat11);
    setStat12(stat12);

  })
  .catch(function (error) {
    console.log(error);
  });
    };

    const state1 = {

      labels: ['1ère Année', '2ème Année', '3ème Année','4ème Année', '5ème Année'],
      datasets: [
        {
          label: 'Année',
          backgroundColor: ['blue','red','green','yellow','orange'],
          borderColor: ['blue','red','green','yellow','orange'],
          data: [stat1.length, stat2.length, stat3.length, stat4.length, stat5.length],
          barThickness: 1, 
        }
      ],
     
    }

    const state2 = {

      labels: ['1ère Année', '2ème Année', '3ème Année','4ème Année', '5ème Année'],
      datasets: [
        {
          label: 'Année',
          backgroundColor: ['blue','red','green','yellow','orange'],
          borderColor: ['blue','red','green','yellow','orange'],
          data: [stat6.length, stat7.length, stat8.length, stat9.length, stat10.length]
        }
      ]
    }


    
    const state3 = {

      labels: ['LMD', 'Classique'],
      datasets: [
        {
          label: 'Type Doctorat',
          backgroundColor: ['blue'],
          borderColor: ['blue'],
          data: [stat11.length, stat12.length],
          barThickness: 50,
        }
      ]
    }

  return (
    <Fragment>
<Paper >
      <Toolbar className={classes.toolbar}>
          <Box mr={2}>
            <ListItemText
              primary="Générer les Statistiques"
            />
          </Box>
          <Button
        variant="contained"
        color="secondary"
        onClick={fetchstat}
        disableElevation
      >
        Statistiques
      </Button>
        </Toolbar>
        </Paper>



    <Grid container spacing={3} mt={4}>

    <Grid item xs={12} md={4}>
    <Card>
    <Box pt={2} px={2} pb={4}>
    <Box display="flex" justifyContent="space-between">
    
    <Typography variant="subtitle1">Nombre total de doctorants </Typography>
    </Box>
    </Box>
    <CardContent>
    <Box>
    <Bar
      data={state3}
      width={'1000px'}
      height={'1000px'}
    />
    </Box>
    </CardContent>
     </Card>
    </Grid>
      
    <Grid item xs={12} md={4}>
    <Card>
    <Box pt={2} px={2} pb={4}>
    <Box display="flex" justifyContent="space-between">
    <Typography variant="subtitle1">Nombre de doctorants du système LMD</Typography>
    </Box>
    </Box>
    <CardContent>
    <Box>
    <Doughnut
      data={state1}
    />
    </Box>
    </CardContent>
     </Card>
    </Grid>
    
    
    <Grid item xs={12} md={4}>
    <Card>
    <Box pt={2} px={2} pb={4}>
    <Box display="flex" justifyContent="space-between">
    <Typography variant="subtitle1">Nombre de doctorants du système Classique</Typography>
    </Box>
    </Box>
    <CardContent>
    <Box>
    <Doughnut
      data={state2}
    />
    </Box>
    </CardContent>
     </Card>
    </Grid>

    
   
  </Grid>

  </Fragment>

  );
}

StatContent.propTypes = {
  classes: PropTypes.object.isRequired,
  stat: PropTypes.arrayOf(PropTypes.object).isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(StatContent);
