import { createAction } from "@reduxjs/toolkit";
import { fork, put, takeEvery } from "redux-saga/effects";
import { ApplicationPaths } from "../../../components/api-authorization/ApiAuthorizationConstants";
import { apiClient } from "../../../common/apiClient";
import { updateUsersEntities } from "../reducer";

export const assignAdminRole = createAction<{id: string}>("USERS/ASSIGN_TO_ADMIN");
export const unassignAdminRole = createAction<{id: string}>("USERS/UNASSIGN_FROM_ADMIN");

export function* watchAssignAdminRole() {
    yield takeEvery(assignAdminRole, assignAdminRoleHandler);
}
function* assignAdminRoleHandler({ payload }: ReturnType<typeof assignAdminRole>) {
    yield apiClient.post(ApplicationPaths.users.assignAdminRole(payload.id));
    yield put(updateUsersEntities([{id: payload.id, isAdmin: true }]));
}


export function* watchUnassignAdminRole() {
    yield takeEvery(unassignAdminRole, unassignAdminRoleHandler);
}
function* unassignAdminRoleHandler({ payload }: ReturnType<typeof unassignAdminRole>) {
    yield apiClient.post(ApplicationPaths.users.unassignAdminRole(payload.id));
    yield put(updateUsersEntities([{id: payload.id, isAdmin: false }]));
}

export function* updateUserSaga() {
    yield fork(watchAssignAdminRole);
    yield fork(watchUnassignAdminRole);
}