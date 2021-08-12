import { createContext } from "react";

export const DataContext=createContext({
    userdata:null,
    
    isLogged:false,
    login:()=>{},
    logout:()=>{},

    mybag:()=>{},
    ordercount:0,
    myorders:{}
})