import {
  START_DATA_FETCHING,
  END_DATA_FETCHING,
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS,
  APPLY_SORTING,
  RESET_SORTING,
  ADD_FIELD,
  REMOVE_FIELD,
  RESET_FIELDS,
  SET_API_RESPONSE,
  SET_API_ERROR,
  SET_CURRENT_PAGE,
  SET_DATA_LIMIT,
  RESET_ALL,
} from '../actions';

function isFetching(state = false, action) {
  switch (action.type) {
    case START_DATA_FETCHING:
      return true;
    case END_DATA_FETCHING:
      return false;
    default:
      return state;
  }
}

// TODO: Fix id, optimize crud

function filters(state = [], action) {
  switch (action.type) {
    case ADD_FILTER: {
      const { field, operator, value } = action.filter;
      // const order = state.length;
      return [...state, {
        field, operator, value
      }];
    }

    case UPDATE_FILTER: {
      const {
        index, fieldType, value
      } = action;
      const newState = [...state];
      newState[index] = {
        ...newState[index],
        [fieldType]: value,
      };
      return newState;
      // return state.map(field => (field.order === order
      //   ? { ...field, [fieldType]: value }
      //   : field));
    }

    case REMOVE_FILTER: {
      const newState = [...state];
      newState.splice(action.index, 1);
      return newState;
      // return state.filter(({ order }) => order !== action.order).map((field, index) => ({...field, order: index }));
    }

    case RESET_FILTERS:
      return [];

    default:
      return state;
  }
}

function sort(state = null, action) {
  switch (action.type) {
    case APPLY_SORTING:
      return {
        index: action.index,
        direction: action.direction
      };

    case RESET_SORTING:
      return null;

    default:
      return state;
  }
}

const defaultFields = [{
  name: 'FormattedID',
  sort: null,
  isRequired: true,
}, {
  name: 'Name',
  sort: null,
  isRequired: true,
}, {
  name: 'Owner',
  order: 3,
}];

function fields(state = defaultFields, action) {
  // console.log('FIELDS', state);
  switch (action.type) {
    case ADD_FIELD:
      return [...state, {
        name: action.field,
        sort: null,
      }];

    // case APPLY_SORTING:
    //   return state.map((field, fieldIndex) => ({
    //     ...field,
    //     sort: fieldIndex === action.index
    //       ? action.direction
    //       : null
    //   }));

    case REMOVE_FIELD: {
      const newState = [...state];
      newState.splice(action.index, 1);
      return newState;
      // return state.filter(({ order }) => order !== action.order);
    }

    case RESET_FIELDS:
      return defaultFields;

    default:
      return state;
  }
}

const defaultArtifact = {
  data: [],
  fields: defaultFields,
  lastUpdate: -1,
  pages: 0,
  currentPage: 0,
  limit: 25,
  status: null,
  error: null,
  filters: [],
  sort: null,
  isFetching: false,
};

function response(state = defaultArtifact, action) {
  switch (action.type) {
    case SET_API_RESPONSE: {
      const { data, status, pages } = action;
      return {
        ...state,
        data,
        status,
        pages,
        lastUpdate: Date.now(),
      };
    }

    case SET_API_ERROR: {
      const { status, error } = action;
      return {
        ...state,
        status,
        error,
      };
    }

    default:
      return state;
  }
}

const defaultData = {
  defects: defaultArtifact,
  userstories: defaultArtifact,
};

function dataByArtifact(state = defaultData, action) {
  // console.log('dataByArtifact', action.artifact, state);
  switch (action.type) {
    case START_DATA_FETCHING:
    case END_DATA_FETCHING:
      return {
        ...state,
        [action.artifact]: {
          ...state[action.artifact],
          isFetching: isFetching(state[action.artifact].isFetching, action),
        },
      };

    case ADD_FILTER:
    case UPDATE_FILTER:
    case REMOVE_FILTER:
    case RESET_FILTERS:
      return {
        ...state,
        [action.artifact]: {
          ...state[action.artifact],
          filters: filters(state[action.artifact].filters, action),
        },
      };

    case APPLY_SORTING:
    case RESET_SORTING:
      return {
        ...state,
        [action.artifact]: {
          ...state[action.artifact],
          sort: sort(state[action.artifact].sort, action),
          // fields: fields(state[action.artifact].fields, action),
        },
      };

    case ADD_FIELD:
    case REMOVE_FIELD:
    case RESET_FIELDS:
      return {
        ...state,
        [action.artifact]: {
          ...state[action.artifact],
          fields: fields(state[action.artifact].fields, action),
        },
      };

    case SET_API_RESPONSE:
    case SET_API_ERROR:
      return {
        ...state,
        [action.artifact]: {
          ...state[action.artifact],
          ...response(state[action.artifact], action),
        }
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        [action.artifact]: {
          ...state[action.artifact],
          currentPage: action.currentPage,
        },
      };

    case SET_DATA_LIMIT:
      return {
        ...state,
        [action.artifact]: {
          ...state[action.artifact],
          limit: action.limit,
        },
      };

    case RESET_ALL:
      return defaultData;

    default:
      return state;
  }
}

export default {
  dataByArtifact,
};
