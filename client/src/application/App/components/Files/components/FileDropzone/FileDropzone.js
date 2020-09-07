import React, { useState, useCallback } from 'react';
import { List } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import includes from 'lodash/includes';

import { CreatedFile } from './components';
import StyledFileDropzone from './FileDropzone.style';

const FileDropzone = ({ handleIncrementReset }) => {
  const [files, setFiles] = useState([]);
  const makeKey = ({ lastModified, path }) => `${lastModified}${path}`;
  const onDrop = useCallback(acceptedFiles => {
    const existingKeys = files.map(({ key }) => key);
    const validFiles = acceptedFiles.filter(file => !includes(existingKeys, makeKey(file)))
    const filesWithKeys = validFiles.map(file => {
      file.key = makeKey(file);
      return file;
    });

    setFiles([...files, ...filesWithKeys]);
  }, [files])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <List>
        {files.map(file => (
          <CreatedFile handleIncrementReset={handleIncrementReset} key={file.key} file={file} />
        ))}
      </List>
      <StyledFileDropzone {...getRootProps()}>
        <input {...getInputProps()} />
        {(
          isDragActive
            ? 'Drop files here...'
            : 'Drag and drop or click to select files'
        )}
      </StyledFileDropzone>
    </>
  );
};

export default FileDropzone;
