import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchTodosAsync,
  requestEditTodoAsync,
} from '../../store/todo/actions';
import { ISearchParams, TodoItem } from '../../store/todo/types';

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
  // const onToggle = useCallback(() => dispatch(toggleTodo(id)), [dispatch, id]);
  // const onRemove = useCallback(() => dispatch(removeTodo(id)), [dispatch, id]);

  return { getList, requestEditTodo };
}
