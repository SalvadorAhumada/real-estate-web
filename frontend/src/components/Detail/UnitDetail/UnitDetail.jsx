import { useContext, useEffect, useState } from "react";
import { OtherContext } from "../../../Context/OtherContext";
import { UnitContext } from "../../../Context/UnitContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Popup from '../../Shared/Popup';
import Button from '@mui/material/Button';
import './UnitDetail.css';
import UserSelect from './UserSelect';

export default function UnitDetail({ statuses }) {

  const {
    SELECTED_UNIT,
    UPDATE_STATUS,
  } = useContext(UnitContext);

  const {
    SET_SNACK,
    GET_CLUSTERS_UNITS,
    POPUP_DATA,
    SET_POPUP_DATA
  } = useContext(OtherContext);

  const [status, setStatus] = useState('');

  const [open, setOpen] = useState(false);

  const available_status = statuses.map(({ name, id }) => {
    return { name, id }
  });

  useEffect(() => {
    setStatus(SELECTED_UNIT.status.name)
  }, [])

  const unit = SELECTED_UNIT;
  
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    SET_POPUP_DATA({
      title: '¿Actualizar estado?',
      body: `${unit.name} cambiara su estado a ${status}.`,
      type: 'status'
    })
    setOpen(true);
  };

  const handleChangeExecutive = () => {
    if(unit.user) {
      SET_POPUP_DATA({
        title: '¿Eliminar a este ejecutivo?',
        body: `${unit.user.name} ${unit.user.lastname} sera desvinculado/a de esta unidad. ¿Desea continuar?`,
        type: 'user'
      })
      setOpen(true);
    }

  }

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

  const updateStatus = () => {
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

  const onAccept = () => {
    switch(POPUP_DATA.type) {
      case 'status':
        updateStatus();
        break;
      case 'user':
        console.log("open users modal")
        break;
    }
  }

  const hasUser = () => {

    let text = 'Asignar Ejecutivo', variant='contained',title='Asignar Ejecutivo'

    if(unit.user) {
      text = title =`${unit.user.name} ${unit.user.lastname}`;
      variant = 'outlined';
    }

    return <Button onClick={handleChangeExecutive} variant={variant} size="small" title={title}>
      {text}
    </Button>
  }

  return (
    <div className="unit-wrapper">
      <Popup open={open} setOpen={setOpen} onCancel={onCancel} onAccept={onAccept} popupTitle={POPUP_DATA.title} popupBody={POPUP_DATA.body} />
      <UserSelect />
      <TableContainer component={Paper}>
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center', margin: 1 }}>
          <b>UNIDAD {unit.name}</b>
        </Typography>
        <Table aria-label="simple table">
          <TableBody>
            {formatBody().map((row, index) => (
              <TableRow
                className="row-unit"
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <b>{row.key}</b>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">
                <b>ESTATUS</b>
              </TableCell>
              <TableCell component="th" scope="row">
                <FormControl fullWidth>
                  <Select
                    className="form-wrapper"
                    labelId="status-selector"
                    id="status-select"
                    value={status}
                    sx={{ padding: 0, width: '140px' }}
                    onChange={handleChangeStatus}
                  >
                    {available_status.map(s => {
                      return <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <b>EJECUTIVO</b>
              </TableCell>
              <TableCell component="th" scope="row">
                {hasUser()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}