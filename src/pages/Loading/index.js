import { useEffect } from "react";
import { Box} from "@mui/material";
import background from '../../assets/images/bg8.gif';
import { useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Loading(){
  const navigate = useNavigate();

  useEffect(()=>{    
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
      if(!user){
        setTimeout(() => {
          navigate('/login')
        }, 4000);
      }
      else{
        setTimeout(() => {
          navigate('/home')
        }, 4000);
      }
    })
  })
  
  return(
    <Box>
      <Image src={background} style={{height:'100vh', width:'100vw'}} />
    </Box>
  )
}