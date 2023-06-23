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

export default function UnitDetail({
  unit,
  statuses,
  executives,
  customers,
  financial,
  paymentMethod,
  paymentPlan,
  setPaymentMethod,
  setPaymentPlan,
  updateUnitsFinancial
}) {

  const {
    UPDATE_STATUS,
    UPDATE_USER,
    SET_SELECTED_UNIT,
    SELECTED_UNIT,
    UPDATE_CUSTOMER
  } = useContext(UnitContext);

  const {
    SET_SNACK,
    GET_CLUSTERS_UNITS,
    POPUP_DATA,
    SET_POPUP_DATA,
    FORMAT_CURRENCY
  } = useContext(OtherContext);

  const [status, setStatus] = useState('');

  const [open, setOpen] = useState(false);

  const [openUser, setOpenUser] = useState(false);

  const [type, setType] = useState('');

  const available_status = statuses.map(({ name, id }) => {
    return { name, id }
  });

  useEffect(() => {
    setStatus(unit.status.name)
  }, [SELECTED_UNIT])

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    SET_POPUP_DATA({
      title: '¿Actualizar estado?',
      body: `${unit.name} cambiara su estado a ${event.target.value}.`,
      type: 'status'
    })
    setOpen(true);
  };

  const handleChangePlan = (event) => {
    setPaymentPlan(event.target.value);
    SET_POPUP_DATA({
      title: '¿Actualizar Plan de Pago?',
      body: `${unit.name} sera asignado el plan "${event.target.value}".`,
      type: 'plan'
    })
    setOpen(true);
  }

  const handleChangeMethod = (event) => {
    setPaymentMethod(event.target.value);
    SET_POPUP_DATA({
      title: '¿Actualizar Método de Pago?',
      body: `${unit.name} sera asignado el metódo "${event.target.value}".`,
      type: 'method'
    })
    setOpen(true);
  }

  const handleChangeExecutive = () => {

    if (unit.user) {
      SET_POPUP_DATA({
        title: '¿Eliminar a este ejecutivo?',
        body: `${unit.user.name} ${unit.user.lastname} sera desvinculado/a de esta unidad. ¿Desea continuar?`,
        type: 'user'
      })
      setOpen(true);
    } else {
      setType('user');
      setOpenUser(true);
    }

  }

  const handleChangeCustomer = () => {
    if (unit.customer) {
      SET_POPUP_DATA({
        title: '¿Eliminar a este cliente?',
        body: `${unit.customer.name} ${unit.customer.lastname} sera desvinculado/a de esta unidad y la unidad cambiara de estatus a DISPONIBLE. ¿Desea continuar?`,
        type: 'customer'
      })
      setOpen(true);
    } else {
      setType('customer');
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

    for (const k in unit) {
      if (rows[k]) {
        let row = { key: rows[k], value: unit[k] };

        if (rows[k] === 'PRECIO') row.format = FORMAT_CURRENCY;

        unitRows.push(row)
      }
    }
    return unitRows;
  }

  const onCancel = () => {
    setStatus(unit.status.name)
    setOpen(false)
  }

  const updateStatus = () => {
    const selectedStatus = available_status.find(s => s.name === status);
    UPDATE_STATUS({ unitId: unit.id, statusId: selectedStatus.id }).then(() => {
      setOpen(false)
      SET_SNACK({
        value: true,
        message: 'Unidad actualizada con éxito',
        severity: 'success'
      });
      GET_CLUSTERS_UNITS(unit.cluster.id);
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
        GET_CLUSTERS_UNITS(data.clusterId).then((units) => {
          const updatedUnit = units.find(u => u.id === unit.id);
          SET_SELECTED_UNIT(updatedUnit);
        })
      }
    )
      .catch(ex => {
        console.log(ex)
      })
  }

  const removeCustomer = () => {
    const data = { customerId: null, unitId: unit.id, clusterId: unit.cluster.id, statusId: 1 };
    UPDATE_CUSTOMER(data).then(
      () => {
        SET_SNACK({
          value: true,
          message: 'Unidad actualizada con éxito',
          severity: 'success'
        });
        setOpen(false);
        GET_CLUSTERS_UNITS(data.clusterId).then((units) => {
          const updatedUnit = units.find(u => u.id === unit.id);
          SET_SELECTED_UNIT(updatedUnit);
        })
      }
    )
      .catch(ex => {
        console.log(ex)
      })
  }

  const updatePaymentPlan = () => {
    const data = { unitId: unit.id, plan: paymentPlan };
    console.log(data);
    updateUnitsFinancial(data).then(
      () => {
        SET_SNACK({
          value: true,
          message: 'Unidad actualizada con éxito',
          severity: 'success'
        });
        setOpen(false);
      }
    )
  }

  const updatePaymentMethod = () => {
    const data = { unitId: unit.id, method: paymentMethod };
    console.log(data);
    updateUnitsFinancial(data).then(
      () => {
        SET_SNACK({
          value: true,
          message: 'Unidad actualizada con éxito',
          severity: 'success'
        });
        setOpen(false);
      }
    )
  }

  const onAccept = () => {
    switch (POPUP_DATA.type) {
      case 'status':
        updateStatus();
        break;
      case 'user':
        removeUser();
        break;
      case 'customer':
        removeCustomer();
        break;
      case 'plan':
        updatePaymentPlan();
        break;
      case 'method':
        updatePaymentMethod()
        break;
    }
  }

  const hasUser = () => {

    let text = 'Sin Ejecutivo', variant = 'contained', title = 'Asignar Ejecutivo'

    if (unit.user) {
      text = title = `${unit.user.name} ${unit.user.lastname}`;
      variant = 'outlined';
    }

    return <Button onClick={handleChangeExecutive} variant={variant} size="small" title={title}>
      {text}
    </Button>
  }

  const hasCustomer = () => {
    let text = 'Sin Cliente', variant = 'contained', title = 'Asignar Cliente'

    if (unit.customer) {
      text = title = `${unit.customer.name} ${unit.customer.lastname}`;
      variant = 'outlined';
    }

    return <Button onClick={handleChangeCustomer} variant={variant} size="small" title={title}>
      {text}
    </Button>
  }

  const getFinancialData = () => {
    if (financial && financial.plansoptions && financial.methodsoptions) return <>
      <TableRow>
        <TableCell component="th" scope="row">
          <b>PLAN</b>
        </TableCell>
        <TableCell component="th" scope="row">
          <FormControl fullWidth>
            <Select
              className="form-wrapper"
              labelId="plan-selector"
              id="plan-select"
              value={financial.plan}
              sx={{ padding: 0, width: '140px' }}
              onChange={handleChangePlan}
            >
              {financial.plansoptions.map(p => {
                return <MenuItem key={p} value={p}>{p}</MenuItem>
              })}
            </Select>
          </FormControl>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          <b>MÉTODO</b>
        </TableCell>
        <TableCell component="th" scope="row">
          <FormControl fullWidth>
            <Select
              className="form-wrapper"
              labelId="method-selector"
              id="method-select"
              value={financial.method}
              sx={{ padding: 0, width: '250px' }}
              onChange={handleChangeMethod}
            >
              {financial.methodsoptions.map(m => {
                return <MenuItem key={m} value={m}>{m}</MenuItem>
              })}
            </Select>
          </FormControl>
        </TableCell>
      </TableRow>
    </>
  }

  return (
    <div className="unit-wrapper">
      <Popup open={open} setOpen={setOpen} onCancel={onCancel} onAccept={onAccept} popupTitle={POPUP_DATA.title} popupBody={POPUP_DATA.body} />
      <UserSelect unit={unit} open={openUser} setOpen={setOpenUser} executives={executives} customers={customers} type={type} />
      <TableContainer component={Paper}>
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center', margin: 1 }}>
          <b>UNIDAD {unit.name}</b>
        </Typography>
        <Table aria-label="simple table">
          <TableBody>
            {formatBody().map(({ key, value, format = null }, index) => (
              <TableRow
                className="row-unit"
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <b>{key}</b>
                </TableCell>
                <TableCell component="th" scope="row">
                  {format ? format(value) : value}
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
            <TableRow>
              <TableCell component="th" scope="row">
                <b>CLIENTE</b>
              </TableCell>
              <TableCell component="th" scope="row">
                {hasCustomer()}
              </TableCell>
            </TableRow>
            {getFinancialData()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}