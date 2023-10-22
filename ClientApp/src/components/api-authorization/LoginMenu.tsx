import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { useSelector } from 'react-redux';
import { currentUserName, isUserAuthenticated } from '../../redux/authorization/authenticationModule';

export interface LoginMenuProps {
    path: string;
    element: React.ReactElement; 
}

export const LoginMenu: React.FC<LoginMenuProps> = () => {
    const isAuthenticated = useSelector(isUserAuthenticated);
    const userName = useSelector(currentUserName);

    const authenticatedView = () => {
        const profilePath = `${ApplicationPaths.Profile}`;
        const logoutPath = `${ApplicationPaths.LogOut}`;
        const logoutState = { local: true };

        return (
            <>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink replace tag={Link} className="text-dark" to={logoutPath} state={logoutState}>Logout</NavLink>
                </NavItem>
            </>
        );
    }

    const anonymousView = () => {
        const registerPath = `${ApplicationPaths.Register}`;
        const loginPath = `${ApplicationPaths.Login}`;

        return (
            <>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
                </NavItem>
            </>
        );
    }

    return !isAuthenticated ? anonymousView() : authenticatedView();
}
