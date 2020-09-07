import React, { useState, useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { hooks } from '../../../../../../../../../../data/fetch';

const DeletedLink = ({ id, handleIncrementReset }) => {
  const [deleted, setDeleted] = useState(false);
  const { loading } = hooks.useDeleteLink(id);

  useEffect(() => {
    if (!deleted && !isUndefined(loading) && !loading) {
      handleIncrementReset();
      setDeleted(true);
    }
  }, [deleted, loading, handleIncrementReset]);

  return null;
};

export default DeletedLink;
