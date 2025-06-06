import { combineReducers } from "redux";

import ordersReducer from "./Orders/reducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
});

export default rootReducer;
