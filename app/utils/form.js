import React from 'react';
import { Field } from 'redux-form';
import range from 'lodash/range';
import TextareaAutosize from 'react-autosize-textarea';

import Input from 'reactstrap/lib/Input';

import { months } from './locals';

export function renderTextarea() {
  return (
    <TextareaAutosize
      placeholder='Add a comment'
      className='add-comment form-control'
      style={{ minHeight: '3rem' }}
    />
  );
}

export function renderField({
  input, label, type, meta: { touched, error }
}) {
  return (
    <div>
      <Input {...input} placeholder={label} type={type} />
      {touched && error && (
      <span>
        {error}
      </span>
      )}
    </div>
  );
}

export function renderCsrf(_csrf) {
  return function renderField({
    input, label, type, meta: { touched, error }
  }) {
    return (
      <div>
        <Input {...input} placeholder={label} type={type} value={_csrf} />
        {touched && error && (
        <span>
          {error}
        </span>
        )}
      </div>
    );
  }
}

export function renderBirthdayErrors({ meta: { touched, error } }) {
  return (
    <div>
      {touched && error && (
      <span>
        {error}
      </span>
      )}
    </div>
  );
}

export function renderGenderErrors({ meta: { touched, error } }) {
  return (
    <div>
      {touched && error && (
      <span>
        {error}
      </span>
      )}
    </div>
  );
}

export function reminder({ input, label, type }) {
  return (
    <Input id='reminder' {...input} placeholder={label} type={type} />
  );
}

export function renderDayField() {
  return (
    <Field name='birthDay' component='select' className='form-control'>
      <option key='0'>
        Day
      </option>
      { range(1, 32).map(val => (
        <option key={val} value={val}>
          {val}
        </option>
      )) }
    </Field>
  );
}

export function renderMonthField() {
  return (
    <Field name='birthMonth' component='select' className='form-control'>
      <option key='0'>
        Month
      </option>
      { range(1, 13).map((val, key) => (
        <option key={val} value={val}>
          {months[key]}
        </option>
      )) }
    </Field>
  );
}

export function renderYearField() {
  return (
    <Field name='birthYear' component='select' className='form-control'>
      <option key='0'>
        Year
      </option>
      { range(new Date().getFullYear(), 1905)
        .map((val, key) => (
          <option key={key + 1} value={val}>
            {val}
          </option>
        )) }
    </Field>
  );
}
