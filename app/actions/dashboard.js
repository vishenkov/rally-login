import { execQuery } from './rally';

export const SET_PAGE = 'SET_PAGE';
export const FETCH_DATA = 'FETCH_DATA';

export function setPage(identity) {
  return {
    type: SET_PAGE,
    identity,
  };
}

export function fetchData(identity) {
  return (dispatch, getState) => {
    const state = getState().dashboard;
    const meta = state[identity] || {};
    dispatch(execQuery(identity, meta));
  };
}
