import { createAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { put, takeLeading } from "redux-saga/effects";
import { apiClient } from "../../../common/apiClient";
import { ApplicationPaths } from "../../../components/api-authorization/ApiAuthorizationConstants";
import { updateUsersEntities } from "../reducer";

export const loadUsers = createAction("USERS/LOAD");

export function* watchLoadUsers() {
    yield takeLeading(loadUsers, loadUsersHandler);
}

function* loadUsersHandler() {
    const users: User[] = yield apiClient.get(ApplicationPaths.users.get);
    yield put(updateUsersEntities(users));
}