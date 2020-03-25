import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchTodosAsync,
  fetchAllTodosAsync,
  requestEditTodoAsync,
  requestDeleteTodoAsync,
  requestCreateTodoAsync,
  setSearchParams as setSearchAction,
} from '../../store/todo/actions';
import {
  ISearchParams,
  TypeDeleteParams,
  TypeTodoCreate,
  TypeTodoEdit,
} from '../../store/todo/types';

export default function useTodo(id?: number) {
  const dispatch = useDispatch();
  const setSearchParams = useCallback(
    (params: ISearchParams) => dispatch(setSearchAction(params)),
    [dispatch]
  );
  const getList = useCallback(
    (params: ISearchParams) => dispatch(fetchTodosAsync.request(params)),
    [dispatch]
  );
  const getAllList = useCallback(
    (params: ISearchParams) => dispatch(fetchAllTodosAsync.request(params)),
    [dispatch]
  );
  const requestEditTodo = useCallback(
    (data: TypeTodoEdit | TypeTodoEdit[]) =>
      dispatch(requestEditTodoAsync.request(data)),
    [dispatch]
  );
  const requestDeleteTodo = useCallback(
    (data: TypeDeleteParams) => dispatch(requestDeleteTodoAsync.request(data)),
    [dispatch]
  );
  const requestCreateTodo = useCallback(
    (data: TypeTodoCreate) => dispatch(requestCreateTodoAsync.request(data)),
    [dispatch]
  );

  return {
    getAllList,
    getList,
    requestEditTodo,
    requestDeleteTodo,
    requestCreateTodo,
    setSearchParams,
  };
}
