import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import { loadState, saveState } from './store/localStorage';
import './app.global.css';

const initialState = loadState();
const store = configureStore(initialState);
store.subscribe(() => {
  const dataByArtifact = {};
  ['defects', 'userstories'].forEach(artifact => {
    const { [artifact]: { filters = [], fields = [], limit = 25 } } = store.getState().dataByArtifact;
    dataByArtifact[artifact] = {
      filters,
      fields,
      limit,
      data: [],
      lastUpdate: -1,
      pages: 0,
      currentPage: 0,
      status: null,
      error: null,
      sort: null,
      isFetching: false,
    };
  });
  saveState({ dataByArtifact });
});


render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
