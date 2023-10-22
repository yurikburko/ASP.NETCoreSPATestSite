import React from 'react'
import { Navigate } from 'react-router-dom'
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants'
import { isAuthenticationInitialized, isUserAuthenticated } from '../../redux/authorization/authenticationModule'
import { useSelector } from 'react-redux'

export interface AuthorizeRouteProps {
    path: string;
    element: React.ReactElement; 
}

export const AuthorizeRoute: React.FC<AuthorizeRouteProps> = ({path, element}) => {
    const ready = useSelector(isAuthenticationInitialized);
    const authenticated = useSelector(isUserAuthenticated);
    
    var link = document.createElement("a");
    link.href = path;
    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURIComponent(returnUrl)}`;

    if (!ready) {
        return <div></div>;
    } else {
        return authenticated ? element : <Navigate replace to={redirectUrl} />;
    }
}

export default AuthorizeRoute;