import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, where, query, deleteDoc, doc} from 'firebase/firestore';
import { makeStyles } from "@mui/styles";
import { DeleteForever } from "@mui/icons-material";
import CustomButton from "../../components/Button";

const useStyles = makeStyles({
  MainContainer:{
    backgroundColor:'#e0e0e0',
    minHeight:'100vh'
  },
  ScreenTitle:{
    fontWeight:'900 !important',
    color:'navy',
    fontSize:'2rem !important',
    textDecorationLine:'underline',
    textAlign:'center'
  },
  Container:{
    width:'70%',
    height:'22vh',
    display:'flex',
    flexDirection:'row',
    backgroundColor:'#fff',
    border:'1px solid #d0d0d0',
    marginInline:'auto',
    marginBlock:'1%',
    borderRadius:'10px'
  },
  Title:{
    marginTop:'2% !important',
    color:'#006400',
    fontWeight:'900 !important',
    textDecorationLine:'underline',
    fontSize:'1.3rem !important',
    width:'100%',    
  },
  DeleteIcon:{
    height:'100% !important',
    fontSize:'180% !important',
    paddingRight:'4%'
  },
  CounterContainer:{
    display:'flex',
    alignSelf:'center',
    height:'30%',
    marginBlock:'auto',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#c0c0c0',
    height:'6vh',
    marginRight:'10%',
    maxWidth:'fit-content',
    margin:'auto',
    marginBlock:'2%'
  },
  CounterButton:{
    color:'black',
    fontSize:'110% !important',
    fontWeight:'900 !important',
  },
  ItemQuantity:{
    backgroundColor:'whitesmoke',
    paddingBlock:'1.1vh',
    paddingInline:'13%',
    fontWeight:'900 !important',
  },
})

export default function Cart(){
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const classes = useStyles();

  const q = query(collection(db, 'orders'), where('uid', '==', localStorage.getItem('UserId')));

  useEffect(()=>{
    onSnapshot(q, (snapshot)=>{
      setItems(snapshot.docs.map(item=>({
        id: item.id,
        item: item.data()
      })))
    })
  },[])

  useEffect(()=>{
    console.log(items, ' = Cart Items')
  },[items])

  const RemoveItem =async(v)=>{
    await deleteDoc(doc(db, 'orders', v),{
      
    })
  }

  const increaseQuantity=()=>{
    setQuantity(quantity+1);
  }

  const decreaseQuantity=()=>{
    if(quantity!=1){
      setQuantity(quantity-1)
    }
  }

  return(
    <Box className={classes.MainContainer}>
      <Typography className={classes.ScreenTitle}>YOUR CART</Typography>
      {items.map(item=>(
        <Box className={classes.Container}>
          <img src={item?.item?.firstImage} style={{border:'1px solid #d9d9d9', margin:'2%', marginRight:'2%'}} />
          <Box sx={{height:'100%', paddingInline:'1%', width:'100%'}}>
            <Box sx={{width:'170%'}}>
              <Typography className={classes.Title}>{item?.item?.title}</Typography>
            </Box>
            <Typography sx={{display:'flex', flexDirection:'row'}}>
              <Typography sx={{fontWeight:'900', paddingRight:'0.8%'}}>Price: </Typography>
              ${item?.item?.price}
            <Typography sx={{color:'navy', paddingLeft:'3%'}}>Free Shipping</Typography>
            </Typography>
            <Typography sx={{display:'flex', flexDirection:'row'}}>
              <Typography sx={{fontWeight:'900', paddingRight:'0.8%'}}>Color: </Typography>
              {item?.item?.color}
            </Typography>
            <Typography sx={{display:'flex', flexDirection:'row'}}>
              <Typography sx={{fontWeight:'900', paddingRight:'0.8%'}}>Subtotal: </Typography>
              ${item?.item?.price}
            </Typography>
          </Box>
          <Box className={classes.CounterContainer}>
            <CustomButton className={classes.CounterButton} style={{paddingLeft:'19px'}} title="-" onClick={decreaseQuantity}/>
            <Typography className={classes.ItemQuantity}>{quantity}</Typography>
            <CustomButton className={classes.CounterButton} style={{paddingRight:'19px'}} title="+" onClick={increaseQuantity}/>
          </Box>
          <DeleteForever className={classes.DeleteIcon} onClick={()=>RemoveItem(item?.id)} />
        </Box>
      ))}
    </Box>
  )
}