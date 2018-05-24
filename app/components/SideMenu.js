import React, { Component } from 'react';
import { Link as NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import CALogo from './CALogo';

export default function SideMenu(props) {
  const { pages, currentPage, open, onMenuClick } = props;
  console.log('SIDEMENU RERENDERED!');
  return (
    <Drawer
      docked={false}
      open={open}
    >
      <AppBar
        title="Rally Login"
        onLeftIconButtonClick={onMenuClick}
      />
      {pages.map(({ displayName, name }) => (
        <MenuItem
          key={name}
          checked={currentPage === name}
        >
          <NavLink
            to={`/${name}`}
          >
            {displayName}
          </NavLink>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem
        onClick={onMenuClick}
      >
          Settings
      </MenuItem>
    </Drawer>
  );
}
