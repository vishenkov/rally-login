import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Layout from './Layout';

export default class Defects extends Component {
  handleLoadDefaultsClick = event => {
    event.preventDefault();
    this.props.resetAll();
  }

  render() {
    return (
      <Layout title="Settings">
        <Typography variant="display1" gutterBottom>
          Load
        </Typography>
        <Button variant="raised" onClick={this.handleLoadDefaultsClick}>
          Load Defaults
        </Button>
      </Layout>
    );
  }
}
