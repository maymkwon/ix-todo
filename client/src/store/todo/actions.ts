import { createAsyncAction } from 'typesafe-actions';
import {
  ISearchParams,
  ITodoData,
  TypeTodoEdit,
  TypeTodoCreate,
  TypeDeleteParams,
} from './types';

export const GET_ALL_TODO_LIST = 'todos/GET_ALL_TODO_LIST';
export const SUCCESS_ALL_TODO_LIST = 'todos/SUCCESS_ALL_TODO_LIST';
export const FAIL_ALL_TODO_LIST = 'todos/FAIL_ALL_TODO_LIST';

export const GET_TODO_LIST = 'todos/GET_TODO_LIST';
export const SUCCESS_TODO_LIST = 'todos/SUCCESS_TODO_LIST';
export const FAIL_TODO_LIST = 'todos/FAIL_TODO_LIST';

export const EDIT_TODO = 'todos/EDIT_TODO';
export const SUCCESS_EDIT_TODO = 'todos/SUCCESS_EDIT_TODO';
export const FAIL_EDIT_TODO = 'todos/FAIL_EDIT_TODO';

export const CREATE_TODO = 'todos/CREATE_TODO';
export const SUCCESS_CREATE_TODO = 'todos/SUCCESS_CREATE_TODO';
export const FAIL_CREATE_TODO = 'todos/FAIL_CREATE_TODO';

export const DELETE_TODO = 'todos/DELETE_TODO';
export const SUCCESS_DELETE_TODO = 'todos/SUCCESS_DELETE_TODO';
export const FAIL_DELETE_TODO = 'todos/FAIL_DELETE_TODO';

// TODO: async 액션 따로 만들기?

export const fetchAllTodosAsync = createAsyncAction(
  GET_ALL_TODO_LIST,
  SUCCESS_ALL_TODO_LIST,
  FAIL_ALL_TODO_LIST
)<null, ITodoData, Error>();

export const fetchTodosAsync = createAsyncAction(
  GET_TODO_LIST,
  SUCCESS_TODO_LIST,
  FAIL_TODO_LIST
)<ISearchParams, ITodoData, Error>();

export const requestEditTodoAsync = createAsyncAction(
  EDIT_TODO,
  SUCCESS_EDIT_TODO,
  FAIL_EDIT_TODO
)<TypeTodoEdit | TypeTodoEdit[], null, Error>();

export const requestDeleteTodoAsync = createAsyncAction(
  DELETE_TODO,
  SUCCESS_DELETE_TODO,
  FAIL_DELETE_TODO
)<TypeDeleteParams, ITodoData, Error>();

export const requestCreateTodoAsync = createAsyncAction(
  CREATE_TODO,
  SUCCESS_CREATE_TODO,
  FAIL_CREATE_TODO
)<TypeTodoCreate, ITodoData, Error>();
