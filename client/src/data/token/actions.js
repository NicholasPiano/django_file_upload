import { actionTypes } from './constants';

const setToken = token => ({
  type: actionTypes.SET_TOKEN,
  payload: { token },
});

export default {
  setToken,
};
