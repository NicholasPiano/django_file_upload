import { put } from 'redux-saga/effects';

import actions from '../actions';

function* processResponse({ id, response }) {
  yield put(actions.fetchResponse({ id, response }));
}

export default processResponse;
