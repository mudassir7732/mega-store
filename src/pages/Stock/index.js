import {useState, useEffect } from "react";
import { Box, Table, TableContainer, Typography, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '../../firebase/index';
import { makeStyles } from "@mui/styles";
const q = query(collection(db, 'stock'));

const useStyles = makeStyles({
  Container:{
    width:'100vw',
    paddingInline:'5vw',
    backgroundColor:'skyblue',
  }
})

export default function Stock(){
  const [stock, setStock] = useState([]);
  const classes = useStyles();

  useEffect(()=>{
    onSnapshot(q, (snapshot)=>{
      setStock(snapshot.docs.map(doc=>({
        id: doc.id,
        item: doc.data(),
      })))
    })
  },[])

  return(
    <Box className={classes.Container}>
      <Typography sx={{color:'navy', fontSize:'20px', fontWeight:'900', textDecorationLine:'underline', textAlign:'center'}}>
        Total Stock
      </Typography>
      <Typography sx={{textAlign:'end', paddingRight:'1vw'}}>Total Items: {stock.length}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{}}>
          <TableHead>
            <TableRow sx={{backgroundColor:'#252525'}}>
              <TableCell sx={{fontWeight:'900', color:'white', fontSize:'16px'}}>Item Name</TableCell>
              <TableCell sx={{fontWeight:'900', color:'white', fontSize:'16px'}}>Item Price</TableCell>
              <TableCell sx={{fontWeight:'900', color:'white', fontSize:'16px'}}>Item Color</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stock.map((item,index)=>(
              <TableRow sx={{backgroundColor:index%2 === 0 ? 'white':'whitesmoke'}}>
                <TableCell>{item.item.title}</TableCell>
                <TableCell>{item.item.price}</TableCell>
                <TableCell>{item.item.color}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}