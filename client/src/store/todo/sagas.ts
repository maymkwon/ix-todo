import { call, put, fork, takeEvery, select } from 'redux-saga/effects';
import * as actions from './actions';
import TodoServices from '../../api/TodoServices';
import { ISearchParams, ITodoData, TodoState } from './types';
import { PAGE_SIZE } from '../../common/Const';
import { selectTodo } from '../../common/selector';
function* getAllTodoList(
  action: ReturnType<typeof actions.fetchAllTodosAsync.request>
): Generator {
  try {
    const response: any = yield call(TodoServices.getAllTodoList);
    yield put(actions.fetchAllTodosAsync.success(response.data));
  } catch (e) {
    yield put(actions.fetchAllTodosAsync.failure(e));
  }
}
function* getTodoList(
  action: ReturnType<typeof actions.fetchTodosAsync.request>
): Generator {
  try {
    const params = action.payload;
    const response: any = yield call(TodoServices.getTodoList, params);
    yield put(
      actions.fetchTodosAsync.success({
        ...response.data,
        pageNo: params.pageNo,
      })
    );
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
    if (data.callback) {
      data.callback();
    }

    const selectData: any = yield select(selectTodo);
    yield put(actions.fetchAllTodosAsync.request(null));
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

    yield put(actions.fetchAllTodosAsync.request(null));
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
    yield put(actions.fetchAllTodosAsync.request(null));
  } catch (e) {
    yield put(actions.requestDeleteTodoAsync.failure(e));
  }
}

function* watchTodoList() {
  yield takeEvery(actions.fetchTodosAsync.request, getTodoList);
}
function* watchAllTodoList() {
  yield takeEvery(actions.fetchAllTodosAsync.request, getAllTodoList);
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
  yield fork(watchTodoList);
  yield fork(watchEdit);
  yield fork(watchCreate);
  yield fork(watchDelete);
}

export default todoSaga;
