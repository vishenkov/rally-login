import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import FilterListIcon from 'material-ui-icons/FilterList';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import FieldChips from './FieldChips';

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
    width: 300,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class ArtifactTableFields extends Component {
  state = {
    field: '',
  };

  handleChange = type => event => {
    this.setState({ [type]: event.target.value });
  }

  handleClick = event => {
    // console.log(this.state);
    const { field } = this.state;
    this.props.onAddField(event, field);
    this.setState({ field: '' });
  }
  render() {
    const { classes, artifactTypes, fields } = this.props;
    const displayFields = Object.keys(artifactTypes)
      .reduce(
        (acc, name) =>
          (fields.findIndex(field => field.name === name) !== -1
            ? acc
            : [...acc, name]),
        []
      );
    console.log(displayFields);

    return (
      <Toolbar
        className={classes.root}
      >
        <div className={classes.title}>
          <Typography variant="title">Fields</Typography>
        </div>
        <FieldChips
          fields={fields}
          artifactTypes={artifactTypes}
          onRemoveField={this.props.onRemoveField}
        />
        <TextField
          select
          label="Field"
          className={classes.textField}
          value={this.state.field}
          onChange={this.handleChange('field')}
          SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          helperText="Please select field"
          margin="normal"
        >
          {displayFields.map(option => (
            <MenuItem key={option} value={option}>
              {artifactTypes[option].displayName}
            </MenuItem>
            ))}
        </TextField>
        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={this.handleClick}
          disabled={!this.state.field}
        >
          Add
        </Button>
        {/* <div className={classes.title}>
          <Typography variant="title">{title}</Typography>
        </div> */}
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {/* <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip> */}
        </div>
      </Toolbar>
    );
  }
}


ArtifactTableFields.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(ArtifactTableFields);
