import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagaMonitor from './sagaMonitor'
import rootSaga from './sagas';
import {createLogger} from 'redux-logger'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middleware = applyMiddleware(
    createLogger(), 
    sagaMiddleware
)

const store = createStore(reducers, composeEnhancers(middleware))

sagaMiddleware.run(rootSaga)

export default store
