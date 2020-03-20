import { createReducer } from 'typesafe-actions';
import { TodoState, TodoAction, TodoItem } from './types';
import { getTodoList } from './actions';

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
).handleAction(getTodoList, (state, action) => ({
  ...state,
  list: action.payload,
}));

export default todoReducer;
