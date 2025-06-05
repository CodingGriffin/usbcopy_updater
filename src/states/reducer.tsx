import { combineReducers } from "redux";

import ordersReducer from "./Orders/reducer";
import contactsReducer from "./Contacts/reducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
  contacts: contactsReducer,
});

export default rootReducer;
