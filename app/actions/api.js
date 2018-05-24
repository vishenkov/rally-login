import rallyApi from '../utils/rally/index';

export const START_API_FETCHING = 'START_API_FETCHING';
export const END_API_FETHCING = 'END_API_FETHCING';
export const SET_LOGGEDIN = 'SET_LOGGEDIN';
export const RESET_LOGGEDIN = 'RESET_LOGGEDIN';
export const SET_RESPONSE = 'SET_RESPONSE';
export const RESET_RESPONSE = 'RESET_RESPONSE';
export const SET_API = 'SET_API';

function startApiFetching() {
  return {
    type: START_API_FETCHING,
  };
}

function endApiFetching() {
  return {
    type: END_API_FETHCING,
  };
}

function setLoggedIn() {
  return {
    type: SET_LOGGEDIN,
  };
}

export function resetLoggedIn() {
  return {
    type: RESET_LOGGEDIN,
  };
}

function setResponse(status, message) {
  return {
    type: SET_RESPONSE,
    status,
    message,
  };
}

function resetResponse() {
  return {
    type: RESET_RESPONSE,
  };
}

function setApi(api) {
  return {
    type: SET_API,
    api
  };
}

export function fetchApi(username, password) {
  return async (dispatch) => {
    dispatch(resetResponse());
    dispatch(startApiFetching());
    try {
      const api = rallyApi(username, password);
      await api.checkAuth();
      dispatch(setApi(api));
      dispatch(setResponse('success', 'Success!'));
      dispatch(endApiFetching());
      dispatch(setLoggedIn());
    } catch (err) {
      dispatch(setResponse('error', err.message));
      dispatch(endApiFetching());
    }
  };
}
