import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class FieldChips extends Component {
  handleDelete = index => event => {
    this.props.onRemoveField(event, index);
  };

  render() {
    const { classes, fields, artifactTypes } = this.props;

    return (
      <Paper className={classes.root}>
        {fields.map((field, index) => (
          <Chip
            key={field.name}
            label={artifactTypes[field.name].displayName}
            onDelete={(!field.isRequired && this.handleDelete(index)) || null}
            className={classes.chip}
          />
        ))}
      </Paper>
    );
  }
}

FieldChips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldChips);
