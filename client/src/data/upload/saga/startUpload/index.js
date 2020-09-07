import { put, call, select } from 'redux-saga/effects';

import { selectors } from '../../../token';
import actions from '../../actions';
import getFileMD5 from './getFileMD5';

const url = 'http://localhost:8000/api';

function* uploadComplete({ id, upload_id, md5, method, headers }) {
  const completeUrl = `${url}/files/${id}/upload_complete`;
  const body = new FormData();
  body.append('md5', md5);
  body.append('upload_id', upload_id);
  body.append('id', id);

  yield fetch(completeUrl, { method, headers, body }).then(response => response.json());
  yield put(actions.updateProgress({ id, progress: 100 }));
};

function* restOfFiles({ rest, upload_id, id, uploadUrl, method, headers, total }) {
  for (let i=0; i<rest.length; i++) {
    const file = rest[i];
    const body = new FormData();
    body.append('file', file);
    body.append('upload_id', upload_id);
    const start = (i + 1) * 100000;
    const end = start + file.size - 1;
    const requestHeaders = {
      ...headers,
      'Content-Length': file.size,
      'Content-Range': `bytes ${start}-${end}/${total}`,
    };

    yield fetch(uploadUrl, { method, headers: requestHeaders, body }).then(response => response.json());

    const progress = (end / total) * 100;
    yield put(actions.updateProgress({ id, progress }));
  }
}

function* firstFile({ first, id, uploadUrl, method, headers, total }) {
  const body = new FormData();
  body.append('file', first);

  const start = 0;
  const end = start + first.size - 1;
  const requestHeaders = {
    ...headers,
    'Content-Length': first.size,
    'Content-Range': `bytes ${start}-${end}/${total}`,
  };

  const { upload_id } = yield fetch(uploadUrl, { method, headers: requestHeaders, body }).then(response => response.json());
  const progress = (end / total) * 100;
  yield put(actions.updateProgress({ id, progress }));

  return { upload_id };
}

function* startUpload(action) {
  const { id, file } = action.payload;
  const { md5, chunks } = yield getFileMD5(file);
  const [first, ...rest] = chunks;

  const uploadUrl = `${url}/files/${id}/upload`;
  const method = 'POST';
  const token = yield select(selectors.tokenSelector);
  const headers = {
    'Authorization': `Token ${token}`,
  };

  const parameters = { id, uploadUrl, method, headers, total: file.size };
  const { upload_id } = yield call(firstFile, { first, ...parameters });

  yield call(restOfFiles, { rest, upload_id, ...parameters });
  yield call(uploadComplete, { upload_id, md5, ...parameters });
}

export default startUpload;
