import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';

import uploadSelector from './uploadSelector';

const progressSelector = createSelector(
  uploadSelector,
  upload => memoize(
    id => upload[id],
  ),
);

export default progressSelector;
