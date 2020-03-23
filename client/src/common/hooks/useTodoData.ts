import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { groupBy } from '../utils';
import { selectTodoData } from '../selector';
export default function useTodoData() {
  const todos = useSelector(selectTodoData);
  // 리셀렉트를 사용할까

  const groupByTodo = groupBy(todos.contents, 'relId');
  return { ...todos, relTodos: groupByTodo };
}
