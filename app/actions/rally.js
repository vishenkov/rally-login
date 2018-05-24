export const SET_RALLY = 'SET_RALLY';
export const REMOVE_RALLY = 'REMOVE_RALLY';
export const SUCCESS_AUTH = 'SUCCESS_AUTH';
export const FAIL_AUTH = 'FAIL_AUTH';
export const START_FETCH = 'START_FETCH';
export const END_FETCH = 'END_FETCH';
export const SET_ERROR = 'SET_ERROR';
export const SET_DATA = 'SET_DATA';

export function setRally(username, password) {
  return {
    type: SET_RALLY,
    username,
    password,
  };
}

export function removeRally() {
  return {
    type: REMOVE_RALLY,
  };
}

export function successAuth() {
  return {
    type: SUCCESS_AUTH,
  };
}

export function failAuth() {
  return {
    type: FAIL_AUTH,
  };
}

export function startFetch() {
  return {
    type: START_FETCH,
  };
}

export function endFetch() {
  return {
    type: END_FETCH,
  };
}

export function setError(errorText) {
  return {
    type: SET_ERROR,
    errorText,
  };
}

export function setData(data) {
  return {
    type: SET_DATA,
    data,
  };
}

export function checkAuth(username, password) {
  return async (dispatch, getState) => {
    dispatch(setRally(username, password));
    const { api } = getState().rally;
    dispatch(startFetch());
    try {
      await api.checkAuth();
      dispatch(successAuth());
    } catch (err) {
      console.error(err);
      dispatch(failAuth());
      dispatch(setError(err.message));
    } finally {
      dispatch(endFetch());
    }
  };
}

export function execQuery(identity, meta) {
  return async (dispatch, getState) => {
    const { api } = getState().rally;
    dispatch(startFetch());
    try {
      const data = await api[identity](meta);
      dispatch(setData(data));
    } catch (err) {
      console.error(err);
      dispatch(setError(err.message));
    } finally {
      dispatch(endFetch());
    }
  };
}
