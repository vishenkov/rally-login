import {
  SET_PAGE
} from '../actions/dashboard';

const defaultState = {
  page: { identity: 'defect', name: 'defect' },
  defect: {
    filters: [{ field: 'State', operator: '=', value: 'Submitted' }],
  }
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: { identity: action.identity, name: action.identity }
      };

    default:
      return state;
  }
}
