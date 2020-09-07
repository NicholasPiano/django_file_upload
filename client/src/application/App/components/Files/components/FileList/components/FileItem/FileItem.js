import React, { useState, useCallback } from 'react';
import { List, Button } from 'semantic-ui-react';

import { CreatedLink, CreateLinkForm, DeletedLink, FileLinkList, StyledChildren, StyledFile } from './components';

const FileItem = ({ id, name, handleDelete, links, handleIncrementReset, ...rest }) => {
  const [createdLinks, setCreatedLinks] = useState([]);
  const [creating, setCreating] = useState(false);
  const [deleted, setDeleted] = useState([]);
  const handleDeleteLink = useCallback(id => setDeleted([...deleted, id]), [deleted]);
  const handleCreate = ({ password, date_expires }) => {
    const key = `${password}${date_expires}${createdLinks.length}`;

    setCreatedLinks([...createdLinks, { password, date_expires, key }])
  };

  return (
    <List.Item>
      <StyledFile>
        <Button size="mini" onClick={handleDelete}>x</Button>
        {name}{' '}
        <Button size="mini" onClick={() => setCreating(!creating)}>Create link</Button>
      </StyledFile>
      <StyledChildren>
        <FileLinkList links={links} />
        {createdLinks.map(link => <CreatedLink {...link} fileId={id} handleIncrementReset={handleIncrementReset} />)}
        {creating && <CreateLinkForm handleCreate={handleCreate} />}
        {deleted.map(id => (
          <DeletedLink
            key={id}
            id={id}
            handleDeleteLink={handleDeleteLink}
            handleIncrementReset={handleIncrementReset}
          />
        ))}
      </StyledChildren>
    </List.Item>
  );
};

export default FileItem;
