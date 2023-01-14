import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import background from '../../assets/images/AdminPanel.jpg';
import SideNav from "../../components/SideNav";

const useStyles = makeStyles({
  Container:{
    backgroundImage:`url(${background})`,
    minHeight:'100vh',
    display:'flex',
    flexDirection:'row'
  },
  SideBar:{
    minHeight:'100vh',
    minWidth:'20vw',
    backgroundColor:'#0f0014',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  Logo:{
    height:'100px',
    width:'100px',
    marginBlock:'20px',
    borderRadius:'50px'
  },
  ButtonStyle:{
    color:'white',
    fontSize:'15px !important'
  }
})

export default function AdminPanel(){
  const classes = useStyles();  
  return(
    <Box className={classes.Container}>
      <SideNav />      
    </Box>
  )
}