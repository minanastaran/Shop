import React from 'react'
import { Container } from '@material-ui/core';
import {NavLink} from 'react-router-dom';

const Header = ({match}) => {
    return (
        <div className="Header">
            <Container className="header_container">
                <div className="header_menu_list">
                    <ul>
                        <li>
                            <NavLink to="/" exact>
                            صفحه اصلی
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/Products' exact>
                            فروشگاه
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/Product/`} exact>
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