import { ISagaModule } from "redux-dynamic-modules-saga";
import { CurrentUserState, LoggedUserInfo } from "../types";
import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import authService from "../../components/api-authorization/AuthorizeService";
import { all, put } from "redux-saga/effects";
import { Profile } from "oidc-client";
import { adminRole } from "../../components/api-authorization/ApiAuthorizationConstants";

const isUserAdmin = (user: Profile) => {
    if (user.role instanceof Array) // if user has many roles role is an array
        return user.role.includes(adminRole);
    else // otherwise it is a string
        return user.role === adminRole;
}

export const isAuthenticationInitialized = (state: CurrentUserState) => !!state.currentUser;
export const currentUserId = (state: CurrentUserState) => state.currentUser?.id;
export const isCurrentUserAdmin = (state: CurrentUserState) => state.currentUser?.isAdmin;
export const currentUserInfo = (state: CurrentUserState) => state.currentUser;

export function* getAuthenticationInfo(): any {
    const [isAuthenticated, user]: [boolean, Profile] = yield all([
        authService.isAuthenticated(),
        authService.getUser()
    ]);
    
    const isCurrentUserAdmin = user ? isUserAdmin(user) : undefined;

    yield put(setCurrentUserInfo({
        isAuthenticated,
        id: user?.sub,
        name: user?.name,
        isAdmin: isCurrentUserAdmin
    }))
}

export const {
    reducer: currentUserReducer,
    actions: { setCurrentUserInfo },
} = createSlice<LoggedUserInfo, SliceCaseReducers<LoggedUserInfo>>({
    name: "CURRENT_USER",
    initialState: null as unknown as LoggedUserInfo, 
    reducers: {
        setCurrentUserInfo: (state, { payload }: PayloadAction<LoggedUserInfo>) => ({
            ...state,
            ...payload,
        }),
    },
});

export const getAuthenticationModule = (): ISagaModule<CurrentUserState> => ({
    id: "authentication",
    reducerMap: {
        currentUser: currentUserReducer,
    },
    sagas: [getAuthenticationInfo],
});