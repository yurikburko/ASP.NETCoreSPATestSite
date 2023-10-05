/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import { getUsersModule } from "../module";
import { loadUsers } from "../state/sagas/loadUsers";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isUsersLoading, usersListSelector } from "../state/selectors";
import { useReduxAction } from "../../hooks/useReduxAction";
import Loading from "../../components/shared/loading/Loading";
import { ApplicationPaths } from "../../components/api-authorization/ApiAuthorizationConstants";
import { ActionsColumn } from "./ActionsColumn";
import { UserNameColumn } from "./UserNameColumn";
import { isUserAuthenticated } from "../../redux/authorization/authenticationModule";

const Message: React.FC<{message: string}> = ({message}) => {
    return (
        <div role="status">
            <p><em>{message}</em></p>
        </div>
    );
};

export const UsersList: React.FC = () => {
    const loadUsersRequest = useReduxAction(loadUsers);

    useEffect(() => {
        loadUsersRequest();
    }, []);

    const usersItems = useSelector(usersListSelector);
    const isLoading = useSelector(isUsersLoading);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>        
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>TwoFactor Enabled</th>
                    <th>Role</th>
                    <th>Logins Count</th>
                    <th>Last Login time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {usersItems.map(user =>
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td><UserNameColumn user={user}/></td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.twoFactorEnabled ? "Yes" : "No"}</td>
                    <td>{user.role}</td>
                    <td>{user.loginsCount}</td>
                    <td>{user.lastLoginDateStr}</td>
                    <td>
                        <ActionsColumn user={user} />
                    </td>
                </tr>
            )}
          </tbody>
        </table>
        </>
      );
};

export const UsersListWrapper: React.FC = () => {
    const isAuthenticated = useSelector(isUserAuthenticated);
    
    const content = isAuthenticated ? <UsersList /> : ( 
        <div>
            <Message message="To see users list please login to the application."/>
            <a className="btn btn-primary" href={ApplicationPaths.Login} role="button">Login</a>
        </div>
    );

    return (
        <>
            <h1>Users</h1>
            {content}
        </>
    )
};

export const DynamicUsersList = () => (
    // @ts-ignore (children prop in IDynamicModuleLoaderProps needs to be listed explicitly)
    // see https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-typescript-definitions
    <DynamicModuleLoader modules={[getUsersModule()]}>
        <UsersListWrapper />
    </DynamicModuleLoader>
);
