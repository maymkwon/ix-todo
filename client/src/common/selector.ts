import { RootState } from '../store/rootReducer';

export const selectTodo = (state: RootState) => state.todo;
export const selectTodoData = (state: RootState) => state.todo.data;
export const selectAllTodo = (state: RootState) => state.todo.allData;
export const selectSearchParams = (state: RootState) => state.todo.params;
