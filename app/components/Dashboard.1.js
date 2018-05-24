import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import styles from './Dashboard.css';
import CALogo from './CALogo';

type Props = {};

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

export default class Login extends Component<Props> {
  props: Props;

  state = {
    defects: [],
    fetching: true,
    open: false,
  };

  async componentDidMount() {
    // const res = await rally('w3225721@mvrht.net', '!qwerty2017');
    // console.log(res);
    this.setState({
      fetching: false,
      // defects: res.Results,
      // workspase: res.Results[0].Workspace.Name,
    });
  }

  onLeftIconButtonClick = () => {
    this.setState({ open: true });
  };

  onMenuClick = (event) => {
    console.log('menuclick', event.target);
    this.setState({ open: false });
  };

  render() {
    const { fetching, workspase, defects } = this.state;
    const title = `${workspase}`;
    return (
      <div>
        {fetching
        ? (
          <div className={styles.loading}>
            <CircularProgress size={80} thickness={5} />
          </div>)
        : (
          <div>
            <AppBar
              title="Defects"
              onLeftIconButtonClick={this.onLeftIconButtonClick}
              iconElementRight={<Logged />}
            />
            <div>
              <Drawer
                docked={false}
                open={this.state.open}
              >
                <CALogo />
                <MenuItem
                  primaryText={workspase}
                />
                <MenuItem
                  checked
                  onClick={this.onMenuClick}
                >
                    Defects
                </MenuItem>
              </Drawer>
            </div>
            <div className={styles.table}>
            {/* {defects.map((defect, index) => (
          <TableRow key={defect.FormattedID} rowNumber={index}>
            <TableRowColumn>{defect.FormattedID}</TableRowColumn>
            <TableRowColumn>{defect.Name}</TableRowColumn>
            <TableRowColumn>{defect.State}</TableRowColumn>
            <TableRowColumn>{defect.ScheduleState}</TableRowColumn>
            <TableRowColumn>
              {defect.Owner ? defect.Owner._refObjectName : '-'}
            </TableRowColumn>
            <TableRowColumn>{defect.Project.Name}</TableRowColumn>
          </TableRow>
        ))} */}
            </div>
          </div>
        )
        }
      </div>
    );
  }
}
