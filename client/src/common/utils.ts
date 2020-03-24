import moment from 'moment';
import { TodoItem } from '../store/todo/types';

export const renderText = (value: string) =>
  value.trim().length !== 0 ? value : '-';

export const renderDate = (date: string) =>
  moment(date).format('YYYY-MM-DD HH:mm:ss');

export const groupBy = (xs: TodoItem[], key: string) => {
  return xs.reduce((rv: any, x: any) => {
    if (x[key]) (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
