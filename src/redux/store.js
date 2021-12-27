import { applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './userSagas';

const parameterEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(rootReducer, parameterEnhancer(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;