import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import _ from 'lodash';
import defaultFields from '../utils/static/fields';

export default function (props) {
  const { fields, data } = props;

  return (
    <Table
      fixedHeader
      height="400px"
    >
      <TableHeader displaySelectAll={false}>
        <TableRow>
          {fields.map(field => (
            <TableHeaderColumn
              key={field.order}
            >
              {defaultFields[field.name].displayName}
            </TableHeaderColumn>))
          }
        </TableRow>
      </TableHeader>
      <TableBody
        stripedRows
        showRowHover
        displayRowCheckbox={false}
      >
        {
          data.map((row, index) => (
            <TableRow key={row.FormattedID || index} rowNumber={index}>
              {fields.map(({ name }) => (
                <TableRowColumn key={`${row.FormattedID}${name}`}>
                  {
                    _.get(row, defaultFields[name].path, '-')
                  }
                </TableRowColumn>
              ))}
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
