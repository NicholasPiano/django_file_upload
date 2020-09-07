import { actionTypes } from '../constants';

const fetchResponse = parameters => ({
  type: actionTypes.FETCH_RESPONSE,
  payload: { ...parameters },
});

export default fetchResponse;
