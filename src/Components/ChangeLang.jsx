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
      userLanguageChange('fa')
      // window.location.reload()    //get new data from localstorage
      document.body.dir = "rtl";
    }
    else{
      window.localStorage.setItem('lang', 'en');
      userLanguageChange('en')
        // window.location.reload()    //get new data from localstorage
      document.body.dir = "ltr";
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
