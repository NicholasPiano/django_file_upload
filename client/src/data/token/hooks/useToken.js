import { useSelector } from 'react-redux';

import { tokenSelector } from '../selectors';

const useToken = () => {
  const token = useSelector(tokenSelector);

  return token;
};

export default useToken;
