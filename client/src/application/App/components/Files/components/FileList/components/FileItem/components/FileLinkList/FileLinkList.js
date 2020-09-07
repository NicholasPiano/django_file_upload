import React from 'react';
import { List } from 'semantic-ui-react';

import { FileLink } from './components';

const FileLinkList = ({ links }) => {

  return (
    <List>
      {links.map(link => <FileLink {...link} />)}
    </List>
  );
};

export default FileLinkList;
