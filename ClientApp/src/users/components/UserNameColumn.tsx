import { User } from "../types";
import { UserAvatar } from "../../components/shared/UserAvatar";

type UserNameColumnProps = {
    user: User;
}

export const UserNameColumn: React.FC<UserNameColumnProps> = ({user}) => {
    return (
        <div className="d-flex gap-8" style={{gap: 8}}>
            <UserAvatar userId={user.id} username={user.userName}/>
            <span>{user.userName}</span>
        </div>
    );
};