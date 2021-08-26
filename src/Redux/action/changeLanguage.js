import {
    SET_LANGUAGE_TEXT
} from '../constants/Constants';

export function changeLanguage(data) {
    // const lang = data==="fa"? "rtl" : "ltr"
    // document.body.dir = lang;
    setTimeout(() => {
        window.location.reload();
    }, 100);
   
    return {
        type: SET_LANGUAGE_TEXT,
        payload: data
    }
}