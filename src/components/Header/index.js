import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "../Button";
import { makeStyles } from "@mui/styles";
import Logo from "../../assets/images/logo6.jpg";
import background from "../../assets/images/bg9.jpg";
import Image from "../Image";
import { useNavigate } from "react-router-dom";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { db } from "../../firebase/index";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
const q = query(
  collection(db, "orders"),
  where("u id", "==", localStorage.getItem("UserId"))
);

const useStyles = makeStyles((theme) => ({
  Container: {
    minHeight: "18vh",
    maxHeight: "20vh",
    width: "100vw",
    display: "flex",
    justifyContent: "space-between",
    backgroundImage: `url(${background})`,
    backgroundSize: "100vw",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  Logo: {
    borderRadius: "30px",
    [theme.breakpoints.down("sm")]: {
      height: "40px",
    },
    [theme.breakpoints.up("sm")]: {
      height: "55px",
    },
    [theme.breakpoints.up("md")]: {
      height: "20vh",
    },
  },
  LinksContainer: {
    display: "flex",
    paddingRight: "10vw",
    width: "fit-content",
    flexDirection: "row",
    alignItems: "center",
  },
  Links: {
    color: "white",
    width: "auto",
    textDecorationLine: "underline",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px !important",
      marginLeft: "-15px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "12px !important",
      marginLeft: "-5px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "15px !important",
      marginLeft: "2px",
    },
  },
  CartSize: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px !important",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "22px !important",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "24px !important",
    },
    CartItemsNumber: {
      color: "white",
      fontWeight: "900",
      backgroundColor: "dodgerblue",
      paddingInline: "11%",
      borderRadius: "8px",
      textAlign: "center",
      marginBlock: "auto",
      fontSize: "100%",
    },
  },
}));

export default function Header() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setItems(
      onSnapshot(q, (snapshot) => {
        snapshot.docs.map((item) => ({
          id: item.id,
          data: item.data(),
        }));
      })
    );
  }, []);

  useEffect(() => {
    console.log(items, " = Items");
  }, []);

  return (
    <Box className={classes.Container}>
      <Image src={Logo} className={classes.Logo} />
      <Box className={classes.LinksContainer}>
        <CustomButton
          title={"Home"}
          onClick={() => navigate("/home")}
          variant="text"
          className={classes.Links}
        />
        <CustomButton
          title={"All Products"}
          onClick={() => navigate("/AllProducts")}
          variant="text"
          className={classes.Links}
        />
        <CustomButton
          title={"About"}
          onClick={() => navigate("/About")}
          variant="text"
          className={classes.Links}
        />
        <CustomButton
          title={"Contact"}
          onClick={() => navigate("/Contact")}
          variant="text"
          className={classes.Links}
        />
        <CustomButton
          title={"Account"}
          onClick={() => navigate("/Account")}
          variant="text"
          className={classes.Links}
        />
        <Box sx={{ pt: "0%", display: "flex", flexDirection: "row" }}>
          <CustomButton
            isIcon={true}
            className={classes.CartSize}
            onClick={() => navigate("/Cart")}
            iconName={
              <ShoppingCartCheckout
                style={{ color: "white", fontSize: "110%" }}
              />
            }
          />
          <Typography sx={classes.CartItemsNumber}>{items?.length}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
