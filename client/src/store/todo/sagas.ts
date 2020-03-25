import { call, put, fork, takeEvery, all, select } from 'redux-saga/effects';
import * as actions from './actions';
import TodoServices from '../../api/TodoServices';
import { selectSearchParams } from '../../common/selector';
function* getAllTodoList(
  action: ReturnType<typeof actions.fetchAllTodosAsync.request>
): Generator {
  try {
    const params = action.payload;
    const response: any = yield call(TodoServices.getAllTodoList, params);
    yield put(actions.fetchAllTodosAsync.success(response.data));
  } catch (e) {
    yield put(actions.fetchAllTodosAsync.failure(e));
  }
}

function* editTodo(
  action: ReturnType<typeof actions.requestEditTodoAsync.request>
): Generator {
  try {
    const data = action.payload;
    if (Array.isArray(data)) {
      yield all(data.map(x => call(TodoServices.requestEditTodo, x)));
      yield put(actions.requestEditTodoAsync.success(null));
      if (data[0].callback) {
        data[0].callback();
      }
    } else {
      yield call(TodoServices.requestEditTodo, data);
      yield put(actions.requestEditTodoAsync.success(null));
      if (data.callback) {
        data.callback();
      }
    }
    const params: any = yield select(selectSearchParams);
    yield put(actions.fetchAllTodosAsync.request(params));
  } catch (e) {
    yield put(actions.requestEditTodoAsync.failure(e));
  }
}

function* createTodo(
  action: ReturnType<typeof actions.requestCreateTodoAsync.request>
): Generator {
  try {
    const data = action.payload;
    const reqData = {
      title: data.title,
    };
    const response: any = yield call(TodoServices.requestCreateTodo, reqData);
    yield put(actions.requestCreateTodoAsync.success(response.data));
    if (data.callback) {
      data.callback();
    }

    yield put(actions.fetchAllTodosAsync.request({}));
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
    const params: any = yield select(selectSearchParams);
    yield put(actions.fetchAllTodosAsync.request(params));
  } catch (e) {
    yield put(actions.requestDeleteTodoAsync.failure(e));
  }
}

function* watchAllTodoList() {
  yield takeEvery(
    [actions.fetchAllTodosAsync.request, actions.SET_SEARCH_PARAMS],
    getAllTodoList
  );
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
  yield fork(watchAllTodoList);
  yield fork(watchEdit);
  yield fork(watchCreate);
  yield fork(watchDelete);
}

export default todoSaga;
