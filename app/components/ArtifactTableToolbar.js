import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import FilterListIcon from 'material-ui-icons/FilterList';
import FieldsAddIcon from 'material-ui-icons/PlaylistAdd';
import RefreshIcon from 'material-ui-icons/Refresh';

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
});

const ArtifactTableToolbar = props => {
  const { classes, title, onFilterIconClick, onFieldsIconClick, onRefresh } = props;

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="title">{title}</Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Refresh">
          <IconButton aria-label="Refresh" onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

ArtifactTableToolbar.defaultProps = {
  title: '',
};

ArtifactTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default withStyles(toolbarStyles)(ArtifactTableToolbar);
