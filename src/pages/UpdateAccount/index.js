import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, TextField, Typography, Checkbox, Button, Divider } from "@mui/material";
import { getAuth, signInWithEmailAndPassword, signOut, updateCurrentUser, updateEmail, updatePassword } from "firebase/auth";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { db } from "../../firebase";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { collection, doc, getDocs, onSnapshot, query, QuerySnapshot, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
// const q = query(collection(db, 'users'), where('role', '==', 'admin'))

const ValidationSchema = Yup.object({
  oldEmail:Yup
  .string('Enter Email')
  .required('Email is required')
  .email('Invalid email format'),
  newEmail:Yup
  .string('Enter Email')
  .required('Email is required')
  .email('Invalid email format'),
  oldPassword:Yup
  .string('Enter Password')
  .required('No password provided')
  .min(6, 'Password is too short - must be 6 characters minimum.'),
  newPassword:Yup
  .string('Enter Password')
  .required('No password provided')
  .min(6, 'Password is too short - must be 6 characters minimum.'),
  confirmPassword:Yup
  .string()
  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match!')
})

const useStyles = makeStyles((theme)=>({
  Container:{
    width:'100vw',
    paddingInline:'5vw',
    backgroundColor:'skyblue'
  },
  InnerContainer:{
    paddingInline:'10vw'
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
  Input:{
    width:'100%',
    marginTop:'15px !important',
    borderRadius:'6px',
  },
  ErrorMessage:{
    paddingBottom:'5px'
  },
  Buttons:{
    width:'100%',
    marginTop:'15px !important',
    height:'54px'
  }
}))


export default function UpdateAccount(){
  const [oldPasswordInputType, setOldPasswordInputType] = useState('password');
  const [newPasswordInputType, setNewPasswordInputType] = useState('password');
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState('password');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [adminId, setAdminId] = useState();
  const classes = useStyles();
  const navigate = useNavigate();

  // useEffect(()=>{
  //   getAdminId();
  // },[])

  // const getAdminId=async()=>{
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach( async(doc) => {
  //     let id = doc.id;
  //     setAdminId(id)
  //   })
  // }

  // useEffect(()=>{
  // },[adminId])

  const Update =async(values)=>{
    const auth = getAuth();
    try{
      const res = await signInWithEmailAndPassword(auth, values.oldEmail, values.oldPassword)
      const adminId = res.user.uid;
      await updateEmail(auth.currentUser, values.newEmail);
      await updatePassword(auth.currentUser, values.newPassword);
      await updateDoc(doc(db, 'users', adminId),{
        authProvider:'google',
        email: values.newEmail,
        role:'admin',
        signupTime: serverTimestamp(),
      })
      console.log('Admin Updated')
      navigate('/login');
    }
    catch(error){
      console.log(error, ' = Error')
    }
  }

  const Logout=async()=>{
    await signOut();
    navigate('/login');
  }

  const oldPasswordVisibility =()=>{
    oldPasswordVisible?
    (
      setOldPasswordInputType('password'),
      setOldPasswordVisible(false)
    ):(
      setOldPasswordInputType('text'),
      setOldPasswordVisible(true)
    )
  }

  const newPasswordVisibility =()=>{
    newPasswordVisible?
    (
      setNewPasswordInputType('password'),
      setNewPasswordVisible(false)
    ):(
      setNewPasswordInputType('text'),
      setNewPasswordVisible(true)
    )
  }

  const confirmPasswordVisibility =()=>{
    confirmPasswordVisible?
    (
      setConfirmPasswordInputType('password'),
      setConfirmPasswordVisible(false)
    ):(
      setConfirmPasswordInputType('text'),
      setConfirmPasswordVisible(true)
    )
  }

  return(
    <Box className={classes.Container}>
      <Box className={classes.InnerContainer}>
        <Typography className={classes.AppName} >Update Your Account</Typography>
        <Formik initialValues={{oldEmail:'', oldPassword:'', newEmail:'', newPassword:'', confirmPassword:'' }} validationSchema={ValidationSchema} onSubmit={(values)=>Update(values)}>
          {({handleSubmit, values, errors, touched, setFieldValue, handleChange})=>(
            <Form>

              <TextField label='Old Email' value={values.oldEmail} type='text' name="oldEmail" error={errors.oldEmail && touched.oldEmail} className={classes.Input}
                onChange={handleChange}
              /><br></br>
              <Typography className={classes.ErrorMessage}>{errors.oldEmail && touched.oldEmail && errors.oldEmail}</Typography>

              <TextField label='Old Password' value={values.oldPassword} type={oldPasswordInputType} name='oldPassword' onChange={handleChange}
                InputProps={{endAdornment: oldPasswordVisible ? (<VisibilityOff onClick={oldPasswordVisibility} />) : (<RemoveRedEye onClick={oldPasswordVisibility} />)}}
                error={errors.oldPassword && touched.oldPassword}  className={classes.Input}
              />
              <Typography className={classes.ErrorMessage}>{errors.oldPassword && touched.oldPassword && errors.oldPassword}</Typography><br></br>

              <TextField label='New Email' value={values.newEmail} type='text' name="newEmail" error={errors.newEmail && touched.newEmail} className={classes.Input}
                onChange={handleChange}
              /><br></br>
              <Typography className={classes.ErrorMessage}>{errors.newEmail && touched.newEmail && errors.newEmail}</Typography>

              <TextField label='New Password' value={values.newPassword} type={newPasswordInputType} name='newPassword' onChange={handleChange}
                InputProps={{endAdornment: newPasswordVisible ? (<VisibilityOff onClick={newPasswordVisibility} />) : (<RemoveRedEye onClick={newPasswordVisibility} />)}}
                error={errors.newPassword && touched.newPassword}  className={classes.Input}
              />
              <Typography className={classes.ErrorMessage}>{errors.newPassword && touched.newPassword && errors.newPassword}</Typography>

              <TextField label='Confirm Password' value={values.confirmPassword} type={confirmPasswordInputType} name='confirmPassword' onChange={handleChange}
                InputProps={{endAdornment: confirmPasswordVisible ? (<VisibilityOff onClick={confirmPasswordVisibility} />) : (<RemoveRedEye onClick={confirmPasswordVisibility} />)}}
                error={errors.confirmPassword && touched.confirmPassword}  className={classes.Input}
              />
              <Typography className={classes.ErrorMessage}>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</Typography>

              <Button type='submit' onClick={handleSubmit} variant='contained' className={classes.Buttons}>Update Account</Button><br></br>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}