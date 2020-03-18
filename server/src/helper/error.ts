export const throwError = (code, errorType, errorMessage) => error => {
  if (!error) error = new Error(errorMessage || 'Default Error');
  error.code = code;
  error.errorType = errorType;
  throw error;
};
export const throwIf = (fn, code, errorType, errorMessage) => result => {
  if (fn(result)) {
    return throwError(code, errorType, errorMessage)(null);
  }
  return result;
};
export const sendSuccess = (ctx, message) => {
  ctx.status = 200;
  ctx.body = message;
  ctx.body = { status: ctx.status, message };

  // ctx.app.emit('success', ctx, data);
};
export const sendError = (ctx, status, message) => error => {
  ctx.status = status || error.status || 500;
  ctx.body = message || error.message;
  // ctx.app.emit('error', error, ctx);
};
