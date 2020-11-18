import { createMuiTheme } from '@material-ui/core/styles';

const font = "'Montserrat', 'sans-serif'";
const font2 = 'FredokaOne-Regular, Fredoka One';

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#467fcf' },
    secondary: {
      main: '#d5ff2c',
    },
    background: {
      default: '#e9f6f9',
    },
  },
  typography: {
    fontFamily: font,
    h3: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
      lineHeight: 1.65,
    },
    h1: {
      fontFamily: font2,
    },
    subtitle1: {
      lineHeight: 1.25,
    },
    overline: {
      color: 'black',
      lineHeight: 0.25,
    },
  },
});

export default theme;
