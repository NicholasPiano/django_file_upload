import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import actions from '../actions';
import useToken from './useToken';

const useSetToken = token => {
  const dispatch = useDispatch();
  const stored = !!useToken();

  useEffect(() => {
    if (token) {
      dispatch(actions.setToken(token));
    }
  }, [token]);

  return stored;
};

export default useSetToken;
