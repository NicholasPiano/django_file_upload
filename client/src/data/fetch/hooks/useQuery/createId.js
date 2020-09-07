import forge from 'node-forge';

import sortObject from './sortObject';

const createId = ({ resource, resourceId = '', method = '', body = {}, parameters = {} }) => {
  const sortedBody = sortObject(body);
  const sortedParameters = sortObject(parameters);
  const digestibleString = `${resource}.${resourceId}.${method}.${sortedBody},${sortedParameters}`;
  const digest = forge.md.sha256.create().update(digestibleString).digest().toHex();

  return digest;
};

export default createId;
