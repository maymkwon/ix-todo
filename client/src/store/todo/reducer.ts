import { createReducer } from 'typesafe-actions';
import { TodoState, TodoAction, TodoItem } from './types';
import { fetchTodosAsync } from './actions';

type State = {
  count: TodoItem[];
};

const initialState: TodoState = {
  data: {
    contents: [],
    totalCount: 0,
  },
};

const todoReducer = createReducer<TodoState, TodoAction>(
  initialState
).handleAction(fetchTodosAsync.success, (state, action) => ({
  ...state,
  data: action.payload,
}));

export default todoReducer;
