import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import { FormGroup } from 'material-ui/Form';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import FilterListIcon from 'material-ui-icons/FilterList';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterFields from './FilterFields';

const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  avatar: {
    margin: 10,
    width: 45,
    height: 45,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  details: {
    alignItems: 'center',
  },
  rightColumn: {
    flexBasis: '30%',
  },
  leftColumn: {
    flexBasis: '70%',
  },
  addContainer: {
    width: '100%',
  },
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  badgeMargin: {
    marginRight: theme.spacing.unit * 2,
  },
  badgePadding: {
    paddingRight: `${theme.spacing.unit * 2}px`,
  },
});


class FiltersPanel extends Component {
  state = {
    field: '',
    operator: '',
    value: '',
  };

  handleChange = (type) => event => {
    console.log(type, event.target.value);
    this.setState({ [type]: event.target.value });
  }

  handleUpdate = index => type => event => {
    console.log('updating', index, type, event.target.value);
    this.props.onUpdateFilter(event, index, type, event.target.value);
  };

  handleAdd = event => {
    event.preventDefault();
    const { field, operator, value } = this.state;
    this.props.onRequestFilter(event, field, operator, value);
    this.setState({ field: '', operator: '', value: '' });
  };

  handleDelete = index => event => {
    console.log('deleting', index);
    this.props.onDeleteFilter(event, index);
  };


  render() {
    const { classes, artifactTypes, filters } = this.props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.row}>
            <Avatar className={classes.avatar}>
              <FilterListIcon />
            </Avatar>
            {filters.length
              ? (
                <Badge
                  color="primary"
                  badgeContent={filters.length}
                  className={classes.badgeMargin}
                >
                  <Typography
                    className={classNames(classes.heading, classes.badgePadding)}
                  >
                    Filters
                  </Typography>
                </Badge>)
              : <Typography className={classes.heading}>Filters</Typography>
            }
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.leftColumn}>
            <Typography variant="title" className={classes.heading}>
              Current Filters
            </Typography>

            <div className={classes.filtersContainer}>
              {filters.map((filter, index) => (
                <FilterFields
                  key={filter.field}
                  filter={filter}
                  artifactTypes={artifactTypes}
                  onChange={this.handleUpdate(index)}
                  onDelete={this.handleDelete(index)}
                />
              ))}
            </div>

          </div>
          <div className={classNames(classes.rightColumn, classes.helper)}>
            <Typography className={classes.heading}>New Filter</Typography>
            <form onSubmit={this.handleClick}>
              <FormGroup row={false} className={classes.addContainer}>
                <FilterFields
                  isNew
                  artifactTypes={artifactTypes}
                  filter={this.state}
                  onChange={this.handleChange}
                  onAdd={this.handleAdd}
                />
              </FormGroup>
            </form>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

FiltersPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FiltersPanel);
