import { createAction, createAsyncAction } from 'typesafe-actions';
import { ISearchParams, ITodoData, TodoItem } from './types';

export const GET_TODO_LIST = 'todos/GET_TODO_LIST';
export const SUCCESS_TODO_LIST = 'todos/SUCCESS_TODO_LIST';
export const FAIL_TODO_LIST = 'todos/FAIL_TODO_LIST';

export const EDIT_TODO = 'todos/EDIT_TODO';
export const SUCCESS_EDIT_TODO = 'todos/SUCCESS_EDIT_TODO';
export const FAIL_EDIT_TODO = 'todos/FAIL_EDIT_TODO';

export const CREATE_TODO = 'todos/CREATE_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';

// export const getTodoList = createAction(GET_TODO_LIST)<ISearchParams>();
// export const requestEditTodo = createAction(EDIT_TODO)<number>();
export const requestCreateTodo = createAction(CREATE_TODO)<string>();
export const requestRemoveTodo = createAction(REMOVE_TODO)<number>();

export const fetchTodosAsync = createAsyncAction(
  GET_TODO_LIST,
  SUCCESS_TODO_LIST,
  FAIL_TODO_LIST
)<ISearchParams, ITodoData, Error>();

export const requestEditTodoAsync = createAsyncAction(
  EDIT_TODO,
  SUCCESS_EDIT_TODO,
  FAIL_EDIT_TODO
)<TodoItem, ITodoData, Error>();
