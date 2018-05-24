import { ACCEPT_CREDENTIALS, RESET_CREDENTIALS, SHOW_ERROR, HIDE_ERROR } from '../actions/login';

const defaultState = {
  loggedin: false,
  error: false,
  errorText: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ACCEPT_CREDENTIALS:
      return { ...state, loggedin: true };
    case RESET_CREDENTIALS:
      return { ...state, loggedin: false };
    case SHOW_ERROR:
      return { ...state, error: true, errorText: action.errorText };
    case HIDE_ERROR:
      return { ...state, error: false };
    default:
      return state;
  }
}
