import { Box, Typography, TableContainer, TableBody, TableHead, TableRow, TableCell, Paper, Table } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));

export default function Orders(){
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    onSnapshot(q, (snapshot)=>{
      setOrders(snapshot.docs.map(item=>({
        id: item.id,
        item: item.data(),
      })))
    })
  })
  return(
    <Box sx={{marginInline:'10vw'}}>
    <Typography sx={{color:'navy', fontSize:'20px', fontWeight:'900', textDecorationLine:'underline', textAlign:'center'}}>
      Total Stock
    </Typography>
    <Typography sx={{textAlign:'end', paddingRight:'1vw'}}>Total Items: {orders.length}</Typography>
    <TableContainer component={Paper}>
      <Table sx={{}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'900', fontSize:'16px'}}>Item Name</TableCell>
            <TableCell sx={{fontWeight:'900', fontSize:'16px'}}>Item Price</TableCell>
            <TableCell sx={{fontWeight:'900', fontSize:'16px'}}>Item Color</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map(item=>(
            <TableRow>
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