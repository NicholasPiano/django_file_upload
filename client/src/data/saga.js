import { spawn } from 'redux-saga/effects';

import { saga as fetchSaga } from './fetch';
import { saga as uploadSaga } from './upload';

function* saga() {
  yield spawn(fetchSaga);
  yield spawn(uploadSaga);
}

export default saga;
