import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchTodosAsync,
  fetchAllTodosAsync,
  requestEditTodoAsync,
  requestDeleteTodoAsync,
  requestCreateTodoAsync,
} from '../../store/todo/actions';
import {
  ISearchParams,
  TypeDeleteParams,
  TypeTodoCreate,
  TypeTodoEdit,
} from '../../store/todo/types';

export default function useTodo(id?: number) {
  const dispatch = useDispatch();
  const getList = useCallback(
    (params: ISearchParams) => dispatch(fetchTodosAsync.request(params)),
    [dispatch]
  );
  const getAllList = useCallback(
    () => dispatch(fetchAllTodosAsync.request(null)),
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
  };
}
