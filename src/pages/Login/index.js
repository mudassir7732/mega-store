import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, responsiveFontSizes, Snackbar, IconButton,   TextField, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider,
  setPersistence, browserSessionPersistence, inMemoryPersistence, signInWithRedirect} from "firebase/auth";
import background from '../../assets/images/a8.jpg';
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { addDoc, collection, getDocs, where, query, onSnapshot, orderBy, serverTimestamp} from "firebase/firestore";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { db } from "../../firebase";
import GoogleButton from "react-google-button";
import { Close } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
// import { add_user } from "../../store/reducers/globalVariable";
import * as Yup from 'yup';
import { Form, Formik} from "formik";
import { async } from "@firebase/util";
import LocalStorageService from "../../utils/LocalStorageService";
// const usersRef = collection(db, 'users');
const q = query(collection(db, 'users'), where('role', '==', 'admin'));

const ValidationSchema = Yup.object({
  email:Yup
  .string('Enter Email')
  .required('Email is required')
  .email('Invalid email format'),
  password:Yup
  .string('Enter Password')
  .required('No password provided')
  .min(6, 'Password is too short - must be 6 characters minimum.'),
  confirmPassword:Yup
  .string()
  .oneOf([Yup.ref('pass'), null], 'Must match "password" field value')
})

const useStyles = makeStyles((theme)=>({
  Container:{
    minHeight:'100vh',
    maxWidth:'100vw',
    margin:'-8px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    backgroundImage: `url(${background})`,
    backgroundAttachment:'fixed',
    backgroundSize:'auto 100%',
  },
  InnerContainer:{
    minWidth:'40vw',
    maxWidth:'80vw',
  },
  Input:{
    width:'100%',
    marginTop:'15px !important',
    borderRadius:'6px',
  },
  AppName:{
    fontSize:'30px  !important',
    color:'navy',
    textAlign:'center',
    fontWeight:'900 !important',
    textDecorationLine:'underline',
    [theme.breakpoints.up('xs')]: {
      fontSize:'20px !important',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize:'25px !important',
    },
    [theme.breakpoints.up('md')]: {
      fontSize:'30px !important',
    },
  },

  Title:{
    fontSize:'20px !important',
    alignSelf:'center',
    textAlign:'left',
    fontWeight:'600 !important',
    typography:{
      fontSize:{
        xs:'body1',
        sm:'body2'
      }
    }
  },
  Buttons:{
    width:'100%',
    marginTop:'15px !important',
    height:'54px'
  }
}))

