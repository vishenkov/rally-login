import {
  START_API_FETCHING,
  END_API_FETHCING,
  SET_LOGGEDIN,
  RESET_LOGGEDIN,
  SET_RESPONSE,
  RESET_RESPONSE,
  SET_API,
} from '../actions';
import getApi from '../utils/rally';

function isFetching(state = false, action) {
  switch (action.type) {
    case START_API_FETCHING:
      return true;
    case END_API_FETHCING:
      return false;
    default:
      return state;
  }
}

// TODO: Set default api state to null!
function api(state = process.env.NODE_ENV === 'development' ? getApi('y2185923@mvrht.net', '!qwerty2017') : null, action) {
  switch (action.type) {
    case SET_API:
      return action.api;
    default:
      return state;
  }
}

function isLoggedIn(state = false, action) {
  switch (action.type) {
    case SET_LOGGEDIN:
      return true;
    case RESET_LOGGEDIN:
      return false;
    default:
      return state;
  }
}

function response(state = null, action) {
  switch (action.type) {
    case SET_RESPONSE:
      return { status: action.status, message: action.message };
    case RESET_RESPONSE:
      return null;
    default:
      return state;
  }
}

export default {
  isFetching,
  api,
  isLoggedIn,
  response,
};
