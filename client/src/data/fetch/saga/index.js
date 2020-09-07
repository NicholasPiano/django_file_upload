import { takeEvery } from 'redux-saga/effects';

import { actionTypes } from '../constants';
import processFetch from './processFetch';

function* saga() {
  yield takeEvery(actionTypes.FETCH, processFetch);
}

export default saga;
