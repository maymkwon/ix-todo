import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

export type TodoAction = ActionType<typeof actions>;

export interface ISearchParams {
  keyword?: string;
  done?: boolean;
  pageNo: number;
  pageSize: number;
}

export type TypeDeleteParams = {
  id: number;
};

// export type TodoItem = {
//   id: number;
//   title: string;
//   done: boolean;
//   relId: number;
//   createdAt: string;
//   updatedAt: string;
// };

export type TypeTodoCreate = {
  title: string;
};
export type TypeTodoItem = {
  title: string;
  done: boolean;
  relId: number;
  createdAt: string;
  updatedAt: string;
};

export interface TodoItem extends TypeTodoItem {
  id: number;
}

export interface ITodoData {
  contents: TodoItem[];
  totalCount: number;
}

export type TodoState = { data: ITodoData };

// text, 완료 여부, 날짜
