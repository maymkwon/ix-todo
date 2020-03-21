import moment from 'moment';
export const renderText = (value: string) =>
  value.trim().length !== 0 ? value : '-';

export const renderDate = (date: string) =>
  moment(date).format('YYYY-MM-DD HH:mm:ss');
