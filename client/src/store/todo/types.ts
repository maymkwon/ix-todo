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

export type TypeTodoCreate = {
  title: string;
  callback?: () => void;
};
export interface TypeTodoEdit extends TypeTodoCreate {
  id: number;
  done: boolean;
  relId?: number | null;
}
export type TypeTodoItem = {
  title: string;
  done: boolean;
  relId: number | null;
  createdAt: string;
  updatedAt: string;
};

export interface TodoItem extends TypeTodoItem {
  id: number;
  callback?: () => void;
}

export interface ITodoData {
  contents: TodoItem[];
  pageNo?: number;
  totalCount?: number;
}

export type TodoState = { data: ITodoData; allData: ITodoData };
