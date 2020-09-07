import { put } from 'redux-saga/effects';

import actions from '../actions';

function* processError({ id, error }) {
  yield put(actions.fetchError({ id, error }));
}

export default processError;
