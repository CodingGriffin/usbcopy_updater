import { all, put, takeLatest } from "redux-saga/effects";
import actions from "./actions.tsx";
import { callApi } from "../saga";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestNoToken,
  postRequestNoTokenXWWW,
} from "../../utils/axios-client.ts";

function* getContacts(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.contacts.php", {...action.payload});
    yield put({ type: actions.GET_CONTACTS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_CONTACTS_FAILURE, payload: error });
  }
}

function* addContact(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.contacts.php", {...action.payload});
    yield put({ type: actions.ADD_CONTACT_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.ADD_CONTACT_FAILURE, payload: error });
  }
}

function* editContact(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.contacts.php", {...action.payload});
    yield put({ type: actions.EDIT_CONTACT_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.EDIT_CONTACT_FAILURE, payload: error });
  }
}

function* deleteContact(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.contacts.php", {...action.payload});
    yield put({ type: actions.EDIT_CONTACT_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.EDIT_CONTACT_FAILURE, payload: error });
  }
}

function* getSession(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.contacts.php", {...action.payload});
    yield put({ type: actions.GET_SESSION_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_SESSION_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_CONTACTS, getContacts)]);
  yield all([takeLatest(actions.ADD_CONTACT, addContact)]);
  yield all([takeLatest(actions.EDIT_CONTACT, editContact)]);
  yield all([takeLatest(actions.DELETE_CONTACT, deleteContact)]);
  yield all([takeLatest(actions.GET_SESSION, getSession)]);
}
