import { createMuiTheme , colors } from '@material-ui/core';
// import { createTheme } from '@material-ui/core/styles';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    background: {
      dark: '#F4F6F8',
      default: 'FAFAFA',
      paper: colors.common.white
    },
    primary: {
      main: '#2D323E',
      text: '#585858',
      darkGray: '#9F9F9F',
      lightGray: '#EAEAEA',
      white: '#FAFAFA',

      lightBlue: '#57C0ED',
      darkBlue: '#2DA5D9',
      blue: '#475974',

      lightGreen: '#13C356',
      darkGreen: '#17AA4F',
      lightRed: '#F22E52',
      darkRed: '#D91A3C',
      yellow: '#FFE733'
    },
    secondary: {
      main: '#57C0ED'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f'
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00'
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2'
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c'
    }
  },
  shadows,
  typography
})

export default theme;
