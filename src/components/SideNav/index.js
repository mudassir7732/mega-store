import { Box } from "@mui/material";
import SideBar from "../SideBar";

export default function SideNav({children}){
  return(
    <Box sx={{display:'flex', flexDirection:'row', width:'100%'}}>
      <SideBar />
      {children}
    </Box>
  )
}