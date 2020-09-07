import React, { useState, useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { hooks } from '../../../../../../data/fetch';

const DeletedFile = ({ id, handleIncrementReset }) => {
  const [deleted, setDeleted] = useState(false);
  const { loading } = hooks.useDeleteFile(id);

  useEffect(() => {
    if (!deleted && !isUndefined(loading) && !loading) {
      handleIncrementReset();
      setDeleted(true);
    }
  }, [deleted, loading, handleIncrementReset]);

  return null;
};

export default DeletedFile;
