import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "../Image";
import {db} from '../../firebase/index';
import CustomModal from "../Modal";
import CustomButton from "../Button";
import { useDispatch } from "react-redux";
import { addDoc, collection, serverTimestamp} from "firebase/firestore";
import { increase_counter } from "../../store/reducers/counterSlice";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// import storage from '../../firebase/index';

const useStyles = makeStyles({
  Container:{
    border:'1px solid #d0d0d0',
    backgroundColor:'#f0f0f0',
    borderRadius:'10px',
    marginInline:'5px',
    marginBlock:'25px',
    display:'flex',
    flexDirection:'row',
    minWidth:'120px',
    width:'fit-content',
    maxWidth:'20vw'
  },
  Image:{
    width:'100%',
    borderBottom:'1px solid #d0d0d0',
    borderTopLeftRadius:'9px',
    borderTopRightRadius:'9px'
  },
  DetailsButton:{
    width:'100%'
  }
})
export default function Card(props){
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");

  const ConfirmOrder=async()=>{
    await addDoc(collection(db, 'orders'),{
      title:title,
      color:color,
      price:price,
      firstImage: firstImage,
      secondImage: secondImage,
      thirdImage: thirdImage,
      fourthImage: fourthImage,
      fifthImage: fifthImage,
      timestamp:serverTimestamp(),
      uid: localStorage.getItem('UserId')
    })
    console.log('Item added to Cart in Card');
    dispatch(increase_counter())
    setShowModal(!showModal);
  }

  const firebaseStorage=()=>{
    // Create a reference with an initial file path and name
    // const storage = getStorage();
    const storageRef = ref(storage, `/images/${File}`)
    const pathReference = ref(storage, 'images/First.jpg');
    // Create a reference from a Google Cloud Storage URI
    const gsReference = ref(storage, 'gs://bucket/images/First.jpg');
    // Create a reference from an HTTPS URL
    // Note that in the URL, characters are URL escaped!
    const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/todo-app-6ddc5.appspot.com/o/images%2FFirst.jpg?alt=media&token=f2f75aa4-2a9c-4d33-8f55-af15d7d88b3c');
    console.log('Succeeded!')
  }

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleUpload() {
      if (!file) {
        alert("Please choose a file first!")
      }
      const storage = getStorage();
      const storageRef = ref(storage,`/images/`)
      const uploadTask = uploadBytesResumable(storageRef, file);
     
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
        }
      );
    }

  const classes = useStyles();
  const {
    title,
    price,
    color,
    firstImage,
    secondImage,
    thirdImage,
    fourthImage,
    fifthImage,
  } = props;

  return(    
    <Box className={classes.Container}>
      <Box>
        <Image src={firstImage} className={classes.Image} />
        <Box>
          <Typography sx={{fontWeight:'900', padding:'2%', fontSize:'1rem', textDecorationLine:'underline'}}>{title}</Typography>
          <Typography sx={{ padding:'2%', width:'93%', textAlign:'end', fontSize:'1rem', color:'#ff3131'}}>${price}</Typography>
        </Box>
        <CustomButton onClick={()=>setShowModal(true)} title='View Details' className={classes.DetailsButton} style={{fontSize:'100%', border:'1px solid black', fontWeight:'900', color:'blue'}} />
       
          {/* <Typography>{percent}</Typography>
          <input type='file' onChange={handleChange} accept="" />
          <Button onClick={handleUpload}>Upload</Button> */}

        <CustomModal show={showModal} confirmOrder={ConfirmOrder} close={()=>setShowModal(false)}
          title={title} price={price} color={color}
          firstImage={firstImage} secondImage={secondImage} thirdImage={thirdImage}
          fourthImage={fourthImage} fifthImage={fifthImage}
        />
      </Box>
    </Box>
  )
}