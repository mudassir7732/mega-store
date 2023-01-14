import { StrictMode } from 'react';
import { Box, ThemeProvider} from '@mui/material';
import { Provider } from 'react-redux';
import AppRoutes from './routes';
import store from './store/index';
import theme from './theme';

export default function App(){
  return(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Box sx={{overflowX:'hidden'}}>
            <AppRoutes />
          </Box>
        </Provider>
      </ThemeProvider>
    </StrictMode>
  )
}