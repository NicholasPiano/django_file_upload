import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Input, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';

import { hooks } from '../../../../data/fetch';
import { paths } from '../../constants';
import StyledLogin from './Login.style';

const Login = ({ register: registerMode }) => {
  const [redirect, setRedirect] = useState(false);
  const { loading: loginLoading, ready: loginReady, error: loginError, onLogin } = hooks.useLogin();
  const { loading: registerLoading, ready: registerReady, error: registerError, onRegister } = hooks.useRegister();

  useEffect(() => {
    if (!loginLoading && !registerLoading && (loginReady || registerReady)) {
      setRedirect(true);
    }
  }, [loginLoading, registerLoading, loginReady, registerReady]);

  const handleSubmit = parameters => {
    if (registerMode) {
      return onRegister(parameters);
    }

    onLogin(parameters);
  };

  if (redirect) {
    return (
      <Redirect to={paths.FILES} />
    )
  }

  return (
    <StyledLogin>
      <FinalForm
        onSubmit={handleSubmit}
        render={({ handleSubmit: handleSubmitForm }) => (
          <Form onSubmit={handleSubmitForm}>
            <Form.Group widths='equal'>
              <Form.Field>
                <Field
                  name='username'
                  render={({ input: { onChange }, meta: { touched, error } }) => (
                    <Input
                      fluid
                      placeholder='Username'
                      onChange={onChange}
                      error={touched && error}
                    />
                  )}
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name='password'
                  render={({ input: { onChange }, meta: { touched, error } }) => (
                    <Input
                      fluid
                      placeholder='password'
                      type='password'
                      onChange={onChange}
                      error={touched && error}
                    />
                  )}
                />
              </Form.Field>
              <Button type='submit'>
                {registerMode ? 'Register' : 'Login'}
              </Button>
              <Link
                component={Button}
                to={registerMode ? paths.LOGIN : paths.REGISTER}
              >
                {registerMode ? 'Back' : 'Register'}
              </Link>
            </Form.Group>
          </Form>
        )}
      />
      {loginError && loginError}
      {registerError && registerError}
    </StyledLogin>
  );
};

export default Login;
