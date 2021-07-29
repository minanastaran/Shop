import React, { useEffect } from 'react';
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
import { LanguageProvider } from './Languages/Provider.js';
//style
import './Style/shop_style.css'

function App() {
  const lang = window.localStorage.getItem('lang');
  const UserData = window.localStorage.getItem('UserData')
  console.log(UserData +" <<")
  
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
    <RTL>
      <ThemeProvider theme={{ ...theme, direction: lang === "fa" ? 'rtl' : 'ltr' }}>
        <LanguageProvider >
          <Header />
          <BodyPages />
          <Footer />
        </LanguageProvider>
      </ThemeProvider>
    </RTL>
  );
}

export default App;
