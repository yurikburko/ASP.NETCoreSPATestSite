import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { getAuthenticationModule } from "./redux/authorization/authenticationModule";

export default createStore({
    initialState: {},
    extensions: [getSagaExtension({}/* saga context */)]
}, getAuthenticationModule());