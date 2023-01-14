import {
  Facebook,
  Instagram,
  Pinterest,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomButton from "../Button";

const useStyles = makeStyles({
  Container: {
    backgroundColor: "#102791",
    minHeight: "6.6vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
  },
  IconsContainer: {
    marginLeft: "10vw",
    maxWidth: "40vw",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  IconStyle: {
    fontSize: "2.7vh",
    color: "white",
  },
  Text: {
    color: "white",
    fontSize: "12px !important",
    width: "100%",
    textAlign: "center",
  },
});

export default function TopBar() {
  const classes = useStyles();
  return (
    <Box className={classes.Container}>
      <Box className={classes.IconsContainer}>
        <CustomButton
          isIcon={true}
          iconName={<Facebook sx={{ color: "white", fontSize: "2.8vh" }} />}
        />
        <CustomButton
          isIcon={true}
          iconName={<Twitter sx={{ color: "white", fontSize: "2.8vh" }} />}
        />
        <CustomButton
          isIcon={true}
          iconName={<Instagram sx={{ color: "white", fontSize: "2.8vh" }} />}
        />
        <CustomButton
          isIcon={true}
          iconName={<Pinterest sx={{ color: "white", fontSize: "2.8vh" }} />}
        />
        <CustomButton
          isIcon={true}
          iconName={<YouTube sx={{ color: "white", fontSize: "2.8vh" }} />}
        />
      </Box>
      <Typography className={classes.Text}>
        FREE SHOPPING ON ORDERS OVER RS:2000
      </Typography>
    </Box>
  );
}
