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


function* getUpdates(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.usbCopyPro.php", {...action.payload});
    yield put({ type: actions.GET_UPDATES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_UPDATES_FAILURE, payload: error });
  }
}

function* addUpdate(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.usbCopyPro.php", {...action.payload});
    yield put({ type: actions.ADD_UPDATE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.ADD_UPDATE_FAILURE, payload: error });
  }
}

function* deleteUpdate(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.usbCopyPro.php", {...action.payload});
    yield put({ type: actions.DELETE_UPDATE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.DELETE_UPDATE_FAILURE, payload: error });
  }
}

function* getDiagnostics(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.usbCopyPro.php", {...action.payload});
    yield put({ type: actions.GET_DIAGNOSTICS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_DIAGNOSTICS_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_UPDATES, getUpdates)]);
  yield all([takeLatest(actions.ADD_UPDATE, addUpdate)]);
  yield all([takeLatest(actions.ADD_UPDATE, deleteUpdate)]);
  yield all([takeLatest(actions.GET_DIAGNOSTICS, getDiagnostics)]);
}
