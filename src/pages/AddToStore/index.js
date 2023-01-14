import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {ref, getStorage, uploadBytes} from 'firebase/storage'
import { Form, Formik } from "formik";
import { db } from "../../firebase";
import * as Yup from "yup";
import { useEffect, useState } from "react";
const q = query(collection(db, "stock"));

const ValidationSchema = Yup.object({
  title: Yup.string("Enter Title").required("Title is required"),
  // ._type(),
  price: Yup.number("Digits only")
    .required("No price provided")
    .positive("Price can't be negative"),
  // .integer()
  // .min(),
  color: Yup.string("Characters only"),
});

const useStyles = makeStyles({
  Container: {
    width: "100vw",
    paddingInline: "5vw",
    backgroundColor: "skyblue",
  },
  InnerContainer: {
    paddingInline: "10vw",
  },
  Input: {
    width: "100%",
    marginTop: "15px !important",
    borderRadius: "6px",
  },
  Buttons: {
    width: "100%",
    marginTop: "15px !important",
    height: "54px",
    "&:hover": {
      color: "white",
    },
  },
});

export default function AddToStore() {
  const [file, setFile] = useState();
  const [items, setItems] = useState([]);
  const classes = useStyles();

  const handleStorage=(e)=>{
    const file = e.target.files[0];
    console.log("FileName", file)
    const uploadTask = storageRef.ref('images/').child(file.name).put(file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("error:-", error)
      },
      () => {
        const uniId = guidGenerator().toString();
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          firestore.collection("All_Files").doc(uniId).set({
            file_name: file.name.toString(),
            id: uniId,
            download_url: downloadURL.toString()
          })
          .then(() => {
            console.log("Document successfully written!");
          })
           .catch((error) => {
            console.error("Error writing document: ", error);
          });
        });
      }
    )
  }
  let i=0;
  
  useEffect(()=>{
    const q = query(collection(db, 'stock'));
    onSnapshot(q, (snapshot)=>{
      setItems(snapshot.docs.map(item=>{
      }))
    })
  },[])

  useEffect(()=>{
    console.log(items.length, ' = Counter')
  },[items])

  const Upload = (v) => {
    const index = items.length;
    const z = index.toString();
    setDoc(doc(db, "stock", z), {
      title: v.title,
      price: v.price,
      color: v.color,
      firstImage: v.first,
      secondImage: v.second,
      thirdImage: v.third,
      fourthImage: v.fourth,
      fifthImage: v.fifth,
      timestamp: serverTimestamp(),
    });
    console.log("Uploaded");
  };

  const handleImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box className={classes.Container}>
      <Box className={classes.InnerContainer}>
        <Formik
          initialValues={{ title: "", price: "", color: "", first:'', second:'', third:'', fourth:'', fifth:'' }}
          onSubmit={(values) => Upload(values)}
          validationSchema={ValidationSchema}
        >
          {({
            handleSubmit,
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
          }) => (
            <Form>
              <TextField
                label="Title"
                value={values.title}
                name="title"
                onChange={handleChange}
                error={errors.title && touched.title}
                className={classes.Input}
              />
              <Typography>
                {errors.title && touched.title && errors.title}
              </Typography>
              <TextField
                type="number"
                label="Price"
                value={values.price}
                name="price"
                onChange={handleChange}
                error={errors.price && touched.price}
                className={classes.Input}
              />
              <Typography>
                {errors.price && touched.price && errors.price}
              </Typography>
              <TextField
                label="Color"
                value={values.color}
                name="color"
                onChange={handleChange}
                error={errors.color && touched.color}
                className={classes.Input}
              />
              <br></br>
              <Typography>
                {errors.color && touched.color && errors.color}
              </Typography>
              <br></br>
              <TextField
                variant="standard"
                type="file"
                name="first"
                onChange={(e) => {  
                  console.log(URL.createObjectURL(e.target.files[0]),":image Value")
                  setFieldValue(
                    "first",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
              /><br></br>
              <TextField
                variant="standard"
                type="file"
                name="second"
                onChange={(e) => {  
                  console.log(URL.createObjectURL(e.target.files[0]),":image Value")
                  setFieldValue(
                    "second",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
              /><br></br>
              <TextField
                variant="standard"
                type="file"
                name="third"
                onChange={(e) => {  
                  console.log(URL.createObjectURL(e.target.files[0]),":image Value")
                  setFieldValue(
                    "third",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
              /><br></br>
              <TextField
                variant="standard"
                type="file"
                name="fourth"
                onChange={(e) => {  
                  console.log(URL.createObjectURL(e.target.files[0]),":image Value")
                  setFieldValue(
                    "fourth",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
              /><br></br>
              <TextField
                variant="standard"
                type="file"
                name="fifth"
                onChange={(e) => {  
                  console.log(URL.createObjectURL(e.target.files[0]),":image Value")
                  setFieldValue(
                    "fifth",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
              /><br></br>
              <Button
                variant="contained"
                className={classes.Buttons}
                type="submit"
                onClick={handleSubmit}
              >
                Upload
              </Button>
            </Form>
          )}
        </Formik>
        {/* <TextField variant='filled' type='file' onChange={(e)=>setFile(URL.createObjectURL(e.target.files[0]))} /> */}
        {/* <input type='file' onChange={handleStorage} /> */}
        {/* <Button variant='contained' onClick={handleStorage}>Handle Storage</Button> */}
      </Box>
    </Box>
  );
}
