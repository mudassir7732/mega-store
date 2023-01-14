import * as React from "react";
import { Box, Button, Typography, TextField, InputAdornment, Checkbox, Snackbar, IconButton, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import background from '../../assets/images/f.jpg'
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { collection, addDoc, where, getDocs, query, serverTimestamp, setDoc, doc} from 'firebase/firestore';
import { makeStyles, styled, ThemeProvider } from "@mui/styles";
import GoogleButton from "react-google-button";
import { Close, RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { Form, Formik} from "formik";
import * as Yup from 'yup';

// import { useDispatch } from "react-redux";
// import { add_user } from "../../store/reducers/globalVariable";

const theme = createTheme({
  palette:{
    primary:{
      main:'#ff0000',
      background:'#0000ff'
    }
  }
})

const Container = styled('div')(({theme})=>({
  padding:theme.spacing(1),
  [theme.breakpoints.up('sm')]:{
    backgroundColor:theme.palette.primary.main,
  },
  [theme.breakpoints.up('md')]:{
    backgroundColor:theme.palette.primary.background,
  }
}))

// const Text = styled('p')(({theme})=>({
//   fontSize: theme.size(),
//   [theme.breakpoints.up('sm')]
// }))

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

const useStyles = makeStyles({
  Container:{
    minHeight:'100vh',
    maxWidth:'100vw',
    margin:'-8px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    backgroundImage: `url(${background})`,
    backgroundSize:'cover'
  },
  InnerContainer:{
    minWidth:'40vw',
    maxWidth:'80vw',
  },
  Title:{
    fontSize:'30px !important',
    fontWeight:'900 !important'
  },
  Input:{
    width:'100%',
    marginTop:'15px !important',
    borderRadius:'6px'
  },
  Register:{
    width:'100%',
    marginTop:'15px !important',
    height:'50px'
  }
})

export default function Signup(){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [inputType, setInputType] = React.useState('password');
  const [openSnackbar, setSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [helperTextMessage, setHelperTextMessage] = React.useState('');
  const navigate = useNavigate();
  const classes = useStyles();
  const auth = getAuth();
//   const dispatch = useDispatch();

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

  const Register = async(values) => {
    const res = await createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((res) => {
      const user = res?.user;
      setDoc(doc(db, 'users', user.uid),{
        uid: user.uid,  
        name: user.displayName,
        authProvider: 'gogole',
        email: user.email,
        role:'user',
        signupTime: serverTimestamp(),
      })
      console.log('Successfully Logged In');
      navigate('/Home');
    })
    .catch((error) => {
      console.log(error, ' = Google Login Error', error.code)
      if(error.code === 'auth/email-already-in-use'){
        setSnackbarMessage('Already Signed up! Please Login.')
        setSnackbar(true)
      }
      else if(error.code === 'auth/invalid-email'){
        setSnackbarMessage('Please enter correct email!')
      }
      else if(error.code === 'auth/weak-password'){
        setHelperTextMessage('Weak Password!')
        setTimeout(() => {
          setHelperTextMessage('')
        }, 5000);
      }
    });
  };

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

  const GoogleSignup=()=>{
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
      console.log(result, 'Successfully Logged In');
      navigate('/Home');
    })
    .catch((error) => {
      console.log(error, ' = Google Login Error')
    });
  }

  return(
    <Box className={classes.Container}>
      <Box className={classes.InnerContainer}>
        <Typography className={classes.Title}>Sign up!</Typography>
        {/* <Typography sx={{color:theme.palette.primary.main, backgroundColor:theme.palette.primary.background}}>Theme text</Typography> */}
        <Snackbar
          open={openSnackbar}
          anchorOrigin={{vertical:'top', horizontal:'right'}}
          autoHideDuration={4000}
          onClose={handleClose}
          message={snackbarMessage}
          action={action}
        />

        {/* <Container>
          <Typography>ksdjfgh</Typography>
        </Container> */}

        <Formik initialValues={{email:'', password:''}} validationSchema={ValidationSchema} onSubmit={(values)=>Register(values)}>
          {({handleSubmit, values, errors, touched, setFieldValue, handleChange})=>(
            <Form>
              <TextField label='Email' value={values.email} type='text' name="email" error={errors.email && touched.email} className={classes.Input}
                onChange={handleChange}
              /><br></br>
              <Typography>{errors.email && touched.email && errors.email}</Typography>
              <TextField label='Password' value={values.password} type={inputType} name='password' onChange={handleChange}
                InputProps={{endAdornment: visible ? (<VisibilityOff onClick={passwordVisibility} />) : (<RemoveRedEye onClick={passwordVisibility} />)}}
                error={errors.password && touched.password}  className={classes.Input}
              />
              <Typography>{errors.password && touched.password && errors.password}</Typography>
              <Button className={classes.Register} type='submit' onClick={handleSubmit} variant='contained' >Register</Button><br></br>
            </Form>
          )}
        </Formik>

        <Box sx={{display:'flex', flexDirection:'row', marginTop:'8px'}}>
          <Box sx={{backgroundColor:'#404040', height:'1.4px', width:'42%', marginTop:'10px'}} />
          <Typography sx={{margin:'auto',}}>OR</Typography>
          <Box sx={{backgroundColor:'#404040', height:'1.4px', width:'42%', marginTop:'10px'}} />
        </Box>
        <GoogleButton onClick={GoogleSignup} style={{width:'99.7%', borderRadius:5, border:'0.5px groove #318CE7', marginTop:'20px'}} />
        <Box sx={{display:'flex', flexDirection:'row', paddingTop:'10px'}}>
          <Typography sx={{pt:'6px'}}>Already a user?</Typography>
          <Button sx={{color:'navy', fontWeight:'regular'}} onClick={()=>navigate('/Login')}>Login</Button>
        </Box>
      </Box>
    </Box>
  )
}