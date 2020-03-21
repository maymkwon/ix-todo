import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createSagaMiddleWare from 'redux-saga';
import { createLogger } from 'redux-logger';

const logger = createLogger({ collapsed: true });
const saga = createSagaMiddleWare();

// 빌드 고려 X
const middleware = [logger, saga];
const enhancer = compose(applyMiddleware(...middleware));
const initalState = {};
const store = createStore(rootReducer, initalState, enhancer);
saga.run(rootSaga);
export default store;
