import React, { Component } from 'react';
// import Button from 'material-ui/Button';
import { Redirect } from 'react-router';
import Layout from './Layout';

export default class SignOut extends Component {
  componentDidMount() {
    this.props.resetLoggedIn();
  }

  render() {
    console.log('SO', this.props);
    const { isLoggedIn } = this.props;
    return (
      <Layout title="SignOut">
        {!isLoggedIn && <Redirect to="/" />}
      </Layout>
    );
  }
}
