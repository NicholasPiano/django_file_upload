import React from 'react';
import { List } from 'semantic-ui-react';
import includes from 'lodash/includes';

import { hooks } from '../../../../../../data/fetch';
import { FileItem } from './components';
import StyledFileList from './FileList.style';

const FileList = ({ deleted, handleDelete, reset, handleIncrementReset }) => {
  const { exists, loading, files } = hooks.useFiles(reset);

  if (!exists) {
    return null;
  }

  if (loading) {
    return 'Loading...';
  }

  return (
    <StyledFileList>
      <List>
        {files.map(({ id, ...item }) => {
          if (includes(deleted, id)) {
            return null;
          }

          return (
            <FileItem
              key={id}
              id={id}
              {...item}
              handleDelete={() => handleDelete(id)}
              handleIncrementReset={handleIncrementReset}
            />
          );
        })}
      </List>
    </StyledFileList>
  );
};

export default FileList;
