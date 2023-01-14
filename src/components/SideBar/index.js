import { useEffect } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/logo6.jpg';
import background from '../../assets/images/AdminPanel.jpg';
import Image from "../Image";
import { makeStyles } from "@mui/styles";
import CustomButton from '../../components/Button/index';
import { signOut } from "firebase/auth";

const useStyles = makeStyles({
  Container:{
    backgroundImage:`url(${background})`,
    backgroundPosition:'center',
    width:'30%',
    minHeight:'100vh'
  },
  Logo:{
    width:'60%',
    marginInline:'20%',
    marginBlock:'10%',
    borderRadius:'50%'
  },
  LinkContainer:{
    height:'6%',
    width:'96%',
    margin:'auto',
    backgroundColor:'whitesmoke',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  LinkTitle:{
    color:'black',
  }
})

export default function SideBar(){
  const classes = useStyles();

  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/stock')
  },[])

  const Logout=async()=>{
    try{
      await signOut();
      console.log('Logged Out')
    }
    catch(err){
      console.log(err, ' = Error')
    }
  }
  return(
    <Box className={classes.Container}>
      <Image src={Logo} className={classes.Logo}/>
      <Link to='/stock' style={{textDecoration:'none'}}>
        <Box className={classes.LinkContainer}>
          <Typography className={classes.LinkTitle}>Stock</Typography>
        </Box>
      </Link>
      <Divider />
      <Link to='/users' style={{textDecoration:'none'}}>
        <Box className={classes.LinkContainer}>
          <Typography className={classes.LinkTitle}>Users</Typography>
        </Box>
      </Link>
      <Divider />
      <Link to='/add-to-store' style={{textDecoration:'none'}}>
        <Box className={classes.LinkContainer}>
          <Typography className={classes.LinkTitle}>Add New Items</Typography>
        </Box>
      </Link>
      <Divider />
      <Link to='/update-account' style={{textDecoration:'none'}}>
        <Box className={classes.LinkContainer}>
          <Typography className={classes.LinkTitle}>Update Account</Typography>
        </Box>
      </Link>
      <Divider />
      <Box className={classes.LinkContainer}>
        <CustomButton title='Logout' onClick={()=>navigate('/login')} variant='text' style={{color:'black', fontSize:'14px'}}/>
      </Box>
    </Box>
  )
}

// import React, { useState, useEffect } from "react";
// import Card from "../Card";
// import AppLogo from "../../assets/logo.png";
// import { Box, Divider } from "@mui/material";
// import theme from "../../theme";
// import { StyledNavItem } from "./styles";
// import Logout from "../../assets/svg/logout.svg";
// import Request from "../../assets/svg/request.png";
// import RequestAdvance from "../../assets/svg/newRequest.svg";
// import Setting from "../../assets/svg/setting.svg";
// import Privacy from "../../assets/svg/privacy.svg";
// // import Condition from "../../assets/svg/condition.svg";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// // import { SNACKBAR_OPEN } from "../../store/constants/common";
// // import { ERROR } from "../../constants/snackbarTypes";
// // import { Interceptor } from "../../utils/interceptor";
// import { useLocation } from "react-router-dom";
// import LocalStorageService from "../../utils/localStorageService";
// // import { EMPLOYEE, EMPLOYER } from "../../constants/userTypes";
// // import { useDispatch, useSelector } from "react-redux";
// // import { CLEAR_PERSIST_SLICE } from "../../store/constants/common";

// export default function SideNav() {
//   const axiosInstance = Interceptor();
//   const history = useHistory();
//   const [activeTab, setActiveTab] = useState(1);

//   const dispatch = useDispatch();
//   const { pathname, state } = useLocation();

//   const userType = useSelector((state) => state.persist.userData.user.role);

//   useEffect(() => {
//     switch (pathname) {
//       case "/my-requests":
//       case "/my-employees":
//         setActiveTab(1);
//         break;
//       case "/new-request":
//       case "/received-requests":
//         setActiveTab(2);
//         break;
//       case "/account-setting":
//         setActiveTab(3);
//         break;
//     }
//   }, [pathname]);

//   // useEffect(() => {
//   //   if (state?.openPopup) {
//   //     setActiveTab(2);
//   //   }
//   // }, [state]);

