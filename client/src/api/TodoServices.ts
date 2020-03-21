import axios from './axios';
import {
  ISearchParams,
  TodoItem,
  TypeTodoCreate,
  TypeDeleteParams,
} from '../store/todo/types';

const TodoServices = {
  getTodoList: (params: ISearchParams) => axios.get('/todos', { params }),
  requestEditTodo: (data: TodoItem) => axios.post('/update', data),
  requestCreateTodo: (data: TypeTodoCreate) => axios.post('/create', data),
  requestDeleteTodo: (params: TypeDeleteParams) =>
    axios.delete('/delete', { params }),
};

export default TodoServices;
