import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xxs: 150,
      mxs: 300,
      xsm: 450,
      sm: 600,
      msm: 780,
      md: 960,
      mmd: 1120,
      lg: 1280,
      mlg: 1600,
      xl: 1920,
    },
  },
})
export default theme;