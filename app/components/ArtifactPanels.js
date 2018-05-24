import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table from 'material-ui/Table';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import { LinearProgress } from 'material-ui/Progress';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FilterListIcon from 'material-ui-icons/FilterList';
import FieldsAddIcon from 'material-ui-icons/PlaylistAdd';
import FiltersPanel from './FiltersPanel';
import FieldsPanel from './FieldsPanel';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
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
});

function ArtifactPanels(props) {
  const {
    classes, artifactTypes, fields, onAddField, onRemoveField, filters
  } = props;

  return (
    <div className={classes.root}>
      <FieldsPanel
        artifactTypes={artifactTypes}
        fields={fields}
        onAddField={onAddField}
        onRemoveField={onRemoveField}
      />
      <FiltersPanel
        filters={filters}
        artifactTypes={artifactTypes}
        onRequestFilter={props.onRequestFilter}
        onUpdateFilter={props.onUpdateFilter}
        onDeleteFilter={props.onDeleteFilter}
      />
    </div>
  );
}

ArtifactPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArtifactPanels);
