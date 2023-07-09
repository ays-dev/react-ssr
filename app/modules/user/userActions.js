import { browserHistory } from 'react-router';
import { SubmissionError } from 'redux-form';

export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT';
export const USER_FAILED_SIGNIN = 'USER_FAILED_SIGNIN';
export const USER_ANONYMOUS = 'USER_ANONYMOUS';
export const USER_FAILED_REGISTER = 'USER_FAILED_REGISTER';

export function signin(_csrf) {
  return (values, dispatch, props) => {
    dispatch({ type: USER_SIGNIN });

    return fetch('/api/signin', { method: 'POST', body: JSON.stringify({ ...values, _csrf }) })
      .then(response => {
        if (!response.ok) {
          return response.json()
            .then(result => { throw new SubmissionError(result); });
        }
        props.history.push('/');
        return response.json();
      })
      .then(user => dispatch({ type: USER_SIGNED_IN, user }))
      .catch(error => {
        dispatch({ type: USER_FAILED_SIGNIN, error: error.message });
        throw error;
      });
  };
}

export function register(_csrf) {
  return (values, dispatch, props) => {
    dispatch({ type: USER_SIGNIN });

    return fetch('/api/register', { method: 'POST', body: JSON.stringify({ ...values, _csrf }) })
      .then(response => {
        if (!response.ok) {
          return response.json()
            .then(result => { throw new SubmissionError(result); });
        }
        props.history.push('/account');
        return response.json();
      })
      .then(user => dispatch({ type: USER_SIGNED_IN, user }))
      .catch(error => {
        dispatch({ type: USER_FAILED_REGISTER, error: error.message });
        throw error;
      });
  };
}
