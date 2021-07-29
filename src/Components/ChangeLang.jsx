// import React , {useContext} from 'react'
import React, { useContext } from 'react';
import { Box , Button , Typography} from '@material-ui/core';
import { LanguageContext } from '../Languages/Provider';
import { useHistory } from 'react-router';

export default function LanguageSelector({match}) {

  const history=useHistory()
  const { directions,userLanguage, userLanguageChange } = useContext(LanguageContext);
  const languagehandler=(state)=>{
    if(state==='fa'){
      window.localStorage.setItem('lang', 'fa');
      document.body.dir = "rtl";
      userLanguageChange('fa')
    }
    else{
      window.localStorage.setItem('lang', 'en');
      document.body.dir = "ltr";
      userLanguageChange('en')
    }
  }

  return (
    <Box className="lang">
        <Button
            className={`${userLanguage === "fa" && "active"}`}
            onClick={() => languagehandler('fa')}
        >فارسی</Button>
        <Typography
            align="center"
            color="textPrimary"
            variant="inherit"
        >|</Typography>
        <Button
            className={`${userLanguage === "en" && "active"}`}
            onClick={() => languagehandler('en')}
        >English</Button>
    </Box>
  );
};
