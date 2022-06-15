import React,{Fragment} from "react";
import PropTypes from "prop-types";
import {
  Typography,
  CardContent,
  Box,
  Grid,
  Card,
  } from "@mui/material";
import {Bar,Doughnut} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import withStyles from '@mui/styles/withStyles';



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


function StatContent(props) {
  const {
    stat1,
    stat2,
    stat3,
    stat4,
    stat5,
    stat6,
    stat7,
    stat8,
    stat9,
    stat10,
    stat11,
    stat12,
  } = props;

  

 

    const state1 = {

      labels: ['1ère Année', '2ème Année', '3ème Année','4ème Année', '5ème Année'],
      datasets: [
        {
          label: 'Année',
          backgroundColor: ['#3F51B5','#e53935','green','#FFD700','#FB8C00'],
          borderColor: '#FFFFFF',
          hoverBorderColor: '#FFFFFF',
          data: [stat1, stat2, stat3, stat4, stat5],
        }
      ],
     
    }

    const state2 = {

      labels: ['1ère Année', '2ème Année', '3ème Année','4ème Année', '5ème Année'],
      datasets: [
        {
          label: 'Année',
          backgroundColor: ['#3F51B5','#e53935','green','#FFD700','#FB8C00'],
          borderColor: '#FFFFFF',
          hoverBorderColor: '#FFFFFF',
          data: [stat6, stat7, stat8, stat9, stat10]
        }
      ]
    }


    
    const state3 = {

      labels: ['LMD', 'Classique'],
      datasets: [
        {
          label: 'Type Doctorat',
          backgroundColor: '#3F51B5',
          borderColor: '#FFFFFF',
          data: [stat11, stat12],
          barThickness: 50,
        }
      ]
    }

    const device1 = [
      {
        title: '1ère Année',
        value: stat1,
        color: '#3F51B5'
      },
      {
        title: '2ème Année',
        value: stat2,
        color: '#E53935'
      },
      {
        title: '3ème Année',
        value: stat3,
        color: 'green'
      },
      {
        title: '4ème Année',
        value: stat4,
        color: 'yellow'
      },
      {
        title: '5ème Année',
        value: stat5,
        color: '#FB8C00'
      }
    ];

    const device2 = [
      {
        title: '1ère Année',
        value: stat6,
        color: '#3F51B5'
      },
      {
        title: '2ème Année',
        value: stat7,
        color: '#E53935'
      },
      {
        title: '3ème Année',
        value: stat8,
        color: 'green'
      },
      {
        title: '4ème Année',
        value: stat9,
        color: 'yellow'
      },
      {
        title: '5ème Année',
        value: stat10,
        color: '#FB8C00'
      }
    ];

    const device3 = [
      {
        title: 'LMD',
        value: stat11,
        color: '#3F51B5'
      },
      {
        title: 'Classique',
        value: stat12,
        color: '#3F51B5'
      }
    ];


  return (
    <Fragment>
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
      height={'1070px'}
    />
    </Box>
    <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {device3.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
              </Typography>
            </Box>
          ))}
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
    <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {device1.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
              </Typography>
            </Box>
          ))}
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
    <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {device2.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
              </Typography>
            </Box>
          ))}
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
