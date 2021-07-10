import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import theme from './Theme'
//tags
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import BodyPages from './Layout/BodyPages'
//style
import './Style/shop_style.css'

function App() {

const lang='fa'
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}
  return (
     <RTL>
         <ThemeProvider theme={{ ...theme, direction: lang === "fa" ? 'rtl' : 'ltr' }}>
          <Header />
            <BodyPages />
          <Footer />
          </ThemeProvider>
    </RTL>
  );
}

export default App;
