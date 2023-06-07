import { useContext, useState } from "react";
import { OtherContext } from "../Context/OtherContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UnitModal from "./UnitModal";
import './ListUnits.css';
import { UnitContext } from "../Context/UnitContext";

export default function ListUnits({ data }) {

  const {
    FORMAT_CURRENCY,
  } = useContext(OtherContext);

  const {
    SET_SELECTED_UNIT
  } = useContext(UnitContext);

  const [open, setOpen] = useState(false);

  const setUnit = (unit) => {
    setOpen(true);
    SET_SELECTED_UNIT(unit);
  }

  return (
    <TableContainer sx={{ width: '70%', maxWidth: 1200, margin: '0 auto', cursor: 'pointer' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="header-modifier">UNIDAD</TableCell>
            <TableCell className="header-modifier">NIVEL</TableCell>
            <TableCell className="header-modifier">RECAMARAS</TableCell>
            <TableCell className="header-modifier">BAÑOS</TableCell>
            <TableCell className="header-modifier">PRECIO</TableCell>
            <TableCell className="header-modifier">ESTADO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? data.map((row) => (
            <TableRow
              onClick={() => setUnit(row)}
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { background: '#0000002b' } }}
            >
              <TableCell className="cell-modifier" component="th" scope="row">
                <b>{row.name}</b>
              </TableCell>
              <TableCell className="cell-modifier" component="th" scope="row">
                {row.level}
              </TableCell>
              <TableCell className="cell-modifier" component="th" scope="row">
                {row.bedrooms}
              </TableCell>
              <TableCell className="cell-modifier" component="th" scope="row">
                {row.bathrooms}
              </TableCell>
              <TableCell className="cell-modifier" component="th" scope="row">
                <b>{FORMAT_CURRENCY(row.price)}</b>
              </TableCell>
              <TableCell className="cell-modifier" component="th" scope="row" sx={{color: row.status.color_hex, background: row.status.id === 2 ? '#cbcbcb8f': '#cbcbcb1c'}}>
                <b>{row.status.name}</b>
              </TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
      </Table>
      <UnitModal open={open} close={setOpen} />
    </TableContainer>
  );
}