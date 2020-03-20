import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

function* getTodoList(action: ReturnType<typeof actions.getTodoList>) {
  try {
  } catch (e) {}
}

function* watchTodoList() {
  yield takeEvery(actions.GET_TODO_LIST, getTodoList);
}

function* todoSaga() {
  yield fork(watchTodoList);
}

export default todoSaga;
