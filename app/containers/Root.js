// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
// import { darkBlack } from 'material-ui/styles/colors';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Routes from '../routes';

type Props = {
  store: {},
  history: {}
};

const theme = createMuiTheme();

// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: '#1a237e',
//     primary2Color: '#000051',
//     accent1Color: '#534bae',
//     textColor: darkBlack,
//     // primaryColor: '#1a237e',
//   },
// });

export default class Root extends Component<Props> {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={this.props.store}>
          <ConnectedRouter history={this.props.history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
