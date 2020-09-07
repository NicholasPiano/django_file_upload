import { useState } from 'react';

import { hooks } from '../../../token';
import useQuery from '../useQuery';

const useRegister = () => {
  const [body, setBody] = useState();
  const [blocked, setBlocked] = useState(true);
  const resource = 'register';
  const method = 'POST';

  const { exists, loading, data, error } = useQuery({ resource, method, body, blocked });
  const onRegister = parameters => {
    setBlocked(false);
    setBody(parameters);
  };

  const { token } = data || {};
  const ready = hooks.useSetToken(token);

  return {
    exists,
    loading,
    ready,
    error,
    onRegister,
  };
};

export default useRegister;
