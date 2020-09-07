import React from 'react';
import { List } from 'semantic-ui-react';

const FileLink = ({ token }) => {

  return (
    <List.Item>
      {`http://localhost:3000/download/${token}/`}
    </List.Item>
  );
};

export default FileLink;
