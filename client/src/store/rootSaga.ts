import { all, fork } from 'redux-saga/effects';
import todoSaga from './todo/sagas';

export default function* rootSaga() {
  yield all([fork(todoSaga)]);
}
