import React, { useEffect } from 'react';

import { hooks } from '../../../../../../../../../../data/fetch';

const CreatedLink = ({ password, date_expires, fileId, handleIncrementReset }) => {
  const { loading, link } = hooks.useCreateLink({ fileId, password, date_expires });

  useEffect(() => {
    if (!loading && link) {
      handleIncrementReset();
    }
  }, [loading, link]);

  return null;
};

export default CreatedLink;
