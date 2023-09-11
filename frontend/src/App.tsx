import "./App.css";
import AppRouter from "./AppRouter";
import { RecoilRoot } from "recoil";
import { createTheme, ThemeProvider  } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    greenary: Palette['primary'];
  }

  interface PaletteOptions {
    greenary?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    greenary: true;
  }
}

const theme = createTheme({
  palette: {
    greenary: {
      main: '#39A789',
      light: '#45CEA8',
      dark: '#35967B',
      contrastText: '#ffffff',
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RecoilRoot>
          <AppRouter />
        </RecoilRoot>
      </div>
    </ThemeProvider>
  );
}

export default App;
