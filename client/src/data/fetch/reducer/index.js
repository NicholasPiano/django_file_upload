import { actionTypes } from '../constants';
import fetch from './fetch';
import fetchResponse from './fetchResponse';
import fetchError from './fetchError';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH:
      return fetch(state, action);

    case actionTypes.FETCH_RESPONSE:
      return fetchResponse(state, action);

    case actionTypes.FETCH_ERROR:
      return fetchError(state, action);

    default:
      return state;
  }
};

export default reducer;
