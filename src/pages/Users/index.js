import { Box, Table, TableContainer, Typography, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
const q = query(collection(db, 'users'), orderBy('signupTime', 'asc'))

const useStyles = makeStyles({
  Container:{
    width:'100vw',
    paddingInline:'5vw',
    backgroundColor:'skyblue'
  }
})

export default function Users(){
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(()=>{
    onSnapshot(q, (snapshot)=>{
      setUsers(snapshot.docs.map(doc=>({
        id: doc.id,
        item: doc.data(),
      })))
    })
  })

  const getRowNumber=(n)=>{
    console.log(n)
  }
  return(
    <Box className={classes.Container}>
      <Typography sx={{color:'navy', fontSize:'20px', fontWeight:'900', textDecorationLine:'underline', textAlign:'center'}}>
        Users
      </Typography>
      <Typography sx={{textAlign:'end', paddingRight:'1vw'}}>Total Users: {users.length}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{}}>
          <TableHead>
            <TableRow sx={{backgroundColor:'#252525'}}>
              <TableCell sx={{fontWeight:'900', color:'white', fontSize:'16px'}}>Email</TableCell>
              <TableCell sx={{fontWeight:'900', color:'white', fontSize:'16px'}}>User ID</TableCell>
              <TableCell sx={{fontWeight:'900', color:'white', fontSize:'16px'}}>Signup Time</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((item, index)=>(
              <TableRow sx={{backgroundColor:index%2 === 0 ? 'white':'whitesmoke'}}>
                <TableCell>{item?.item?.email}</TableCell>
                <TableCell>{item?.item?.uid}</TableCell>
                <TableCell>{item.item.signupTime.toDate().toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}