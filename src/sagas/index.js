import { all } from 'redux-saga/effects';
import { watchFetchUsers } from './userSaga';

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
  ]);
}