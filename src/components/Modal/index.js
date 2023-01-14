import { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import Image from "../Image";
import CustomButton from '../Button/index';
import Cross from '../../assets/images/cross.jpg';

const useStyles = makeStyles((theme)=>({
  Container:{
    minWidth:'50vw',
    backgroundColor:'#d0d0d0',
    border:'5px solid black !important',
    borderRadius:'9px',
    width:'fit-content',
    maxWidth:'65vw',
    maxHeight:'100vh',
    border:'1px solid #707070',
    margin:'auto',
    [theme.breakpoints.down('mxs')]:{
      maxWidth:'80vw !important',
      marginTop:'10vh !important'
    },
    [theme.breakpoints.down('xsm')]:{
      maxWidth:'70vw',
      marginTop:'4vh !important'
    },
    [theme.breakpoints.down('sm')]:{
      maxWidth:'55%',
      marginTop:'2%'
    },
    [theme.breakpoints.up('sm')]:{
      maxWidth:'80%',
      marginTop:'15%'
    },
    [theme.breakpoints.up('msm')]:{
      maxWidth:'65%',
      marginTop:'12%',
    },
    [theme.breakpoints.up('md')]:{
      marginTop:'3%'
    }
  },
  ImageBlock:{
    borderTopLeftRadius:'9px',
    minHeight:'50%',
    [theme.breakpoints.down('sm')]:{
      borderTopRightRadius:'9px',
      borderBottom:'1px solid #b9b9b9'
    },
    [theme.breakpoints.up('sm')]:{
      borderBottomLeftRadius:'9px',
      borderRight:'1px solid #b9b9b9',
    }
  },
  ModalImage:{
    borderBottom:'1px solid #b9b9b9',
    borderTopLeftRadius:'9px',
    [theme.breakpoints.down('xsm')]:{
      borderTopRightRadius:'9px',
      width:'100% !important',
      marginInline:'0%'
    },
    [theme.breakpoints.up('mxs')]:{
      width:'90% !important',
      marginInline:'5%',
      borderRadius:'0px'
    },
    [theme.breakpoints.up('xsm')]:{
      width:'86% !important',
      marginInline:'7% !important',
      borderTopLeftRadius:'0px'
    },
    [theme.breakpoints.up('sm')]:{
      width:'100% !important',
      marginInline:'0% !important',
      borderTopLeftRadius:'9px'
    },
  },
  SmallImagesContainer:{
    marginTop:'auto',
    borderBottomLeftRadius:'9px',
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    paddingBottom:'5px'
  },
  SmallImageStyle:{
    width:'15%',
    border:'1px solid #b9b9b9d0'
  },
  DescBlock:{
    backgroundColor:'skyblue',
    padding:'4%',
    borderBottomRightRadius:'9px',
    [theme.breakpoints.down('sm')]:{
      borderBottomLeftRadius:'9px'
    },
    [theme.breakpoints.up('sm')]:{
      borderTopRightRadius:'9px'
    }
  },
  CloseIcon:{
    alignSelf:'end',
    right:'17.5%',
    color:'#404040',
    margin:'0.5%',
    position:'absolute',
    fontSize:'3.5vw !important',
    [theme.breakpoints.down('xsm')]:{
      fontSize:'5vw !important',
      right:'15%'
    },
    [theme.breakpoints.down('mxs')]:{
      right:'10.5% !important'
    },
    [theme.breakpoints.down('sm')]:{
      right:'22.5%'
    },
    [theme.breakpoints.up('sm')]:{
      right:'10%'
    },
    [theme.breakpoints.up('msm')]:{
      right:'17.5%'
    }
  },
  Title:{
    fontWeight:'900 !important',
    textDecorationLine:'underline',
    color:"#000080",
    paddingBottom:'2%',
    textAlign:'center',
    [theme.breakpoints.down('msm')]:{
      fontSize:'1.1rem !important',
    },
    [theme.breakpoints.up('msm')]:{
      fontSize:'1.5rem !important',
    }
  },
  CounterContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#c0c0c0',
    height:'6vh',
    maxWidth:'fit-content',
    border:'1px solid black',
    borderRadius:'6px',
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
    borderRight:'1px solid black',
    borderLeft:'1px solid black',
  },
  ConfirmOrder:{
    alignSelf:'center',
    margin:'auto'
  }
}))

export default function CustomModal(props){
  const classes = useStyles();
  const {
    show,
    close,
    title,
    price,
    color,
    confirmOrder,
    firstImage,
    secondImage,
    thirdImage,
    fourthImage,
    fifthImage,
  } = props;
  
  const [selectedImage, setSelectedImage] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(()=>{
    setSelectedImage(firstImage)
  },[])
  const changeImage=(e)=>{
    setSelectedImage(e);
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
    <Modal open={show} onClose={close}>
      <Grid container  className={classes.Container}>

        <Grid item xs={12} sm={6} md={6} className={classes.ImageBlock}>
          <Clear onClick={close} className={classes.CloseIcon} />
          <Image src={selectedImage} className={classes.ModalImage} />
          <Box className={classes.SmallImagesContainer} >
            <img src={firstImage} className={classes.SmallImageStyle} onClick={()=>changeImage(firstImage)}/>
            <img src={secondImage} className={classes.SmallImageStyle} onClick={()=>changeImage(secondImage)}/>
            <img src={thirdImage} className={classes.SmallImageStyle} onClick={()=>changeImage(thirdImage)}/>
            <img src={fourthImage} className={classes.SmallImageStyle} onClick={()=>changeImage(fourthImage)}/>
            <img src={fifthImage} className={classes.SmallImageStyle} onClick={()=>changeImage(fifthImage)}/>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} className={classes.DescBlock}>
          <Typography className={classes.Title}>{title}</Typography>
          <Typography sx={{height:'16px'}}>Price: ${price}/-</Typography>
          <Typography sx={{color:'red', fontSize:'15px'}}>Inclusive of all taxes</Typography>
          <figure />
          <Typography>Quantity</Typography>
          <Box className={classes.CounterContainer}>
            <CustomButton className={classes.CounterButton} style={{paddingLeft:'19px'}} title="-" onClick={decreaseQuantity}/>
            <Typography className={classes.ItemQuantity}>{quantity}</Typography>
            <CustomButton className={classes.CounterButton} style={{paddingRight:'19px'}} title="+" onClick={increaseQuantity}/>
          </Box>
          <Typography>Subtotal: ${price*quantity}</Typography>
          <Button variant='contained' onClick={confirmOrder} className={classes.ConfirmOrder}>Add to Cart</Button>
        </Grid>

      </Grid>
    </Modal>
  )
}