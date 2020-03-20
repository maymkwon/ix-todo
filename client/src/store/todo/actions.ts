import { createAction, ActionType } from 'typesafe-actions';
import { ISearchParams } from './types';

export const GET_TODO_LIST = 'todos/GET_TODO_LIST';
export const SUCCESS_TODO_LIST = 'todos/SUCCESS_TODO_LIST';
export const FAIL_TODO_LIST = 'todos/FAIL_TODO_LIST';

export const CREATE_TODO = 'todos/CREATE_TODO';
export const EDIT_TODO = 'todos/EDIT_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';

export const getTodoList = createAction(GET_TODO_LIST)<ISearchParams>();
export const requestCreateTodo = createAction(CREATE_TODO)<string>();
export const requestEditTodo = createAction(EDIT_TODO)<number>();
export const requestRemoveTodo = createAction(REMOVE_TODO)<number>();
