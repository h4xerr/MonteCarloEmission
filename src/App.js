import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import nav from "./comp/nav";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';                        //importing stuff
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { positions } from '@material-ui/system';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory'

let Plot = createPlotlyComponent(Plotly);
let arr = new Array(100).fill(0).map(() => new Array(100).fill(0))                                                         //declare variables
let res = []
let b=1.0,a=0.0,ai=0.0,bi=0.0,gg=0.0,w=3.0,dp=0.0,dt=1/15,delta=0.0
let saturation=0.0
let line=[]

const useStyles = makeStyles({
  root: {
    width: 1920,
  },
});


class Greeting extends React.Component {
  constructor(props) {
   super(props);
     // Define your state object here
     this.state = {
       name: 'Jane Doe'
     }
   }
 };
 function MonteCarlo(v1,v2,v3,v4){
   delta=v1;w=v2;gg=v3
   saturation=((w**2)/4)/(delta**2+(gg**2/4)+(w**2/2))
   line= [saturation]*100
   for (let i=0;i<100;i++){
         b=1;bi=0;a=0;ai=0
         for (let j=0;j<100;j++){
             arr[i][j]=([b**2+bi**2])
             let value =Math.random()*1
             dp =2*gg*(b**2+bi**2)*dt
             if(value>dp){
                 a=(a+(w/2)*bi*dt-(delta/2)*ai*dt)/Math.sqrt(1-dp)
                 ai=(ai-(w/2)*b*dt+(delta/2)*a*dt)/Math.sqrt(1-dp)
                 b=((b+(w/2)*ai*dt)-(dt*gg*b)+(delta/2)*bi*dt)/Math.sqrt(1-dp)
                 bi=((bi-(w/2)*a*dt)-(dt*gg*bi)-(delta/2)*b*dt)/Math.sqrt(1-dp)
                 //console.log('evo'+arr[i][j])
               }
             else{
                 ai=bi/Math.sqrt(b**2+bi**2)
                 a=b/Math.sqrt(b**2+bi**2)
                 b=0;bi=0
                 //console.log('jump'+arr[i][j])
               }
           }
         }
         for (let i = 0; i < arr.length; i++) {
             var innerArrayLength = arr[i].length;
             for (let j = 0; j < innerArrayLength; j++) {
               res[i]=(res[i] || 0)+ +arr[j][i]
               //console.log('[' + i + ',' + j + '] = ' + res[i]+'    arr'+arr[i][j]);
             }
         }
         for (let i = 0; i < res.length; i++) {
           res[i]=res[i]/100
         }
const element = (
   <div>
   <Plot align="center"
  data={[
    {
      y: res,
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: 'red'},
    }]}
   layout={ {width: 1000, height:0, title: 'Population of the excited state as a function of time'} }
     />
   </div>
 );
 ReactDOM.render(element, document.getElementById('root'));
 }



 const divStyle = {
   color: 'black',
 };






export default function ContinuousSlider() {
  const classes = useStyles();
  const [value1, setValue1] = React.useState(0);
  const [value2, setValue2] = React.useState(3);
  const [value3, setValue3] = React.useState(0);
  const [value4, setValue4] = React.useState(0);

  const handledelta = (event, newdelta) => {
    setValue1(newdelta);
  };
  const handleomega = (event, newomega) => {
    setValue2(newomega);
  };
  const handlegama = (event, newgama) => {
    setValue3(newgama);
  };
  const handledt = (event, newdt) => {
    setValue4(newdt);
  };
  console.log(value1,value2,value3,value4)


    return (
      <div style={divStyle}>
      <Typography id="continuous-slider"
      component="div"
      align="center"
      variant="h4"
      style={{ height: 100, width: '100%', position: 'relative' }}>
        Monte Carlo Simulation of spontaneous emission of an atom
      </Typography>
      <Grid container spacing={5}
      style={{ height: 100, width: '100%', position: 'relative' }}>
        <Grid item>
          Delta
        </Grid>
        <Grid item xs>
          <Slider value={value1}
            min={0}
            step={0.2}
            max={2}
            onChange={handledelta} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          Omega
        </Grid>
        <Grid item xs>
          <Slider value={value2}
             min={0}
             step={0.5}
             max={5}
             onChange={handleomega} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          Gama
        </Grid>
        <Grid item xs>
          <Slider value={value3}
           min={0}
           step={0.1}
           max={1}
           onChange={handlegama} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          dt
        </Grid>
        <Grid item xs>
          <Slider value={value4} onChange={handledt} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
        <Button variant="contained" color="primary" onClick={() => {MonteCarlo(value1,value2,value3,value4)}}>
          GENERATE
        </Button>
        </Grid>
      </Grid>
      </div>
    );

  //Monte Carlo Simulation


}
