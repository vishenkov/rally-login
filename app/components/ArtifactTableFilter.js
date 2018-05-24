import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
// import Tooltip from 'material-ui/Tooltip';
// import FilterListIcon from 'material-ui-icons/FilterList';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
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
  const fieldNum = filter.order >= 0 ? ` ${filter.order}` : '';
  // const
  // console.log(filter);

  return (
    <Grid item xs={12}>
      <TextField
        select
        label={`Field${fieldNum}`}
        className={classes.textField}
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
        {Object.keys(artifactTypes).map(option => (
          <MenuItem key={option} value={option}>
            {artifactTypes[option].displayName}
          </MenuItem>
          ))}
      </TextField>
      <TextField
        select
        label="Operator"
        className={classes.textField}
        value={filter.operator || '='}
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
          ? (artifactTypes[filter.field].filter.operators).map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
            ))
          : '='
        }
      </TextField>
      <TextField
        label="Value"
        className={classes.textField}
        value={filter.value || ''}
        onChange={onChange('value')}
        helperText="Please enter value"
        margin="normal"
      />
      {isNew
        ? (
          <Button variant="raised" color="primary" className={classes.button} onClick={props.onAdd}>
            Apply
          </Button>
        )
        : (
          <Button variant="raised" color="secondary" className={classes.button} onClick={props.onDelete}>
            Delete
          </Button>
        )
      }
      {/* <div className={classes.spacer} /> */}
    </Grid>
  );
}

class ArtifactTableFilter extends Component {
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
    // console.log(this.state);
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
      <Toolbar
        className={classes.root}
      >
        <Grid container direction="column" alignItems="stretch" spacing={0}>
        {/* {filters.map(filter => `${filter.name} ${filter.operator} ${filter.value}`)} */}
        <Grid container spacing={24}>
          {filters.map((filter, index) => (
            <FilterFields
              key={filter.field}
              isNew={false}
              filter={filter}
              classes={classes}
              artifactTypes={artifactTypes}
              onChange={this.handleUpdate(index)}
              onDelete={this.handleDelete(index)}
            />
          ))}
        </Grid>
        <Grid container spacing={24}>
          <FilterFields
            isNew
            classes={classes}
            artifactTypes={artifactTypes}
            filter={this.state}
            onChange={this.handleChange}
            onAdd={this.handleAdd}
          />
        </Grid>
        {/* <div className={classes.spacer} /> */}
        </Grid>
      </Toolbar>
    );
  }
}


ArtifactTableFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(ArtifactTableFilter);