export default function Login(){
  const [visible, setVisible] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [openSnackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Snackbar');
  const classes = useStyles();
  const navigate = useNavigate();
  const auth = getAuth();
  // const dispatch = useDispatch();

  const passwordVisibility = ()=>{
    if(visible===true){
      setInputType('password')
      setVisible(false);
    }
    else if(visible===false){
      setInputType('text');
      setVisible(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <Button onClick={handleClose}>UNDO</Button>
      <IconButton onClick={handleClose}>
        <Close fontSize="small" sx={{color:"white"}} />
      </IconButton>
    </React.Fragment>
  )

  const SendAPasswordResetEmail=(values)=>{
    console.log(values.email, ' = Email')
    if(email.trim()){
      sendPasswordResetEmail(auth, email)
      .then(()=>{
        console.log('Password Reset Email Sent!');
        setEmail('');
      })
      .catch((err) => {
        console.log(err, '= Error')
      });
    }
    else{
      alert('Enter Email!')
    }
  }

  const Login = async(values) => {
    try{
      const res = await signInWithEmailAndPassword(auth, values.email, values.password);
      localStorage.setItem('UserId', res.user.uid);
      console.log(localStorage.getItem('Approved'), ' = Approved in Login')
      const user = res.user;
      // LocalStorageService.setToken(user.getIdToken)
      // const a = LocalStorageService.getAccessToken;
      // console.log(a, ' = AccessToken')

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach( async(doc) => {
        let admin = doc.data();
        admin?.email === user.email?
        (
          admin.uid === user.uid?
          (
            navigate('/AdminPanel')
          ):(
            navigate('/Home')
          )
        ):(
          navigate('/Home')
        )
      });
    }
    catch(error){
      console.log(error.code, '= Login Error')
      if(error.code === 'auth/user-not-found'){
        setSnackbarMessage('User not found, Please Signup')
        setSnackbar(true)
      }
      else if(error.code === 'auth/invalid-email'){
        setSnackbarMessage('Invalid Email, Please enter correct Email!');
        setSnackbar(true);
      }
      else if(error.code === 'auth/wrong-password'){
        setSnackbarMessage('Wrong Password!');
        setSnackbar(true)
      }
    }
  }

  const GoogleLogin=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(async(result) => {
      const user = result?.user;
      const q = query(collection(db, "users"), where("uid","==",user.uid))
      const docs = await getDocs(q);
      if(docs.docs.length === 0){
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
        console.log('docs.docs.length = 0')
      }
      console.log('Successfully Logged In');
      navigate('/Home');
    })
    .catch((error) => {
      console.log(error, ' = Google Login Error')
    });
  }

  return(    
    <Box className={classes.Container}>
      <Box className={classes.InnerContainer}>
        <Typography className={classes.AppName} >Welcome to nTask</Typography>
        <Typography className={classes.Title}>Login Here!</Typography>

        <Formik initialValues={{email:'', password:'', rememberPassword:false}} validationSchema={ValidationSchema} onSubmit={(values)=>Login(values)}>
          {({handleSubmit, values, errors, touched, setFieldValue, handleChange})=>(
            <Form>
              <TextField label='Email' value={values.email} type='text' name="email" error={errors.email && touched.email} className={classes.Input}
                onChange={handleChange}
              /><br></br>
              <Typography>{errors.email && touched.email && errors.email}</Typography>
              <TextField label='Password' value={values.password} type={inputType} name='password' onChange={handleChange}
                InputProps={{endAdornment: visible ? (<VisibilityOffIcon onClick={passwordVisibility} />) : (<RemoveRedEyeIcon onClick={passwordVisibility} />)}}
                error={errors.password && touched.password}  className={classes.Input}
              />
              <Typography>{errors.password && touched.password && errors.password}</Typography>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  <Checkbox name='rememberPassword' checked={values.rememberPassword} onChange={handleChange} />
                  <Typography sx={{pt:'10px'}}>Remember Me</Typography>
                </Box>
                <Button onClick={(values)=>SendAPasswordResetEmail(values)} sx={{color:'navy', float:'right', fontWeight:'regular'}}>Forgot Password?</Button>
              </Box>
              <Button type='submit' onClick={handleSubmit} variant='contained' className={classes.Buttons}>Login</Button><br></br>
            </Form>
          )}
        </Formik>

        <Snackbar anchorOrigin={{vertical:'top', horizontal:'right'}}
          open={openSnackbar}
          onClose={handleClose}
          autoHideDuration={4000}
          message = {snackbarMessage}
          action={action}
        />
        <Box sx={{display:'flex', flexDirection:'row', marginTop:'25px'}}>
          <Box sx={{backgroundColor:'#404040', height:'1.4px', width:'42%', marginTop:'10px'}}></Box>
          <Typography sx={{margin:'auto',}}>OR</Typography>
          <Box sx={{backgroundColor:'#404040', height:'1.4px', width:'42%', marginTop:'10px'}}></Box>
        </Box>
        <GoogleButton onClick={GoogleLogin} style={{width:'99.7%', borderRadius:5, border:'0.5px groove #318CE7', marginTop:'20px'}} />
        <Box sx={{display:'flex', flexDirection:'row', paddingTop:'10px'}}>
          <Typography sx={{fontSize:'17px', pt:'6px', fontWeight:'regular'}}>Don't have an account?</Typography>
          <Button onClick={()=>navigate('/signup')} sx={{color:'navy', fontSize:'15px', fontWeight:'regular'}}>Signup</Button>
        </Box>
      </Box>
    </Box>
  )
}