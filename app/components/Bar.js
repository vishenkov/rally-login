import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

export default class Bar extends Component {
  static defaultProps = {
    title: 'Rally Login'
  }

  state = {
    open: false,
  };

  render() {
    const { title } = this.props;
    // console.log('APPBAR RERENDERED!');
    return (
      <div>
        <AppBar
          title={title}
          onLeftIconButtonClick={this.props.onMenuClick}
          iconElementRight={<Logged />}
        />
      </div>
    );
  }
}