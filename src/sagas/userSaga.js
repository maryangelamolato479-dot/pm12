import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from '../services/apiService';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../reducers/userReducer';

// Worker Sagas
function* handleFetchUsers() {
  try {
    const users = yield call(fetchUsersApi);
    yield put({ type: FETCH_USERS_SUCCESS, payload: users });
  } catch (error) {
    yield put({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
}

function* handleCreateUser(action) {
  try {
    const newUser = yield call(createUserApi, action.payload);
    yield put({ type: CREATE_USER_SUCCESS, payload: newUser });
  } catch (error) {
    yield put({ type: CREATE_USER_FAILURE, payload: error.message });
  }
}

function* handleUpdateUser(action) {
  try {
    const updatedUser = yield call(updateUserApi, action.payload);
    yield put({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
  } catch (error) {
    yield put({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
}

function* handleDeleteUser(action) {
  try {
    const deletedId = yield call(deleteUserApi, action.payload);
    yield put({ type: DELETE_USER_SUCCESS, payload: deletedId });
  } catch (error) {
    yield put({ type: DELETE_USER_FAILURE, payload: error.message });
  }
}

// Watcher Saga
export default function* userSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, handleFetchUsers);
  yield takeLatest(CREATE_USER_REQUEST, handleCreateUser);
  yield takeLatest(UPDATE_USER_REQUEST, handleUpdateUser);
  yield takeLatest(DELETE_USER_REQUEST, handleDeleteUser);
}