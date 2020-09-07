import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';

import fetchSelector from './fetchSelector';

const querySelector = createSelector(
  fetchSelector,
  fetch => memoize(
    id => {
      if (id in fetch) {
        return fetch[id];
      }

      return { exists: false };
    },
  ),
);

export default querySelector;
