import { ISagaModule } from "redux-dynamic-modules-saga";
import { CurrentUserState, LoggedUserInfo } from "../types";
import { PayloadAction, SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import authService from "../../components/api-authorization/AuthorizeService";
import { all, call, fork, put, take } from "redux-saga/effects";
import { Profile } from "oidc-client";
import { adminRole } from "../../components/api-authorization/ApiAuthorizationConstants";
import { eventChannel, buffers } from "redux-saga";

const isUserAdmin = (user: Profile) => {
    if (user.role instanceof Array) // if user has many roles role is an array
        return user.role.includes(adminRole);
    else // otherwise it is a string
        return user.role === adminRole;
}

export const isAuthenticationInitialized = (state: CurrentUserState) => !!state.currentUser;
export const isUserAuthenticated = (state: CurrentUserState) => state.currentUser?.isAuthenticated;
export const currentUserId = (state: CurrentUserState) => state.currentUser?.id;
export const currentUserName = (state: CurrentUserState) => state.currentUser?.name;
export const isCurrentUserAdmin = (state: CurrentUserState) => state.currentUser?.isAdmin;
export const currentUserInfo = (state: CurrentUserState) => state.currentUser;

export const createAuthChangedEventsChannel = () => {
    return eventChannel(emitter => {

        const callback = () => {
            emitter({});
        };
        const subscription = authService.subscribe(callback);

        return () => {
            authService.unsubscribe(subscription);
        };
    }, buffers.sliding<any>(1));
};

function* populateAuthenticationState(): any {
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
    }));
}

function* authChangedWatcher() {
    const authChangedChannel = createAuthChangedEventsChannel();
    try {
        while (true) {
            yield take(authChangedChannel);
            yield call(populateAuthenticationState);
        }
    } finally {
        authChangedChannel.close()
    }
}

export function* authenticationInfoSaga(): any {
    yield fork(populateAuthenticationState);
    yield fork(authChangedWatcher);
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
    sagas: [authenticationInfoSaga],
});