import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticationInitialized } from "../../redux/authorization/authenticationModule";

export const AuthorizeWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const ready = useSelector(isAuthenticationInitialized);
    return !ready ? null : <>{children}</>;
};