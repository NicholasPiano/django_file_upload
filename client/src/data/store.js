import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (...enhancers) => {
  if (typeof window !== 'object') {
    return compose(...enhancers);
  }

  if (!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    return compose(...enhancers);
  }

  const reduxDevToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionSanitizer: (action: actionType) => ({
      ...action,
      type: action.type.toString(),
    }),
    serialize: true,
  });

  return reduxDevToolsCompose(...enhancers);
};

const enhancer = composeEnhancers(
  applyMiddleware(
    logger,
    sagaMiddleware,
  ),
);

const store = createStore(
  reducer,
  enhancer,
);

sagaMiddleware.run(saga);

export default store;
