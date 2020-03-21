import { RootState } from '../store/rootReducer';

export const selectTodo = (state: RootState) => state.todo;
