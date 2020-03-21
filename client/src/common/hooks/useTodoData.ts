import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

export default function useTodoData() {
  const todos = useSelector((state: RootState) => state.todo.data);
  return todos;
}
