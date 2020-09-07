import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../../actions';
import selectors from '../../selectors';
import createId from './createId';

const useQuery = ({
  resource,
  id: resourceId,
  method,
  body,
  parameters,
  blocked = false,
  reset: queryReset,
}) => {
  const [reset, setReset] = useState(0);
  const dispatch = useDispatch();
  const id = createId({ resource, resourceId, method, body, parameters });
  const { exists, ...rest } = useSelector(selectors.querySelector)(id);

  useEffect(() => {
    if (!blocked) {
      dispatch(actions.fetch({ id, resource, resourceId, method, body, parameters }));
    }
  }, [id, reset, blocked, queryReset]);

  useEffect(() => {
    setReset(0);
  }, [id]);

  const onResetQuery = useCallback(() => setReset(reset + 1), [reset]);

  return { exists, onResetQuery, ...rest };
};

export default useQuery;
