// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import api from './api';
import dataByArtifact from './dataByArtifact';

const rootReducer = combineReducers({
  router,
  ...api,
  ...dataByArtifact,
});

export default rootReducer;
