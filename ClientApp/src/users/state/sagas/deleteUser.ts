import { createAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { ApplicationPaths } from "../../../components/api-authorization/ApiAuthorizationConstants";
import { apiClient } from "../../../common/apiClient";
import { deleteUserInStore } from "../reducer";

export const deleteUser = createAction<{id: string}>("USERS/DELETE");

export function* watchDeleteUser() {
    yield takeEvery(deleteUser, deleteUserHandler);
}

function* deleteUserHandler({ payload }: ReturnType<typeof deleteUser>) {
    yield apiClient.deleteRequest(ApplicationPaths.users.delete(payload.id));
    yield put(deleteUserInStore(payload.id));
}