//   const handleLogout = () => {
//     dispatch({
//       type: CLEAR_PERSIST_SLICE,
//     });
//     history.push("/login");
//     LocalStorageService.clearToken();
//   };
//   const handleAddNewRequest = () => {
//     axiosInstance
//       .get("employee/advance-status")
//       .then(() => {
//         history.push("/new-request", { openPopup: true });
//       })
//       .catch((error) => {
//         const errors = error?.response?.data?.errors;
//         errors.map((error) => {
//           dispatch({
//             type: SNACKBAR_OPEN,
//             payload: {
//               snackbarType: ERROR,
//               message: error.message,
//             },
//           });
//         });
//       });
//   };

//   return (
//     <Card
//       sx={{
//         backgroundColor: "#fff",
//         borderRadius: "8px",
//         position: "relative",
//         maxWidth: "260px",
//         width: "100%",
//         margin: "unset",
//         display: "Flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       <Box>
//         <Box py={1}>
//           <img width={"150px"} src={AppLogo} alt="logo" />
//         </Box>
//         <Divider
//           sx={{
//             backgroundImage: theme.palette.gradient,
//             opacity: "0.25",
//             backgroundColor: "transparent",
//           }}
//         />
//         <Box
//           sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
//           py={1.5}
//         >
//           {userType === EMPLOYEE ? (
//             <>
//               <Link to="/my-requests" style={{ textDecoration: "none" }}>
//                 <StyledNavItem
//                   sx={{
//                     backgroundColor:
//                       activeTab === 1 ? "#00000011" : theme.palette.white,
//                   }}
//                 >
//                   <img src={Request} alt="request" />
//                   <span> My Requests</span>
//                 </StyledNavItem>
//               </Link>
//               <StyledNavItem
//                 onClick={handleAddNewRequest}
//                 sx={{
//                   backgroundColor:
//                     activeTab === 2 ? "#00000011" : theme.palette.white,
//                 }}
//               >
//                 <img src={RequestAdvance} alt="img" />
//                 <span>Request New Advance</span>
//               </StyledNavItem>
//             </>
//           ) : (
//             <>
//               <Link to="/my-employees" style={{ textDecoration: "none" }}>
//                 <StyledNavItem
//                   sx={{
//                     backgroundColor:
//                       activeTab === 1 ? "#00000011" : theme.palette.white,
//                   }}
//                 >
//                   <img src={Request} alt="request" />
//                   <span> My Employees</span>
//                 </StyledNavItem>
//               </Link>
//               <StyledNavItem
//                 onClick={() => history.push("/received-requests")}
//                 sx={{
//                   backgroundColor:
//                     activeTab === 2 ? "#00000011" : theme.palette.white,
//                 }}
//               >
//                 <img src={RequestAdvance} alt="img" />
//                 <span>Received Requests</span>
//               </StyledNavItem>
//             </>
//           )}
//           <Box
//             sx={{
//               paddingTop: "20%",
//               display: "flex",
//               flexDirection: "column",
//               gap: "5px",
//             }}
//           >
//             <Link to={"/account-setting"} style={{ textDecoration: "none" }}>
//               <StyledNavItem
//                 sx={{
//                   backgroundColor:
//                     activeTab === 3 ? "#00000011" : theme.palette.white,
//                 }}
//               >
//                 <img src={Setting} alt="img" />
//                 <span>Profile Settings</span>
//               </StyledNavItem>
//             </Link>
//             <Link
//               to={"/terms-and-conditions"}
//               style={{ textDecoration: "none" }}
//             >
//               <StyledNavItem>
//                 <img src={Condition} alt="img" />

//                 <span style={{ marginLeft: "-2px" }}>
//                   {userType === EMPLOYER
//                     ? " Aggrement"
//                     : "Terms and Conditions"}
//                 </span>
//               </StyledNavItem>
//             </Link>
//             <Link to={"/privacy-policy"} style={{ textDecoration: "none" }}>
//               <StyledNavItem
//                 sx={{
//                   backgroundColor:
//                     activeTab === "4" ? "#00000011" : theme.palette.white,
//                 }}
//               >
//                 <img src={Privacy} alt="img" />
//                 <span>Privacy Policy</span>
//               </StyledNavItem>
//             </Link>
//           </Box>
//         </Box>
//       </Box>
//       <Box py={1.5}>
//         {/* <Link to={"/"} style={{ textDecoration: "none" }}> */}
//         <StyledNavItem onClick={handleLogout}>
//           <img src={Logout} />
//           Logout
//         </StyledNavItem>
//         {/* </Link> */}
//       </Box>
//     </Card>
//   );
// };