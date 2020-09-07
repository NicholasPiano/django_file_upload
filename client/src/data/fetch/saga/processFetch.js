import { select, call } from 'redux-saga/effects';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';

import { selectors } from '../../token';
import fetchFromAPI from './fetchFromAPI';
import processError from './processError';
import processResponse from './processResponse';

function* processFetch(action) {
  const { id, ...rest } = action.payload;
  const token = yield select(selectors.tokenSelector);
  const result = yield fetchFromAPI({ ...rest, token });

  if (isArray(result) || 'id' in result) {
    yield call(processResponse, { id, response: result });

    return
  }

  const { error, detail, response, ...otherResponse } = result;

  if (error) {
    yield call(processError, { id, error });

    return
  }

  if (detail) {
    yield call(processError, { id, error: detail });

    return
  }

  if (!isEmpty(otherResponse)) {
    yield call(processResponse, { id, response: otherResponse });

    return
  }

  yield call(processResponse, { id, response });
}

export default processFetch;
