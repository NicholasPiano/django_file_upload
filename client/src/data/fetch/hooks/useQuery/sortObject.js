import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

const sortObject = body => {
  if (isArray(body)) {
    return body.map(value => sortObject(value)).join('.');
  }

  if (isObject(body)) {
    const sortedKeys = Object.keys(body).sort();

    return sortedKeys.reduce((acc, key) => {
      const value = body[key];
      const sorted = sortObject(value);
      const item = `${key}${sorted}`;

      return `${acc}.${item}`;
    }, '');
  }

  return `${body}`;
};

export default sortObject;
