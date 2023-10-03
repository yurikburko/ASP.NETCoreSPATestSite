import { Entities } from "../commontypes";

export type User = {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    twoFactorEnabled: boolean;
    isAdmin: boolean;
    loginsCount: number;
    lastLoginDate?: string;
};

export type UsersState = {
    entities: Entities<User>;
};

export type RootUsersState = {
    users: UsersState;
};
