import { combineReducers } from 'redux';
import todoReducer from './todo/reducer';

const rootReducer = combineReducers({
  todo: todoReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
