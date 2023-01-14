import { Box, Button, Divider } from "@mui/material";
import CardsCotnainer from "../../components/CardsContainer";
import CustomCarousel from "../../components/Carousel";
import TopBar from "../../components/TopBar";
import a1 from "../../assets/images/abc.jpg";
import a2 from "../../assets/images/abc2.jpg";
import a3 from "../../assets/images/abc3.jpg";
import a4 from "../../assets/images/abc4.jpg";
import a5 from "../../assets/images/abc5.jpg";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const imagesArray = [a1, a2, a3, a4, a5];

export default function Home() {
  const navigate = useNavigate();

  const Logout = async () => {
    const auth = getAuth();
    await auth.signOut();
    console.log("Signed out!!!");
    navigate("/login");
  };

  return (
    <Box>
      <TopBar />
      <CustomCarousel
        images={imagesArray}
        style={{ width: "100%", marginTop: "2vh" }}
      />
      <Divider orientation="horizontal" />
      <CardsCotnainer />
      <Button onClick={Logout}>Logout</Button>
    </Box>
  );
}
