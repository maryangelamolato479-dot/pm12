import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
  ADD_USER_REQUEST,
  addUserSuccess,
} from '../reducers/userReducer';
import { fetchUsersFromApi, insertUserToApi } from '../services/apiService';

function* handleFetchUsers() {
  try {
    const users = yield call(fetchUsersFromApi);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error.message || 'Failed to fetch users'));
  }
}

function* handleAddUser(action) {
  try {
    const createdUser = yield call(insertUserToApi, action.payload);
    yield put(addUserSuccess(createdUser));
  } catch (error) {
    yield put(fetchUsersFailure(error.message || 'Failed to add user'));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, handleFetchUsers);
  yield takeLatest(ADD_USER_REQUEST, handleAddUser);
}