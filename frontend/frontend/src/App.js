import './App.css';
import {getCryptoTypes,getCrypto} from './api'
import React,{ useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  rise_cell: {
    color: "green"
  },
  down_cell:{
    color: "red"
  }
});

export const differenceBetween = (a,b)=>{
  return (100*(a-b)/b).toFixed(1)
}

function App() {
  let [cryptos,setCryptos] = useState([])
  const classes = useStyles();

  useEffect(()=>{
    async function getData(){
      const [err,res] = await getCryptoTypes()
      if(err) alert(err)
      if(res){
        console.log(res.data.data)
        let cryps = []
        for(let c of res.data.data){
          const [e,r] = await getCrypto(c)
          if(e) console.log(e)
          else{
            cryps.push(r.data.data)
            cryps.sort((a,b)=>b[0].market_cap-a[0].market_cap)
            setCryptos([...cryps])

          }
        }
      }
    }
    getData();
  },[])

  return (
    <div className="App">
      {cryptos.length === 0?
      <div className="progress-wrapper">
        <CircularProgress size={100} />
      </div>:
      <div className="table-wrapper">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Coin</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">1d</TableCell>
                <TableCell align="right">7d</TableCell>
                <TableCell align="right">30d</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Market Capacity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cryptos.map((cryp,index) => {
                const dayDiff = differenceBetween(cryp[0].close,cryp[1].close)
                const weekDiff = differenceBetween(cryp[0].close,cryp[7].close)
                const monthDiff = differenceBetween(cryp[0].close,cryp[29].close)
                return (
                <TableRow key={cryp.currency}>
                  <TableCell component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell align="right">{cryp[0].currency}</TableCell>
                  <TableCell align="right">${cryp[0].close}</TableCell>
                  {cryp.length>1 && <TableCell className={dayDiff>0?classes.rise_cell:classes.down_cell} align="right">{dayDiff}%</TableCell>}
                  {cryp.length>7 && <TableCell className={weekDiff>0?classes.rise_cell:classes.down_cell} align="right">{weekDiff}%</TableCell>}
                  {cryp.length>29 &&<TableCell className={monthDiff>0?classes.rise_cell:classes.down_cell} align="right">{monthDiff}%</TableCell>}
                  <TableCell align="right">${cryp[0].volume}</TableCell>
                  <TableCell align="right">${cryp[0].market_cap}</TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      }
      
    </div>
  );
}

export default App;
