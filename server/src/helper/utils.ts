export const toNum = (value: string) => parseInt(value, 10);

export const isEmpty = (value: any) => {
  if (typeof value === 'undefined' || value === null || value === '')
    return true;
  else return false;
};
