import React,{useState, useContext,useEffect} from 'react'
import { Container } from '@material-ui/core';
import {NavLink ,useHistory, useParams} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Bag from '../Components/Badge/BadgeComponent'
import ChangeLang from '../Components/ChangeLang.jsx';
import {MessageLang}  from '../Languages/Provider.js';
import MyBag from '../View/MyBag/MyBag';
import image1 from '../image/download (1).jfif'
//GS
import { DataContext } from '../GlobalState/DataContext';
//Redux
import { useSelector , useDispatch } from 'react-redux';

const Header = ({match}) => {

    const globaldata = useContext(DataContext)
    const history=useHistory()
    const mybag=useSelector((state)=> state.sale.orderitem)
    let loginstate= globaldata.isLogged //JSON.parse(window.localStorage.getItem('UserData'))
    let userdata = globaldata.userdata
    const [showbag,setshowbag]=useState(false)

    const headerlist=[
        {title:'header.home', link:'/',show:'all'},
        {title:'header.products', link:'/Products',show:'all'},
        {title:'header.addproduct', link:'/AddProduct',show:'user'},
    ]
   
    const UserLogout=()=>{
        window.localStorage.removeItem('UserData')
        // window.location.replace('/')
        globaldata.logout()
    }

    const openbag=()=>{
        setshowbag(true)
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
                        {loginstate ? 
                            <>
                            <li>
                                <NavLink to={`/manage`} exact>
                                    <MessageLang id={'header.manage'} />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/Profile/${userdata.userId}`} exact>
                                    <MessageLang id={'header.profile'} />
                                </NavLink>
                            </li>
                            <li>
                                <span onClick={UserLogout}>
                                    <MessageLang id={'header.logout'} />
                                </span>
                            </li>
                            <IconButton onClick={()=>openbag()}>
                                <Bag number={mybag && mybag.length} icon='bag' />
                            </IconButton>
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
            {showbag && <MyBag show={showbag} close={()=>setshowbag(false)} />}
        </div>
    )
}
export default Header;