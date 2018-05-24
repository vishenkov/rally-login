export const START_DATA_FETCHING = 'START_DATA_FETCHING';
export const END_DATA_FETCHING = 'END_DATA_FETCHING';
// export const SET_LAST_UPDATE = '';
// export const SET_ARTIFACT_DATA = '';
export const ADD_FILTER = 'ADD_FILTER';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';
export const APPLY_SORTING = 'APPLY_SORTING';
export const RESET_SORTING = 'RESET_SORTING';
export const SET_API_RESPONSE = 'SET_API_RESPONSE';
export const SET_API_ERROR = 'SET_API_ERROR';
export const ADD_FIELD = 'ADD_FIELD';
export const REMOVE_FIELD = 'REMOVE_FIELD';
export const RESET_FIELDS = 'RESET_FIELDS';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_DATA_LIMIT = 'SET_DATA_LIMIT';
export const RESET_ALL = 'RESET_ALL';

export function startDataFetching(artifact) {
  return {
    type: START_DATA_FETCHING,
    artifact,
  };
}

export function endDataFetching(artifact) {
  return {
    type: END_DATA_FETCHING,
    artifact,
  };
}

export function resetAll() {
  return {
    type: RESET_ALL,
  };
}

function applySorting(artifact, index, direction) {
  return {
    type: APPLY_SORTING,
    artifact,
    index,
    direction,
  };
}

export function resetSorting(artifact) {
  return {
    type: RESET_SORTING,
    artifact,
  };
}

function setApiResponse(artifact, status, data, pages) {
  return {
    type: SET_API_RESPONSE,
    artifact,
    status,
    data,
    pages,
  };
}

function setApiError(artifact, status, error) {
  return {
    type: SET_API_ERROR,
    artifact,
    status,
    error,
  };
}

export function removeField(artifact, index) {
  return {
    type: REMOVE_FIELD,
    artifact,
    index,
  };
}

export function resetFields(artifact) {
  return {
    type: RESET_FIELDS,
    artifact,
  };
}

function setCurrentPage(artifact, currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    artifact,
    currentPage,
  };
}

function setDataLimit(artifact, limit) {
  return {
    type: SET_DATA_LIMIT,
    artifact,
    limit,
  };
}

export function fetchData(artifact) {
  return async (dispatch, getState) => {
    const { api, dataByArtifact } = getState();
    const {
      filters, sort, currentPage, limit, fields
    } = dataByArtifact[artifact];
    dispatch(startDataFetching(artifact));
    try {
      const response = await api[artifact]({
        filters, sort, currentPage, limit, fields
      });
      console.log(response);
      const data = response.Results;
      const pages = response.TotalResultCount;
      dispatch(setApiResponse(artifact, 'success', data, pages));
    } catch (err) {
      dispatch(setApiError(artifact, 'error', err.message));
    } finally {
      dispatch(endDataFetching(artifact));
    }
  };
}

export function setRowsPerPage(artifact, number) {
  return (dispatch) => {
    dispatch(setDataLimit(artifact, number));
    dispatch(fetchData(artifact));
  };
}

export function switchPage(artifact, number) {
  return (dispatch) => {
    dispatch(setCurrentPage(artifact, number));
    dispatch(fetchData(artifact));
  };
}

export function makeSort(artifact, index, direction) {
  return (dispatch) => {
    dispatch(applySorting(artifact, index, direction));
    dispatch(fetchData(artifact));
  };
}


export function addField(artifact, field) {
  return (dispatch) => {
    dispatch({
      type: ADD_FIELD,
      artifact,
      field,
    });
    dispatch(fetchData(artifact));
  };
}

export function addFilter(artifact, filter) {
  return (dispatch) => {
    dispatch({
      type: ADD_FILTER,
      artifact,
      filter,
    });
    dispatch(fetchData(artifact));
  };
}

export function updateFilter(artifact, index, fieldType, value) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_FILTER,
      artifact,
      index,
      fieldType,
      value,
    });
    dispatch(fetchData(artifact));
  };
}

export function removeFilter(artifact, index) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FILTER,
      artifact,
      index,
    });
    dispatch(fetchData(artifact));
  };
}

export function resetFilters(artifact) {
  return (dispatch) => {
    dispatch({
      type: RESET_FILTERS,
      artifact,
    });
    dispatch(fetchData(artifact));
  };
}
