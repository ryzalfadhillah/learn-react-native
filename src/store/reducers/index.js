// index.js pada page reducers

import { combineReducers } from "redux";
import dataCount from "./dataCount";
import dataLogin from "./dataLogin"

const rootReducer = combineReducers({
    dataCount,
    dataLogin
});
export default rootReducer;