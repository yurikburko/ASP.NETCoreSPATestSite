import { ISagaModule } from "redux-dynamic-modules-saga";
import { RootUsersState } from "./types";
import { usersReducer } from "./state/reducer";
import { rootSaga } from "./state/sagas/rootSaga";
import { combineReducers } from "redux";

export const getUsersModule = (): ISagaModule<RootUsersState> => ({
    id: "UsersModule",
    reducerMap: {
        users: combineReducers({
            entities: usersReducer,
        }),
    },
    sagas: [rootSaga],
});