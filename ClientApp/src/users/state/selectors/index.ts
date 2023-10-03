import { createSelector } from "@reduxjs/toolkit";
import { RootUsersState } from "../../types";

export const users = (state: RootUsersState) => state.users.entities;

export const isUsersLoading = (state: RootUsersState) => !state.users.entities;

export const usersListSelector = createSelector(
    users,
    usersEntities => {
        const users = usersEntities || {};
        return Object.values(users).map(u => ({
            ...u,
            role: u.isAdmin ? "Admin" : "User"
        }));
    });
