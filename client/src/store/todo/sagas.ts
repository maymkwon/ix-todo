import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import TodoServices from '../../api/TodoServices';
import { ISearchParams } from './types';

function* getTodoList(
  action: ReturnType<typeof actions.fetchTodosAsync.request>
): Generator {
  try {
    const params = action.payload;
    const response: any = yield call(TodoServices.getTodoList, params);
    yield put(actions.fetchTodosAsync.success(response.data));
  } catch (e) {
    yield put(actions.fetchTodosAsync.failure(e));
  }
}

function* editTodo(
  action: ReturnType<typeof actions.requestEditTodoAsync.request>
): Generator {
  try {
    const data = action.payload;
    const response: any = yield call(TodoServices.requestEditTodo, data);
    yield put(actions.requestEditTodoAsync.success(response.data));
    yield put(actions.fetchTodosAsync.request({ pageNo: 1, pageSize: 5 }));
  } catch (e) {
    yield put(actions.requestEditTodoAsync.failure(e));
  }
}

function* watchTodoList() {
  yield takeEvery(actions.fetchTodosAsync.request, getTodoList);
}
function* watchEdit() {
  yield takeEvery(actions.requestEditTodoAsync.request, editTodo);
}

function* todoSaga() {
  yield fork(watchTodoList);
  yield fork(watchEdit);
}

export default todoSaga;
