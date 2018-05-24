import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table from 'material-ui/Table';
// import ExpansionPanel, {
//   ExpansionPanelSummary,
//   ExpansionPanelDetails,
// } from 'material-ui/ExpansionPanel';
import { LinearProgress } from 'material-ui/Progress';
// import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import ArtifactTableHead from './ArtifactTableHead';
import ArtifactTableToolbar from './ArtifactTableToolbar';
import ArtifactTableBody from './ArtifactTableBody';
import ArtifactTableFooter from './ArtifactTableFooter';
// import ArtifactTableFilter from './ArtifactTableFilter';
// import ArtifactTableFields from './ArtifactTableFields';
import ArtifactPanels from './ArtifactPanels';


const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
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
  table: {
    // minWidth: 800,
  },
  tableWrapper: {
    flex: '1 1 100%',
    overflow: 'auto',
  },
  tableFooter: {
    // height: '350px',
    // flex: '1 1 auto',
  },
  progress: {
    width: '100%',
    // marginTop: 30,
  },
});

class ArtifactTable extends React.Component {
  // state = {
  //   showFilters: false,
  //   showFieldsMenu: false,
  // }

  handleRowClick = (event, id) => {
    console.log(id);
    // this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  // handleFilterIconClick = event => {
  //   this.setState({ showFilters: !this.state.showFilters });
  // };

  // handleFieldsIconClick = event => {
  //   this.setState({ showFieldsMenu: !this.state.showFieldsMenu });
  // }

  render() {
    const { classes, title } = this.props;
    const {
      data, fields, pages, limit, currentPage, artifactTypes, filters, isFetching, sort
    } = this.props;

    return (
      <Paper className={classes.root}>
        <ArtifactTableToolbar
          title={title}
          // onFilterIconClick={this.handleFilterIconClick}
          // onFieldsIconClick={this.handleFieldsIconClick}
          onRefresh={this.props.onRefresh}
        />
        <ArtifactPanels
          fields={fields}
          filters={filters}
          artifactTypes={artifactTypes}
          onAddField={this.props.onAddField}
          onRemoveField={this.props.onRemoveField}
          onRequestFilter={this.props.onRequestFilter}
          onUpdateFilter={this.props.onUpdateFilter}
          onDeleteFilter={this.props.onDeleteFilter}
        />
        <div className={classes.tableWrapper}>
          {isFetching &&
            <LinearProgress className={classes.progress} />}
          <Table className={classes.table}>
            <ArtifactTableHead
              sort={sort}
              artifactTypes={artifactTypes}
              fields={fields}
              onRequestSort={this.props.onRequestSort}
            />
            {isFetching
              ? <tbody />
              : <ArtifactTableBody
                artifactTypes={artifactTypes}
                fields={fields}
                data={data}
                onClick={this.handleRowClick}
              />
            }
          </Table>
        </div>
        <div className={classes.tableFooter}>
          <Table className={classes.table}>
            <ArtifactTableFooter
              count={pages}
              rowsPerPage={limit}
              page={currentPage}
              onChangePage={this.props.onChangePage}
              onChangeRowsPerPage={this.props.onChangeRowsPerPage}
            />
          </Table>
        </div>
      </Paper>
    );
  }
}

ArtifactTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArtifactTable);
