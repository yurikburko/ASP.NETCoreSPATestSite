export type CurrentUserState = {
    currentUser: LoggedUserInfo;
};

export interface LoggedUserInfo {
    isAuthenticated: boolean,
    id?: string,
    name?: string;
    isAdmin?: boolean;
}
