import { useState } from 'react';

import useQuery from '../useQuery';

const useLogout = () => {
  const [blocked, setBlocked] = useState(true);
  const resource = 'users';

  const { exists, loading } = useQuery({ resource, blocked });
  const onLogout = () => setBlocked(false);

  return {
    exists,
    loading,
    onLogout,
  };
};

export default useLogout;
