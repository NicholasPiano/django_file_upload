import { combineReducers } from 'redux';

import { reducer as fetchReducer } from './fetch';
import { reducer as tokenReducer } from './token';
import { reducer as uploadReducer } from './upload';

const reducer = combineReducers({
  fetch: fetchReducer,
  token: tokenReducer,
  upload: uploadReducer,
});

export default reducer;
