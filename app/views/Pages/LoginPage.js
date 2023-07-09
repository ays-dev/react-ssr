import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from 'reactstrap/lib/Button';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';

import * as UserActions from '../../modules/user/userActions';
import * as form from '../../utils/form';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const LoginForm = props => {
  const {
    error, handleSubmit, submitting
  } = props;

  return (
    <div className='container h-100'>
      <div className='row h-100 justify-content-center align-items-center'>
        <div className='col-12'>
          <Card className='mx-auto'>
            <CardBody>
              <form onSubmit={handleSubmit(UserActions.signin(props.initialValues._csrf))}>
                <div className='text-center'>
                  <h2>Log in</h2>
                </div>
                <br />
                <Field name='username' type='text' component={form.renderField} label='Username' />
                <br />
                <Field name='password' type='password' component={form.renderField} label='Password' />
                Forgotten password?
                { error && (
                <div>
                  <div>
                    <strong>{error}</strong>
                  </div>
                  <br />
                </div>
                ) }
                <div>
                  <Button type='submit' disabled={submitting} color='info'>
                    Submit
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
          <span>Contact</span>
          <span>Terms of use</span>
          <span>Privacy</span>
        </div>
      </div>
    </div>
  );
};

const connectedLoginForm = connect(state => ({
  initialValues: {
    _csrf: state.app.csrfToken
  }
}))(LoginForm);

export default reduxForm({
  form: 'loginForm',
  validate
})(connectedLoginForm);
