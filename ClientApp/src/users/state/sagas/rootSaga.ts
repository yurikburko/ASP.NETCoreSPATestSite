import { fork } from "redux-saga/effects";
import { watchLoadUsers } from "./loadUsers";
import { watchDeleteUser } from "./deleteUser";
import { updateUserSaga } from "./updateUser";

export function* rootSaga() {
    yield fork(watchLoadUsers);
    yield fork(watchDeleteUser);
    yield fork(updateUserSaga);
}