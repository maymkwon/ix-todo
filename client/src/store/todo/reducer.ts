import { createReducer } from 'typesafe-actions';
import { TodoState, TodoAction } from './types';
import { fetchTodosAsync, fetchAllTodosAsync } from './actions';

const initialState: TodoState = {
  data: {
    contents: [],
    pageNo: 1,
    totalCount: 0,
  },
  allData: {
    contents: [],
  },
};

const todoReducer = createReducer<TodoState, TodoAction>(initialState)
  .handleAction(fetchTodosAsync.success, (state, action) => ({
    ...state,
    data: action.payload,
  }))
  .handleAction(fetchAllTodosAsync.success, (state, action) => ({
    ...state,
    allData: action.payload,
  }));

export default todoReducer;
