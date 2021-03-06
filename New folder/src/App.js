import React, { useEffect,useContext } from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import theme from './Theme'
//tags
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import BodyPages from './Layout/BodyPages'
//component
import { LanguageProvider ,LanguageContext} from './Languages/Provider.js';
import GlobalState from './GlobalState/GlobalState.jsx'
//style
import './Style/shop_style.css'
//redux
import {useSelector , useDispatch} from 'react-redux'

function App() {

  // const { directions,userLanguage, userLanguageChange } = useContext(LanguageContext);
  const lang = useSelector((state)=>state.lang.lang)
  console.log(lang)
  // console.log(userLanguage+" <<")

  // const lang = window.localStorage.getItem('lang');
  const UserData = window.localStorage.getItem('UserData')
  
  useEffect(() => {
    document.body.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang])
  
  // Configure JSS ------------------------------------------------
  const jss = create({ plugins: [...jssPreset().plugins, rtl({enabled:lang==='fa'})] });
  function RTL(props) {
    return (
      <StylesProvider jss={jss}>
        {props.children}
      </StylesProvider>
    );
  }

  return (
    <GlobalState>
    <RTL>
      <ThemeProvider theme={{ ...theme, direction: lang === "fa" ? 'rtl' : 'ltr' }}>
        <LanguageProvider >
          <Header />
          <BodyPages />
          <Footer />
        </LanguageProvider>
      </ThemeProvider>
    </RTL>
    </GlobalState>
  );
}

export default App;
