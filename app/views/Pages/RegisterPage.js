import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import Button from 'reactstrap/lib/Button';
import Label from 'reactstrap/lib/Label';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import FormGroup from 'reactstrap/lib/FormGroup';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import * as UserActions from '../../modules/user/userActions';
import * as form from '../../utils/form';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.emailConfirmation) {
    errors.emailConfirmation = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting } = props;

  return (
    <div className='container h-100'>
      <div className='row h-100 justify-content-center align-items-center'>
        <div className='col-12'>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit(UserActions.register(props.initialValues._csrf))}>
                <div>
                  <h2>Sign up</h2>
                  <div>Be free.</div>
                </div>
                <br />
                <FormGroup>
                  <Field name='username' type='text' component={form.renderField} label='Username' />
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col md={{ size: 6 }}>
                      <Field
                        name='firstName'
                        type='text'
                        component={form.renderField}
                        label='First Name (optional)'
                      />
                    </Col>
                    <Col md={{ size: 6 }}>
                      <Field
                        name='lastName'
                        type='text'
                        component={form.renderField}
                        label='Last Name (optional)'
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Field name='email' type='text' component={form.renderField} label='Email' />
                </FormGroup>
                <FormGroup>
                  <Field
                    name='emailConfirmation'
                    type='text'
                    component={form.renderField}
                    label='Email confirmation'
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    name='password'
                    type='password'
                    component={form.renderField}
                    label='Password'
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Birthday</Label>
                  <Row>
                    <Col md={{ size: 4 }}>
                      { form.renderDayField() }
                    </Col>
                    <Col md={{ size: 4 }}>
                      { form.renderMonthField() }
                    </Col>
                    <Col md={{ size: 4 }}>
                      { form.renderYearField() }
                    </Col>
                  </Row>
                  <Field name='birthday' component={form.renderBirthdayErrors} />
                </FormGroup>
                <FormGroup>
                  <Label className='radioLabel'>
                    <Field name='gender' component='input' type='radio' value='male' />
                    {' Male'}
                  </Label>
                  <Label className='radioLabel'>
                    <Field name='gender' component='input' type='radio' value='female' />
                    {' Female'}
                  </Label>
                  <Field name='gender' component={form.renderGenderErrors} />
                </FormGroup>
                <div>
                  By clicking on the submit button you accept
                  <Link to='/terms'>all terms</Link>
                  {' including '}
                  <Link to='/cookies'>cookies</Link>
                </div>
                <br />
                <div>
                  <Button type='submit' disabled={pristine || submitting}>
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

const connectedRegisterForm = connect(state => ({
  initialValues: {
    _csrf: state.app.csrfToken
  }
}))(RegisterForm);

export default reduxForm({
  form: 'registerForm',
  validate
})(connectedRegisterForm);
