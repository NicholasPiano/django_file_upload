
import { actionTypes } from '../constants';
import updateProgress from './updateProgress';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROGRESS:
      return updateProgress(state, action);

    default:
      return state;
  }
};

export default reducer;
