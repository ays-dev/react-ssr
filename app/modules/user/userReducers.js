import {
  USER_ANONYMOUS,
  USER_SIGNIN,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  USER_FAILED_SIGNIN
} from './userActions';

export default function user(state = {
  readyState: USER_ANONYMOUS,
  loggedAt: null,
  logoutAt: null,
  data: null
}, action) {
  switch (action.type) {
    case USER_SIGNIN:
      return {
        ...state,
        readyState: USER_SIGNIN,
        data: null
      };
    case USER_SIGNED_IN:
      return {
        ...state,
        readyState: USER_SIGNED_IN,
        loggedAt: new Date(),
        data: action.user
      };
    case USER_FAILED_SIGNIN:
      return {
        ...state,
        readyState: USER_FAILED_SIGNIN,
        error: action.error,
        data: null
      };
    case USER_SIGNED_OUT:
      return {
        ...state,
        readyState: USER_SIGNED_OUT,
        logoutAt: new Date(),
        data: null
      };
    default:
      return state;
  }
}
