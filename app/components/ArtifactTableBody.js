import React from 'react';
import PropTypes from 'prop-types';
import {
  TableBody,
  TableCell,
  TableRow,
} from 'material-ui/Table';
// import _ from 'lodash';
// import defaultFields from '../utils/static/fields';

export default function ArtifactTableBody(props) {
  const {
    data, fields, artifactTypes
  } = props;

  return (
    <TableBody>
      {data.map(row => (
        <TableRow
          hover
          onClick={event => props.onClick(event, row.FormattedID)}
          tabIndex={-1}
          key={row.FormattedID}
        >
          {fields.map(({ name }) => (
            <TableCell
              key={`${row.FormattedID}${name}`}
            >
              {/* {_.get(row, artifactTypes[name].path, '-')} */}
              {artifactTypes.getValue(name, row) || '-'}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
