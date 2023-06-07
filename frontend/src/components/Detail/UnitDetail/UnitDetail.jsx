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
import { UserContext } from "../../../Context/UserContext";

export default function UnitDetail({ statuses }) {

  const {
    SELECTED_UNIT,
    UPDATE_STATUS,
    UPDATE_USER,
    SET_SELECTED_UNIT
  } = useContext(UnitContext);

  const {
    SET_SNACK,
    GET_CLUSTERS_UNITS,
    POPUP_DATA,
    SET_POPUP_DATA
  } = useContext(OtherContext);

  const {
    GET_EXECUTIVES,
    EXECUTIVES
  } = useContext(UserContext);

  const [status, setStatus] = useState('');

  const [open, setOpen] = useState(false);

  const [openUser, setOpenUser] = useState(false);

  const available_status = statuses.map(({ name, id }) => {
    return { name, id }
  });

  useEffect(() => {
    setStatus(SELECTED_UNIT.status.name)
    GET_EXECUTIVES();
  }, [])

  const unit = SELECTED_UNIT;

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    SET_POPUP_DATA({
      title: '¿Actualizar estado?',
      body: `${unit.name} cambiara su estado a ${event.target.value}.`,
      type: 'status'
    })
    setOpen(true);
  };

  const handleChangeExecutive = () => {

    if (unit.user) {
      SET_POPUP_DATA({
        title: '¿Eliminar a este ejecutivo?',
        body: `${unit.user.name} ${unit.user.lastname} sera desvinculado/a de esta unidad. ¿Desea continuar?`,
        type: 'user'
      })
      setOpen(true);
    } else {
      setOpenUser(true);
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
    UPDATE_STATUS({ unitId: SELECTED_UNIT.id, statusId: selectedStatus.id }).then(() => {
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

  const removeUser = () => {
    const data = { userId: null, unitId: unit.id, clusterId: unit.cluster.id };
    UPDATE_USER(data).then(
      () => {
        SET_SNACK({
            value: true,
            message: 'Unidad actualizada con éxito',
            severity: 'success'
        });
        setOpen(false);
        GET_CLUSTERS_UNITS(data.clusterId).then(({ units }) => {
            const updatedUnit = units.find(u => u.id === unit.id)
            SET_SELECTED_UNIT(updatedUnit);
        })
    }
    )
    .catch( ex => {
      console.log(ex)
    })
  }

  const onAccept = () => {
    switch (POPUP_DATA.type) {
      case 'status':
        updateStatus();
        break;
      case 'user':
        removeUser();
        break;
    }
  }

  const hasUser = () => {

    let text = 'Asignar Ejecutivo', variant = 'contained', title = 'Asignar Ejecutivo'

    if (unit.user) {
      text = title = `${unit.user.name} ${unit.user.lastname}`;
      variant = 'outlined';
    }

    return <Button onClick={handleChangeExecutive} variant={variant} size="small" title={title}>
      {text}
    </Button>
  }

  return (
    <div className="unit-wrapper">
      <Popup open={open} setOpen={setOpen} onCancel={onCancel} onAccept={onAccept} popupTitle={POPUP_DATA.title} popupBody={POPUP_DATA.body} />
      <UserSelect unit={unit} open={openUser} setOpen={setOpenUser} executives={EXECUTIVES} />
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