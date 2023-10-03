import { useSelector } from "react-redux";
import { currentUserInfo } from "../../redux/authorization/authenticationModule";
import { User } from "../types";
import { useReduxAction } from "../../hooks/useReduxAction";
import { assignAdminRole, unassignAdminRole } from "../state/sagas/updateUser";
import { deleteUser } from "../state/sagas/deleteUser";

type ActionsColumnProps = {
    user: User;
}

export const ActionsColumn: React.FC<ActionsColumnProps> = ({user}) => {
    const {id: currentUserId, isAdmin: canManage} = useSelector(currentUserInfo);
    
    const deleteUserAction = useReduxAction((userId) => deleteUser({id: userId}));
    const assignAdminRoleToUserAction = useReduxAction((userId) => assignAdminRole({id: userId}));
    const unassignAdminRoleFromUserAction = useReduxAction((userId) => unassignAdminRole({id: userId}));
    
    return (
        <div className="btn-group">
            {canManage && currentUserId !== user.id && (
                <button onClick={() => deleteUserAction(user.id)} type="button" className="btn btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="auto" title="Delete">
                    <svg style={{verticalAlign: "-0.125em"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
                    </svg>
                </button>
            )}
            {canManage && !user.isAdmin && (
                <button onClick={() => assignAdminRoleToUserAction(user.id)} type="button" className="btn btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="auto" title="Assign admin role">
                    <svg style={{verticalAlign: "-0.125em"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-up" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                    </svg>
                </button>
            )}
            {canManage && user.isAdmin && currentUserId !== user.id && (
                <button onClick={() => unassignAdminRoleFromUserAction(user.id)} type="button" className="btn btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="auto" title="Unassign admin role">
                    <svg style={{verticalAlign: "-0.125em"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-down" viewBox="0 0 16 16">
                        <path d="M12.5 9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm.354 5.854 1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V10.5a.5.5 0 0 0-1 0v2.793l-.646-.647a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                    </svg>
                </button>
            )}
        </div>
    );
};