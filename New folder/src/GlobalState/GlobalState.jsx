import React,{useState,useCallback,useContext} from 'react'
import axios from 'axios'
import { DataContext } from './DataContext.js'


const GlobalState = ({children}) => {

    const UserDataState=window.localStorage.getItem('UserData')
    const UserData =UserDataState ? JSON.parse(window.localStorage.getItem("UserData")) : false 

    const [logstate,setlogstate]=useState(UserDataState)
    const [ordercount,setordercount]=useState(0)
    const [myorders,setmyorders]=useState({})

    const LogIn=useCallback(()=>{
        setlogstate(true)
    },[])
    
    const LogOut=useCallback(()=>{
        setlogstate(false)
    },[])

    const myBag=()=>{
        axios.post(`http://localhost:5000/Sale/showorder`,{
          'userid':UserData.userId
        })
        .then(function (response) {
            //handle success
            setordercount(response.data.data.orderItems.length)
            setmyorders(response.data.data)
            console.log(response.data.data.totalprice+" <<<<")
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    const provider={

        userdata: UserData,
        isLogged:logstate,
        login:LogIn,
        logout:LogOut,
        mybag:myBag,
        ordercount:ordercount,
        myorders:myorders
    }

    return (
        <DataContext.Provider value={provider}>
            {children}
        </DataContext.Provider>
    )
}

export default GlobalState
