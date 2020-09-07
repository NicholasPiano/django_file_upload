import { actionTypes } from '../constants';

const startUpload = ({ id, file }) => ({
  type: actionTypes.START_UPLOAD,
  payload: { id, file },
});

export default startUpload;
