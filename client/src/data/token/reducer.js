import { actionTypes } from './constants';

const reducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return action.payload.token;

    default:
      return state;
  }
};

export default reducer;
