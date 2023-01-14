import React, {useEffect, useState} from "react";
import { Box, Button, InputLabel, List, ListItem, ListItemText, MenuItem, Pagination, Select, TextField, Typography } from "@mui/material";
import { collection, getCountFromServer, limit, onSnapshot, setDoc, orderBy, query, startAfter, startAt, serverTimestamp, doc} from "firebase/firestore";
import { db } from "./firebase";

export default function App2(){
  const [page, setPage] = useState();
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [noOfPages, setNoOfPages] = useState();

  useEffect(()=>{
    countDocs();
  },[itemsPerPage])

  const countDocs=async()=>{
    const coll = collection(db, 'count');
    const snapshot = await getCountFromServer(coll);
    setNoOfPages(Math.ceil (snapshot?.data()?.count/itemsPerPage));
    handleChange();
  }

  const handleChange=(e, value)=>{
    setPage(value);
    console.log(value, ' = Value')
    // const diff = itemsPerPage-1;
    // let startingIndex = (page*itemsPerPage)-diff;
    // console.log(startingIndex, ' = Starting Index')

    // const next = query(collection(db, "count"), orderBy("value", 'asc'), startAt(startingIndex), limit(itemsPerPage));
    // onSnapshot(next, (snapshot)=>{
    //   setData(snapshot.docs.map(doc=>({
    //     id: doc.id,
    //     item: doc.data(),
    //   })))
    // })
  }

  return (
    <Box>
      <List>
        <Box sx={{display:'flex', flexDirection:'row'}}>
          <ListItemText><Typography sx={{textDecorationLine:'underline', fontWeight:'900', marginLeft:'5%'}}>ID: </Typography></ListItemText>
          <ListItemText><Typography sx={{textDecorationLine:'underline', fontWeight:'900'}}>Name: </Typography></ListItemText>
          <ListItemText><Typography sx={{textDecorationLine:'underline', fontWeight:'900'}}>TimeStamp: </Typography></ListItemText>
        </Box>
        {data.map(items =>(          
          <ListItem>
            <ListItemText>{items?.id}</ListItemText>
            <ListItemText>{items?.item?.name}</ListItemText>
            <ListItemText>{items?.item?.timestamp?.toDate()?.toLocaleTimeString()}</ListItemText>
            <br></br>
          </ListItem>
        ))}
      </List>
      <InputLabel>Items Per Page</InputLabel>
      <Select value={itemsPerPage} onChange={(e)=>setItemsPerPage(e.target.value)} label='Items Per Page'>
        <MenuItem value={1}>One</MenuItem>
        <MenuItem value={2}>Two</MenuItem>
        <MenuItem value={3}>Three</MenuItem>
        <MenuItem value={4}>Four</MenuItem>
        <MenuItem value={5}>Five</MenuItem>
        <MenuItem value={6}>Six</MenuItem>
        <MenuItem value={7}>Seven</MenuItem>
        <MenuItem value={8}>Eight</MenuItem>
        <MenuItem value={9}>Nine</MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={11}>Eleven</MenuItem>
      </Select>
      {/* <TextField onChange={(e)=>setChangeItems(e.target.value)} value={changeItems} label='Limit' /> */}
      {/* <Button onClick={handleItems} variant='contained'>Change Items</Button> */}

      <Pagination count={noOfPages} page={page} defaultPage={1} onChange={handleChange}
        color='primary' showFirstButton showLastButton />
    </Box>
  );
}