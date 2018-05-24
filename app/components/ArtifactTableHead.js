import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

export default class ArtifactTableHead extends React.Component {
  createSortHandler = (index, direction) => event => {
    // console.log('cell click', index, direction);
    this.props.onRequestSort(event, index, direction);
  };

  render() {
    const { fields, artifactTypes, sort } = this.props;
    // console.log(this.props);
    // console.log(fields);
    const direction = index => (sort && sort.index === index ? sort.direction : null);
    const active = index => sort && sort.index === index;

    return (
      <TableHead>
        <TableRow>
          {fields.map(({ name }, index) =>
            (
              <TableCell
                key={name}
                // numeric={column.numeric}
                // padding={column.disablePadding ? 'none' : 'default'}
                // sortDirection={sort || false}
                sortDirection={direction(index)}
              >
                <Tooltip
                  title="Sort"
                  // placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={active(index)}
                    direction={direction(index)}
                    onClick={this.createSortHandler(index, direction(index))}
                  >
                    {artifactTypes.getDisplayName(name)}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
    );
  }
}

ArtifactTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  // order: PropTypes.string.isRequired,
  // orderBy: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
};

