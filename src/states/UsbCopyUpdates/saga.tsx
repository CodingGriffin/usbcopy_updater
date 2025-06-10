import { all, put, takeLatest } from "redux-saga/effects";
import actions from "./actions.tsx";
import { callApi } from "../saga.tsx";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestNoToken,
  postRequestNoTokenXWWW,
} from "../../utils/axios-client.ts";

function* addUpdate(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.usbCopyPro.php", {...action.payload});
    yield put({ type: actions.ADD_UPDATE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.ADD_UPDATE_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.ADD_UPDATE, addUpdate)]);
}
