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

function* createTodo(
  action: ReturnType<typeof actions.requestCreateTodoAsync.request>
): Generator {
  try {
    const data = action.payload;
    const response: any = yield call(TodoServices.requestCreateTodo, data);
    yield put(actions.requestCreateTodoAsync.success(response.data));
    yield put(actions.fetchTodosAsync.request({ pageNo: 1, pageSize: 5 }));
  } catch (e) {
    yield put(actions.requestCreateTodoAsync.failure(e));
  }
}

function* deleteTodo(
  action: ReturnType<typeof actions.requestDeleteTodoAsync.request>
): Generator {
  try {
    const data = action.payload;
    const response: any = yield call(TodoServices.requestDeleteTodo, data);
    yield put(actions.requestDeleteTodoAsync.success(response.data));
    yield put(actions.fetchTodosAsync.request({ pageNo: 1, pageSize: 5 }));
  } catch (e) {
    yield put(actions.requestDeleteTodoAsync.failure(e));
  }
}

function* watchTodoList() {
  yield takeEvery(actions.fetchTodosAsync.request, getTodoList);
}
function* watchEdit() {
  yield takeEvery(actions.requestEditTodoAsync.request, editTodo);
}
function* watchCreate() {
  yield takeEvery(actions.requestCreateTodoAsync.request, createTodo);
}
function* watchDelete() {
  yield takeEvery(actions.requestDeleteTodoAsync.request, deleteTodo);
}

function* todoSaga() {
  yield fork(watchTodoList);
  yield fork(watchEdit);
  yield fork(watchCreate);
  yield fork(watchDelete);
}

export default todoSaga;
