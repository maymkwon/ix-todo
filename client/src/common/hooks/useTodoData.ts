import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { groupBy } from '../utils';

export default function useTodoData() {
  const todos = useSelector((state: RootState) => state.todo.data);
  // 리셀렉트를 사용할까

  const groupByTodo = groupBy(todos.contents, 'relId');
  console.log('groupByTodo', groupByTodo);
  return { ...todos, relTodos: groupByTodo };
}
