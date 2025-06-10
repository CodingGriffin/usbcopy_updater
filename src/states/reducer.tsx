import { combineReducers } from "redux";

import ordersReducer from "./Orders/reducer";
import usbcopyReducer from "./UsbCopyUpdates/reducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
  usbcopyUpdates: usbcopyReducer,
});

export default rootReducer;
