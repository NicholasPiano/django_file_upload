import { takeEvery } from 'redux-saga/effects';

import { actionTypes } from '../constants';
import startUpload from './startUpload';

function* saga() {
  yield takeEvery(actionTypes.START_UPLOAD, startUpload);
}

export default saga;
