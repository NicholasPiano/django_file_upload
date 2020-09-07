import { actionTypes } from '../constants';

const fetchError = parameters => ({
  type: actionTypes.FETCH_ERROR,
  payload: { ...parameters },
});

export default fetchError;
