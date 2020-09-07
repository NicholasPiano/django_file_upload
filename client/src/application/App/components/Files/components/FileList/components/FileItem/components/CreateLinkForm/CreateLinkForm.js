import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import DatePicker from 'react-datepicker';

const CreateLinkForm = ({ handleCreate }) => (
  <FinalForm
    onSubmit={handleCreate}
    render={({ handleSubmit: handleSubmitForm }) => (
      <Form onSubmit={handleSubmitForm}>
        <Form.Group widths='equal'>
          <Form.Field>
            <Field
              name='password'
              render={({ input: { onChange }, meta: { touched, error } }) => (
                <Input
                  fluid
                  placeholder='Password or blank'
                  onChange={onChange}
                  error={touched && error}
                />
              )}
            />
          </Form.Field>
          <Form.Field>
            <Field
              name='date_expires'
              render={({ input: { value, onChange }, meta: { touched, error } }) => (
                <DatePicker
                  fluid
                  selected={value}
                  onChange={onChange}
                />
              )}
            />
          </Form.Field>
          <Button type='submit'>
            Create
          </Button>
        </Form.Group>
      </Form>
    )}
  />
);

export default CreateLinkForm;
