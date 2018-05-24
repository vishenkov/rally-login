import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
// import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import LoginForm from './LoginForm';
import CALogo from './CALogo';
import styles from './Login.css';

export default class Login extends Component {
  static defaultProps = {
    response: null,
  };

  state = {
    username: process.env.NODE_ENV === 'development' ? 'y2185923@mvrht.net' : '',
    password: process.env.NODE_ENV === 'development' ? '!qwerty2017' : '',
    // username: '',
    // password: '',
  };

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECEIVE PROPS');
    console.log(nextProps);
    const { response } = nextProps;
    if (response && response.status === 'error') {
      this.setState({ open: true });
    }
  }
  componentWillUnmount() {
    console.log('WILL UNMOUNT');
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSubmit = (username, password) => {
    this.setState({
      username,
      password: '',
      open: true
    });
    // console.log(username, password);
    this.props.fetchApi(username, password);
  };

  render() {
    const { username, password } = this.state;
    const { isLoggedIn, response, isFetching } = this.props;

    console.log(this.props);
    return (
      <div className={styles.main}>
        <Grid
          container
          alignItems="stretch"
          spacing={0}
          className={styles.container}
        >
          <Grid item xs={12} sm={7} md={6} lg={4}>
            <div className={styles.left}>
              {isFetching &&
                <div className={styles.loader}>
                  <CircularProgress size={50} />
                </div>}
              <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                className={styles.container}
              >
                <Grid item className={styles.content}>
                  <CALogo />
                  <Typography gutterBottom variant="display1" color="inherit" className={styles.header}>
                    Sign In
                  </Typography>
                  <LoginForm
                    username={username}
                    password={password}
                    onSubmit={this.handleSubmit}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Hidden xsDown>
            <Grid item>
              <div className={styles.right} />
            </Grid>
          </Hidden>
        </Grid>

        {isLoggedIn && <Redirect to="/main" />}
        {response && (
          <Snackbar
            open={this.state.open}
            SnackbarContentProps={{
              style: { backgroundColor: '#861212' },
            }}
            message={
              <Typography color="inherit">
                {response.message || 'Unknown'}
              </Typography>
            }
            autoHideDuration={15000}
            onClose={this.handleRequestClose}
            action={
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                // className={classes.close}
                onClick={this.handleRequestClose}
              >
                <CloseIcon />
              </IconButton>
            }
          />
          )}
      </div>
    );
  }
}

Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }),
  fetchApi: PropTypes.func.isRequired,
};
