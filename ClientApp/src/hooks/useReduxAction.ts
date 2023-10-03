import { DependencyList, useCallback } from "react";
import { useDispatch } from "react-redux";

export const useReduxAction = <T extends (...args: any[]) => any>(actionCreator: T, deps?: DependencyList) => {
    const dispatch = useDispatch();
    const action = (...args: any[]) => dispatch(actionCreator(...args));
    return useCallback(action as T, deps ?? []);
};
