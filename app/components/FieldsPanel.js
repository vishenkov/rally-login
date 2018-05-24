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
import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import { FormGroup } from 'material-ui/Form';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import FieldsAddIcon from 'material-ui-icons/PlaylistAdd';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

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
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  listItem: {
    flex: '0 1 25%',
  },
});

class FieldsPanel extends Component {
  state = {
    field: '',
  };

  handleChange = type => event => {
    this.setState({ [type]: event.target.value });
  };

  handleClick = event => {
    event.preventDefault();
    const { field } = this.state;
    this.props.onAddField(event, field);
    this.setState({ field: '' });
  };

  handleDelete = index => event => {
    this.props.onRemoveField(event, index);
  };


  render() {
    const { classes, artifactTypes, fields } = this.props;
    const displayFields = artifactTypes.getFields()
      .reduce(
        (acc, name) =>
          (fields.findIndex(field => field.name === name) !== -1
            ? acc
            : [...acc, name]),
        []
      );

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.row}>
            <Avatar className={classes.avatar}>
              <FieldsAddIcon />
            </Avatar>
            <Typography className={classes.heading}>Fields</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.leftColumn}>
            <Typography variant="title" className={classes.heading}>
              Current Fields
            </Typography>

            <List dense className={classes.listContainer}>
              {fields.map((field, index) => (
                <li className={classes.listItem} key={field.name}>
                  <ListItem ContainerComponent="div" divider>
                    <ListItemText
                      // primary={artifactTypes[field.name].displayName}
                      primary={artifactTypes.getDisplayName(field.name)}
                      secondary={field.isRequired ? 'Required*' : 'Custom'}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Delete Field">
                        <IconButton aria-label="Delete" disabled={field.isRequired} onClick={this.handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </li>
              ))}
            </List>

          </div>
          <div className={classNames(classes.rightColumn, classes.helper)}>
            <Typography className={classes.heading}>New Field</Typography>
            <form onSubmit={this.handleClick}>
              <FormGroup row>
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
                      {/* {artifactTypes[option].displayName} */}
                      {artifactTypes.getDisplayName(option)}
                    </MenuItem>
                    ))}
                </TextField>
                <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleClick}
                  disabled={!this.state.field}
                >
                  Add
                </Button>
              </FormGroup>
            </form>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

FieldsPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldsPanel);
