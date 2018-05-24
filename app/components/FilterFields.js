import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Tooltip from 'material-ui/Tooltip';
// import FilterListIcon from 'material-ui-icons/FilterList';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flex: '0 1 50%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 95,
  },
  newContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  newTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

function FilterFields(props) {
  const {
    classes, filter, isNew, artifactTypes, onChange
  } = props;
  // const handleChange = filter.order >= 0 ? onChange(filter.order) : onChange;
  // const fieldNum = filter.order >= 0 ? ` ${filter.order}` : '';
  const fieldClass = isNew ? classes.newTextField : classes.textField;
  const containerClass = isNew ? classes.newContainer : classes.container;
  // const
  // console.log(filter);

  return (
    <div className={containerClass}>
      <TextField
        select
        label="Field"
        className={fieldClass}
        value={filter.field}
        onChange={onChange('field')}
        SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        helperText="Please select field"
        margin="normal"
      >
        {artifactTypes.getFields().map(option => (
          <MenuItem key={option} value={option}>
            {/* {artifactTypes[option].displayName} */}
            {artifactTypes.getDisplayName(option)}
          </MenuItem>
          ))}
      </TextField>
      <TextField
        select
        label="Operator"
        className={fieldClass}
        value={filter.operator}
        onChange={onChange('operator')}
        SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        helperText="Please select operator"
        margin="normal"
      >
        {filter.field
          ? (artifactTypes.getFilterOperators(filter.field)).map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
            ))
          : <MenuItem />
        }
      </TextField>
      <TextField
        select={!!(filter.field && artifactTypes.getFilterValues(filter.field))}
        label="Value"
        className={fieldClass}
        value={filter.value || ''}
        onChange={onChange('value')}
        helperText="Please enter value"
        margin="normal"
      >
        {filter.field && artifactTypes.getFilterValues(filter.field)
          ? artifactTypes.getFilterValues(filter.field).map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
            ))
          : ''
        }
      </TextField>
      {isNew
        ? (
          <Button variant="raised" color="primary" className={classes.button} onClick={props.onAdd}>
            Apply
          </Button>
        )
        : (
          // <Button variant="raised" color="secondary" className={classes.button} onClick={props.onDelete}>
          //   Delete
          // </Button>
          <Tooltip title="Delete Filter">
            <IconButton aria-label="Delete" onClick={props.onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
      }
      {/* <div className={classes.spacer} /> */}
    </div>
  );
}

export default withStyles(styles)(FilterFields);
