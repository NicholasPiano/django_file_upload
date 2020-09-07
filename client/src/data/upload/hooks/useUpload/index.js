import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../../actions';
import selectors from '../../selectors';

const useUpload = ({ id, file, blocked }) => {
  const dispatch = useDispatch();
  const progress = useSelector(selectors.progressSelector)(id);

  useEffect(() => {
    if (file && !blocked) {
      dispatch(actions.startUpload({ id, file }));
    }
  }, [file, blocked]);

  return { progress };
};

export default useUpload;
