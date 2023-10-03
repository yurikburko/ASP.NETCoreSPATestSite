import { PayloadAction, SliceCaseReducers, createAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types";
import { Entities } from "../../commontypes";
import { entries, keyBy, omit } from "lodash";

export type UpdateUsersEntities = ReturnType<typeof updateUsersEntities>;
export const updateUsersEntities = createAction(
    "USERS/UPDATE_ENTITIES",
    (items: Partial<User>[]) => ({
        payload: keyBy(items, i => i.id) as Entities<Partial<User>>
    })
);

const mergeEntity = <T extends {}>(source: Entities<T>, data: Entities<Partial<T>>): Entities<T> => {
    if (!data) {
        return source;
    }

    const result = { ...source };
    entries(data).forEach(([id, item]: [any, Partial<T>]) => {
        result[id] = {
            ...(result[id] || {}),
            ...(item as {}),
        } as T;
    });

    return result;
};

export const {
    reducer: usersReducer,
    actions: { deleteUser: deleteUserInStore },   
} = createSlice<Entities<User>, SliceCaseReducers<Entities<User>>>({
    name: "USERS",
    initialState: null as unknown as Entities<User>,
    reducers: {
        deleteUser: (state, { payload: id }: PayloadAction<number>) => omit(state, [id]),
    },
    extraReducers: builder => {
        builder.addCase(updateUsersEntities, (state, { payload: entities }: PayloadAction<Entities<Partial<User>>>) => 
            mergeEntity(state, entities),
        );
    },
});