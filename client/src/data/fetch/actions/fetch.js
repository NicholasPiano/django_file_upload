import { actionTypes } from '../constants';

const fetch = parameters => ({
  type: actionTypes.FETCH,
  payload: { ...parameters },
});

export default fetch;
