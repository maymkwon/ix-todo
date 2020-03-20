import axios from './axios';
import { AxiosRequestConfig } from 'axios';
import { ISearchParams } from '../store/todo/types';

// ISearchParams

interface ServerResponse {
  data: ISearchParams;
}
const TodoServices = {
  getTodoList: (params: ISearchParams) => axios.get('/todos', { params }),
};

export default TodoServices;
