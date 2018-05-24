import rally from '../utils/rally';
import {
  SET_RALLY,
  REMOVE_RALLY,
  SUCCESS_AUTH,
  FAIL_AUTH,
  START_FETCH,
  END_FETCH,
  SET_ERROR,
  SET_DATA
} from '../actions/rally';

const defaultState = {
  api: null,
  success: false,
  fetching: false,
  errorText: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_RALLY:
      return {
        ...state,
        api: rally(action.username, action.password)
      };
    case REMOVE_RALLY:
      return { ...state, api: null };

    case START_FETCH:
      return { ...state, fetching: true };

    case END_FETCH:
      return { ...state, fetching: false };

    case SUCCESS_AUTH:
      return { ...state, success: true };

    case FAIL_AUTH:
      return { ...state, success: false };

    case SET_ERROR:
      return { ...state, errorText: action.errorText };

    case SET_DATA:
      return { ...state, data: action.data };

    default:
      return state;
  }
}
