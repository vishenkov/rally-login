import React, { Component } from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
import {
  // TableBody,
  // TableCell,
  TableFooter,
  // TableHead,
  TablePagination,
  TableRow,
  // TableSortLabel,
} from 'material-ui/Table';
import TablePaginationActions from './TablePaginationActions';

export default class ArtifactTableFooter extends Component {
  handleChangeRowsPerPage = event => {
    this.props.onChangeRowsPerPage(event, event.target.value);
  };

  render() {
    const {
      count, rowsPerPage, page, onChangePage,
    } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={6}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            rowsPerPageOptions={[25, 50, 75, 100]}
            onChangePage={onChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            Actions={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

ArtifactTableFooter.propTypes = {
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
};
