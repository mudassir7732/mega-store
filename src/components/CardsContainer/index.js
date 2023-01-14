import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { query, orderBy, collection, onSnapshot, startAt, getDoc, doc, getDocs, limit, startAfter } from "firebase/firestore";
import Card from "../Card";
const q = query(collection(db, 'stock'), orderBy('timestamp', 'desc'), limit());

const useStyles = makeStyles({
  Container:{
    display:'flex',
    justifyContent:'space-evenly'
  },
  InnerContainer:{
    maxWidth:'60vw',
    display:'flex',
    flexDirection:'row',
    overflow:'hidden',
  }
})

export default function CardsCotnainer(){
  const [items, setItems] = useState([]);
  const classes = useStyles();

  // const callFunc=async()=>{
  //   const first = query(collection(db, 'stock'), orderBy('timestamp', 'asc'), limit(3));
  //   const docSnapshots = await getDocs(first);
  //   const lastVisible = docSnapshots.docs[docSnapshots.docs.length-1];
  //   console.log(lastVisible, 'Last');
  //   const next = query(collection(db, 'stock'), orderBy('price', 'asc'), startAfter(649), limit(3));

  //   onSnapshot(next, (snapshot)=>{
  //     setItems(snapshot.docs.map(doc=>({
  //       id: doc.id,
  //       item: doc.data(),
  //     })))
  //   })
  //   console.log(items, ' = Cart Items Fetched!!!')
  // }

  useEffect(()=>{
    onSnapshot(q, (snapshot)=>{
      setItems(snapshot.docs.map(doc=>({
        id: doc.id,
        item: doc.data(),
      })))
    })
    console.log(items, ' = Cart Items Fetched!!!')
  },[])


  return(
    <Grid container xs={12} sm={12} md={12} className={classes.Container}>
      {items.map(item=>(
        <Card title={item?.item?.title} price={item?.item?.price} color={item?.item?.color}
          firstImage={item?.item?.firstImage}
          secondImage={item?.item?.secondImage}
          thirdImage={item?.item?.thirdImage}
          fourthImage={item.item?.fourthImage}
          fifthImage={item?.item?.fifthImage}
        />
      ))}
    </Grid>
  )
}