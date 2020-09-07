import React, { useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { hooks } from '../../../../data/fetch';

const Download = ({ match: { params: { token } } }) => {
  const [linkPassword, setLinkPassword] = useState(null);
  const { loading, data, error } = hooks.useCheckDownload(token);
  const { has_password, file_name } = data || {};

  if (error) {
    return error;
  }

  if (loading) {
    return 'Loading...';
  }

  if (!has_password) {
    const href = `http://localhost:8000/api/files/download/${token}/password`;

    return (
      <a href={href} download={file_name}>
        Click here to download file
      </a>
    );
  }

  const href = `http://localhost:8000/api/files/download/${token}/${linkPassword}`;

  const handleChange = (e, { value }) => setLinkPassword(value);

  return (
    <Form>
      <Form.Group>
        <Input
          placeholder="Link password"
          onChange={handleChange}
        />
        <a href={href} download={file_name}>
          Click here to download file
        </a>
      </Form.Group>
    </Form>
  );
};

export default Download;
