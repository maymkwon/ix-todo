import { useSelector } from 'react-redux';
import { selectAllTodo } from '../selector';
import { groupBy } from '../utils';

export default function useAllTodoData() {
  const allTodos = useSelector(selectAllTodo);
  const groupByTodo = groupBy(allTodos.contents, 'relId');
  return { ...allTodos, relTodos: groupByTodo };
}
