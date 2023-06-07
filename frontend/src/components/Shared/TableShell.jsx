import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './TableShell.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { UnitContext } from '../../Context/UnitContext';

const TableShell = (props) => {

  const {
    AVAILABLE_STATUS
  } = useContext(UnitContext);

  const { data, dataHandler } = props;
  const view = dataHandler(data);

  const getColor = (key) => {
    if(AVAILABLE_STATUS.length) {
      const color = AVAILABLE_STATUS.find(s => s.name === key)
      return color.color_hex;
    }
  }

  return (
    <Table>
      <TableHead>
      </TableHead>
      <TableBody>
        {Object.keys(view).map((key) => {
          return (<TableRow key={key}>
            <TableCell className="table-cell-modifier"><b>{key}</b></TableCell>
            <TableCell className="table-cell-modifier right">
              <Stack direction="row" spacing={2}>
                <Chip label={data[key]} sx={{ color: getColor(key), fontWeight: 'bolder' }} />
              </Stack>
            </TableCell>
          </TableRow>)
        })}
      </TableBody>
    </Table>
  );
};

export default TableShell;