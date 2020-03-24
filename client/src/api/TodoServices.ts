import axios from './axios';
import {
  ISearchParams,
  TypeTodoCreate,
  TypeDeleteParams,
  TypeTodoEdit,
} from '../store/todo/types';

const TodoServices = {
  getAllTodoList: () => axios.get('/todos/all'),
  getTodoList: (params: ISearchParams) => axios.get('/todos', { params }),
  requestEditTodo: (data: TypeTodoEdit) => axios.post('/update', data),
  requestCreateTodo: (data: TypeTodoCreate) => axios.post('/create', data),
  requestDeleteTodo: (params: TypeDeleteParams) =>
    axios.delete('/delete', { params }),
};

export default TodoServices;
