import React, { useState, useCallback } from 'react';
import { Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { hooks } from '../../../../data/token';
import { paths } from '../../constants';
import { DeletedFile, FileDropzone, FileList } from './components';
import StyledFiles from './Files.style';

const Files = () => {
  const [deleted, setDeleted] = useState([]);
  const [reset, setReset] = useState(0);
  const handleIncrementReset = useCallback(() => setReset(reset + 1), [reset]);
  const handleDelete = useCallback(id => setDeleted([...deleted, id]), [deleted]);
  const authenticated = !!hooks.useToken();

  if (!authenticated) {
    return (
      <Redirect to={paths.LOGIN} />
    );
  }

  return (
    <StyledFiles>
      <Header>Files</Header>
      <FileList
        reset={reset}
        deleted={deleted}
        handleDelete={handleDelete}
        handleIncrementReset={handleIncrementReset}
      />
      <FileDropzone handleIncrementReset={handleIncrementReset} />
      {deleted.map(id => <DeletedFile key={id} id={id} handleIncrementReset={handleIncrementReset} />)}
    </StyledFiles>
  );
};

export default Files;
