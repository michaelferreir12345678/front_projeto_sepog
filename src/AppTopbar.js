import React  from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { logout } from './service/AuthService';

export const AppTopbar = (props) => {
    const history = useHistory();

    const handleLogout = async () => {
        await logout();
        history.push('/login');
    };


    return (
        <div class='layout-topbar' className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-pref.png' : 'assets/layout/images/logo-pref.png'} alt="logo" style={{ width: '215px', height: 'auto' }}/>
                {/* <span>Prefeitura de Fortaleza</span> */}
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar"/>
                            <span>Events</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog"/>
                            <span>Settings</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-user"/>
                            <span>Profile</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={handleLogout}>
                            <i className="pi pi-sign-out"/>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
        </div>
    );
}
