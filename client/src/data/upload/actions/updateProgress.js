import { actionTypes } from '../constants';

const updateProgress = ({ id, progress }) => ({
  type: actionTypes.UPDATE_PROGRESS,
  payload: {
    id,
    progress,
  },
});

export default updateProgress;
