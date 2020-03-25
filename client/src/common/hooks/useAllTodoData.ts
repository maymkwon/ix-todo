import { useSelector } from 'react-redux';
import { selectAllTodo, selectSearchParams } from '../selector';
import { groupBy } from '../utils';

export default function useAllTodoData() {
  const allTodos = useSelector(selectAllTodo);
  const params = useSelector(selectSearchParams);
  const groupByTodo = groupBy(allTodos.contents, 'relId');

  return { ...allTodos, relTodos: groupByTodo, params };
}
