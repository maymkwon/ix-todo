import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchTodosAsync,
  requestEditTodoAsync,
  requestDeleteTodoAsync,
  requestCreateTodoAsync,
} from '../../store/todo/actions';
import {
  ISearchParams,
  TodoItem,
  TypeDeleteParams,
  TypeTodoCreate,
} from '../../store/todo/types';

export default function useTodo(id?: number) {
  const dispatch = useDispatch();
  const getList = useCallback(
    (params: ISearchParams) => dispatch(fetchTodosAsync.request(params)),
    [dispatch]
  );
  const requestEditTodo = useCallback(
    (data: TodoItem) => dispatch(requestEditTodoAsync.request(data)),
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

  return { getList, requestEditTodo, requestDeleteTodo, requestCreateTodo };
}
