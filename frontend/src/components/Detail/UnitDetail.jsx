import { useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UnitContext } from "../../Context/UnitContext";
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Popup from '../Shared/Popup';
import { OtherContext } from "../../Context/OtherContext";

export default function UnitDetail({ statuses }) {

  const {
    SELECTED_UNIT,
    UPDATE_STATUS,
  } = useContext(UnitContext);

  const {
    SET_SNACK,
    GET_CLUSTERS_UNITS
  } = useContext(OtherContext);

  const [status, setStatus] = useState('');

  const [open, setOpen] = useState(false);

  const available_status = statuses.map(({ name, id }) => {
    return { name, id }
  });

  useEffect(() => {
    setStatus(SELECTED_UNIT.status.name)
  }, [])


  const handleChange = (event) => {
    setStatus(event.target.value);
    setOpen(true);
  };

  const unit = SELECTED_UNIT;

  const formatBody = () => {
    const rows = {
      price: 'PRECIO',
      level: 'NIVEL',
      m2total: 'TOTAL M2',
      bathrooms: 'BAÑOS',
      bedrooms: 'RECAMARAS',
    }

    let unitRows = [];

    for (const k in SELECTED_UNIT) {
      if (rows[k]) unitRows.push({ key: rows[k], value: SELECTED_UNIT[k] })
    }
    return unitRows;
  }

  const onCancel = () => {
    setStatus(SELECTED_UNIT.status.name)
    setOpen(false)
  }

  const onAccept = () => {
    const selectedStatus = available_status.find(s => s.name === status);
    UPDATE_STATUS({ unitId: SELECTED_UNIT.id, statusId: selectedStatus.id }).then(res => {
      setOpen(false)
      SET_SNACK({
        value: true,
        message: 'Unidad actualizada con éxito',
        severity: 'success'
      });
      GET_CLUSTERS_UNITS(SELECTED_UNIT.cluster.id);
    }).catch(ex => {
      console.log(ex)
    })

  }

  return (
    <div className="unit-wrapper">
      <Popup open={open} setOpen={setOpen} onCancel={onCancel} onAccept={onAccept} popupTitle={"¿Actualizar estado?"} popupBody={`${unit.name} cambiara su estado a ${status}.`} />
      <TableContainer component={Paper}>
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center', margin: 2 }}>
          <b>UNIDAD {unit.name}</b>
        </Typography>
        <Table aria-label="simple table">
          <TableBody>
            {formatBody().map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { background: '#0000002b' } }}
              >
                <TableCell className="cell-modifier" component="th" scope="row">
                  <b>{row.key}</b>
                </TableCell>
                <TableCell className="cell-modifier" component="th" scope="row">
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="cell-modifier" component="th" scope="row">
                <b>ESTATUS</b>
              </TableCell>
              <TableCell className="cell-modifier" component="th" scope="row">
                <FormControl fullWidth>
                  <Select
                    labelId="status-selector"
                    id="status-select"
                    value={status}
                    sx={{ padding: 0 }}
                    onChange={handleChange}
                  >
                    {available_status.map(s => {
                      return <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}