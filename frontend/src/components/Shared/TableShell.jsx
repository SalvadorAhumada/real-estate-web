import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './TableShell.css';

const TableShell = (props) => {

  const { data, dataHandler } = props;

  const view = dataHandler(data);

  return (
    <Table>
      <TableHead>
      </TableHead>
      <TableBody>
        {Object.keys(view).map((key) => {
          return (<TableRow key={key}>
            <TableCell className="table-cell-modifier"><b>{key}</b></TableCell>
            <TableCell className="table-cell-modifier">{data[key]}</TableCell>
          </TableRow>)
        })}
      </TableBody>
    </Table>
  );
};

export default TableShell;