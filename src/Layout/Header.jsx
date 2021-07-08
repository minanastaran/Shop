import React from 'react'
import { Container } from '@material-ui/core';
import {NavLink} from 'react-router-dom';

const Header = () => {
    const id=1;

    return (
        <div className="Header">
            <Container className="header_container">
                <div className="header_menu_list">
                    <ul>
                        <li>
                            <NavLink to="/">
                            صفحه اصلی
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/Products'>
                            فروشگاه
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/Product`}>
                            سایر
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    ورود/ عضویت
                </div>
            </Container>
        </div>
    )
}
export default Header;