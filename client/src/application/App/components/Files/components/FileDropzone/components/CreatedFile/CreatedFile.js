import React, { useState, useEffect } from 'react';

import { hooks } from '../../../../../../../../data/fetch';
import { StyledProgress } from './components';
import StyledCreatedFile from './CreatedFile.style';

const CreatedFile = ({ handleIncrementReset, file }) => {
  const [show, setShow] = useState(true);
  const { loading, progress } = hooks.useCreateFile(file);

  useEffect(() => {
    if (progress === 100) {
      setShow(false);
      handleIncrementReset();
    }
  }, [progress]);

  if (!show) {
    return null;
  }

  return (
    <StyledCreatedFile>
      <StyledProgress width={progress} />
      {file.path}
    </StyledCreatedFile>
  );
};

export default CreatedFile;
