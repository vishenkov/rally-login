import React, { Component } from 'react';
import Layout from './Layout';

export default class Defects extends Component {
  render() {
    // console.log(this.props);
    return (
      <Layout title="Custom App">
        <h1>Defects By Portfolio Items</h1>
        <webview
          partition="persist:rally"
          src="http://localhost:1337/App-debug.html?apiKey=_OZv25uYmROOvGCVGADuMMT6Aw3Q2iUvdpJiswrmVFZQ"
          style={{ display: 'inline-flex', width: '100%', height: '480px' }}
        />
      </Layout>
    );
  }
}
