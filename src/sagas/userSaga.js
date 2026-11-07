import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
} from '../reducers/userReducer';
import { fetchUsersApi } from '../services/apiService';

// Worker Saga: handles fetching data via API service
function* handleFetchUsers() {
  try {
    const data = yield call(fetchUsersApi);
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message || 'Failed to fetch users'));
  }
}

// Watcher Saga
export function* watchFetchUsers() {
  yield takeLatest(FETCH_USERS_REQUEST, handleFetchUsers);
}