import Header from '../Header';
import LayoutFooter from './LayoutFooter';
import { Box } from "@mui/material";

export default function Layout({children}){
  return(
    <Box>
      <Header />
        {children}
      <LayoutFooter />
    </Box>
  )
}