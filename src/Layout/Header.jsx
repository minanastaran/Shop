import React,{useEffect} from 'react'
import { Container } from '@material-ui/core';
import {NavLink ,useHistory, useParams} from 'react-router-dom';
import ChangeLang from '../Components/ChangeLang.jsx';
import {MessageLang}  from '../Languages/Provider.js';

const Header = ({match}) => {

    const history=useHistory()
    let UserData=JSON.parse(window.localStorage.getItem('UserData'))

    let pid=useParams().id

    const headerlist=[
        {title:'header.home', link:'/',show:'all'},
        {title:'header.products', link:'/Products',show:'all'},
        // {title:'header.products.details', link:`/Product/${pid}`},
        
        {title:'header.addproduct', link:'/AddProduct',show:'user'},
        // {title:'header.user', link:'/users',show:'user'},
        // {title:'header.logout', link:'',show:'logout'},
    ]
   
    const UserLogout=()=>{
        window.localStorage.removeItem('UserData')
        history.replace()
    }

    return (
        <div className="Header">
            <Container className="header_container">
                <div className="header_menu_list">
                    <ul>
                        {headerlist.map((item,index)=>{
                        return(
                            <li key={index}>
                                <NavLink to={item.link} exact>
                                    <MessageLang id={item.title} />
                                </NavLink>
                            </li>
                        )
                        })}
                        {UserData ? 
                            <>
                            <li>
                                <NavLink to={`/Profile/${UserData.userId}`} exact>
                                    <MessageLang id={'header.profile'} />
                                </NavLink>
                            </li>
                            <li>
                                <span onClick={UserLogout}>
                                    <MessageLang id={'header.logout'} />
                                </span>
                            </li>
                            </>
                        :
                            <li>
                                <NavLink to={'/users'} exact>
                                    <MessageLang id={'header.user'} />
                                </NavLink>
                            </li>
                        }
                       
                    </ul>
                </div>
                <div>
                    <ChangeLang/>
                </div>
            </Container>
        </div>
    )
}
export default Header;