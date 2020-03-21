import axios from './axios';
import { ISearchParams, TodoItem } from '../store/todo/types';

const TodoServices = {
  getTodoList: (params: ISearchParams) => axios.get('/todos', { params }),
  requestEditTodo: (data: TodoItem) => axios.post('/update', data),
};

export default TodoServices;
