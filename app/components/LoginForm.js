import React from 'react';
import styles from './LoginForm.css';

export default class LoginForm extends React.Component {
  static defaultProps = {
    username: '',
    password: ''
  };

  state = {
    username: this.props.username,
    password: this.props.password,
  };

  onChange = type => e => {
    // this.props.onInputChange();
    this.setState({ [type]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.onSubmit(username, password);
  };

  render() {
    const { username, password } = this.state;
    // this.props.onSubmit(username, password);
    return (
      <form onSubmit={this.onSubmit}>
        <div className={styles.row}>
          <label
            className={styles.label}
            htmlFor="username"
          >
            USERNAME
          </label>
          <input
            className={styles.input}
            id="username"
            type="text"
            value={username}
            onChange={this.onChange('username')}
          />
        </div>
        <div className={styles.row}>
          <label
            className={styles.label}
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            value={password}
            onChange={this.onChange('password')}
          />
        </div>
        <div className={styles.row}>
          <input className={styles.btn} type="submit" value="Sign In" />
        </div>
      </form>
    );
  }
}
