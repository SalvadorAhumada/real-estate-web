import { useContext, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Typography,
    MenuItem,
    FormControl,
    Select,
    Button
} from '@mui/material'
import Popup from '../../Shared/Popup';
import UserSelect from './UserSelect';
import Loading from "../../Shared/Loading";
import { FinancialContext } from "../../../Context/FinancialContext";
import { OtherContext } from "../../../Context/OtherContext";
import { UnitContext } from "../../../Context/UnitContext";
import './UnitDetail.css';

export default function UnitDetail({
    statuses
}) {

    const {
        GET_UNITS_FINANCIAL,
        FINANCIAL_DATA,
        UPDATE_UNITS_FINANCIAL,
    } = useContext(FinancialContext);

    const {
        SELECTED_UNIT,
        UPDATE_STATUS,
        SET_SELECTED_UNIT,
        UPDATE_USER,
        UPDATE_CUSTOMER
    } = useContext(UnitContext);

    const {
        FORMAT_CURRENCY,
        SET_POPUP_DATA,
        POPUP_DATA,
        SET_SNACK,
        GET_CLUSTERS_UNITS,
        SET_IS_UPDATING,
    } = useContext(OtherContext);

    const [status, setStatus] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [type, setType] = useState('');

    const [openUser, setOpenUser] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('');

    const [paymentPlan, setPaymentPlan] = useState('');

    useEffect(() => {
        if (SELECTED_UNIT.id) GET_UNITS_FINANCIAL(SELECTED_UNIT.id).then(() => setIsLoading(false));
    }, [SELECTED_UNIT]);

    useEffect(() => {
        setStatus(SELECTED_UNIT.status.name)
    }, [SELECTED_UNIT]);

    if (isLoading) return <TableContainer component={Paper}><Loading message="Cargando Unidad..." /></TableContainer>;

    const handleChangePlan = (event) => {
        setPaymentPlan(event.target.value);
        SET_POPUP_DATA({
            title: '¿Actualizar Plan de Pago?',
            body: `${SELECTED_UNIT.name} sera asignado el plan "${event.target.value}".`,
            type: 'plan'
        })
        setOpen(true);
    }

    const handleChangeMethod = (event) => {
        setPaymentMethod(event.target.value);
        SET_POPUP_DATA({
            title: '¿Actualizar Método de Pago?',
            body: `${SELECTED_UNIT.name} sera asignado el metódo "${event.target.value}".`,
            type: 'method'
        })
        setOpen(true);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        SET_POPUP_DATA({
            title: '¿Actualizar estado?',
            body: `${SELECTED_UNIT.name} cambiara su estado a ${event.target.value}.`,
            type: 'status'
        })
        setOpen(true);
    };

    const onCancel = () => {
        setStatus(SELECTED_UNIT.status.name)
        setOpen(false)
    };

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
        const data = { userId: null, unitId: SELECTED_UNIT.id, clusterId: SELECTED_UNIT.cluster.id };
        SET_IS_UPDATING(true);

        UPDATE_USER(data).then(
            () => {
                GET_CLUSTERS_UNITS(data.clusterId).then((units) => {
                    SET_IS_UPDATING(false);
                    setOpen(false);
                    const updatedUnit = units.find(u => u.id === SELECTED_UNIT.id);
                    SET_SELECTED_UNIT(updatedUnit);
                    SET_SNACK({
                        value: true,
                        message: 'Unidad actualizada con éxito',
                        severity: 'success'
                    });
                })
            }
        )
            .catch(ex => {
                console.log(ex)
            })
    }

    const removeCustomer = () => {
        const data = { customerId: null, unitId: SELECTED_UNIT.id, clusterId: SELECTED_UNIT.cluster.id, statusId: 1 };
        SET_IS_UPDATING(true);

        UPDATE_CUSTOMER(data).then(
            () => {
                GET_CLUSTERS_UNITS(data.clusterId).then((units) => {
                    SET_IS_UPDATING(false);
                    setOpen(false);
                    const updatedUnit = units.find(u => u.id === SELECTED_UNIT.id);
                    SET_SELECTED_UNIT(updatedUnit);
                    SET_SNACK({
                        value: true,
                        message: 'Unidad actualizada con éxito',
                        severity: 'success'
                    });
                })
            }
        )
            .catch(ex => {
                console.log(ex)
            })
    }

    const updatePaymentPlan = () => {
        SET_IS_UPDATING(true);
        const data = { unitId: SELECTED_UNIT.id, plan: paymentPlan };
        UPDATE_UNITS_FINANCIAL(data).then(
            () => {
                SET_IS_UPDATING(false);
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
        SET_IS_UPDATING(true);
        const data = { unitId: SELECTED_UNIT.id, method: paymentMethod };
        UPDATE_UNITS_FINANCIAL(data).then(
            () => {
                SET_IS_UPDATING(false);
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

    const handleChangeCustomer = () => {
        if (SELECTED_UNIT.customer) {
            SET_POPUP_DATA({
                title: '¿Eliminar a este cliente?',
                body: `${SELECTED_UNIT.customer.name} ${SELECTED_UNIT.customer.lastname} sera desvinculado/a de esta unidad y la unidad cambiara de estatus a DISPONIBLE. ¿Desea continuar?`,
                type: 'customer'
            })
            setOpen(true);
        } else {
            setType('customer');
            setOpenUser(true);
        }
    }

    const handleChangeExecutive = () => {

        if (SELECTED_UNIT.user) {
            SET_POPUP_DATA({
                title: '¿Eliminar a este ejecutivo?',
                body: `${SELECTED_UNIT.user.name} ${SELECTED_UNIT.user.lastname} sera desvinculado/a de esta unidad. ¿Desea continuar?`,
                type: 'user'
            })
            setOpen(true);
        } else {
            setType('user');
            setOpenUser(true);
        }

    }

    const hasUser = () => {

        let text = 'Sin Ejecutivo', variant = 'contained', title = 'Asignar Ejecutivo'

        if (SELECTED_UNIT.user) {
            text = title = `${SELECTED_UNIT.user.name} ${SELECTED_UNIT.user.lastname}`;
            variant = 'outlined';
        }

        return <Button onClick={handleChangeExecutive} variant={variant} size="small" title={title}>
            {text}
        </Button>
    }

    const hasCustomer = () => {
        let text = 'Sin Cliente', variant = 'contained', title = 'Asignar Cliente'

        if (SELECTED_UNIT.customer) {
            text = title = `${SELECTED_UNIT.customer.name} ${SELECTED_UNIT.customer.lastname}`;
            variant = 'outlined';
        }

        return <Button onClick={handleChangeCustomer} variant={variant} size="small" title={title}>
            {text}
        </Button>
    }


    const getFinancialData = () => {
        if (FINANCIAL_DATA && FINANCIAL_DATA.plansoptions && FINANCIAL_DATA.methodsoptions) return <>
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
                            value={FINANCIAL_DATA.plan}
                            sx={{ padding: 0, width: '140px' }}
                            onChange={handleChangePlan}
                        >
                            {FINANCIAL_DATA.plansoptions.map(p => {
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
                            value={FINANCIAL_DATA.method}
                            sx={{ padding: 0, width: '250px' }}
                            onChange={handleChangeMethod}
                        >
                            {FINANCIAL_DATA.methodsoptions.map(m => {
                                return <MenuItem key={m} value={m}>{m}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </TableCell>
            </TableRow>
        </>
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
            if (rows[k]) {
                let row = { key: rows[k], value: SELECTED_UNIT[k] };

                if (rows[k] === 'PRECIO') row.format = FORMAT_CURRENCY;

                unitRows.push(row)
            }
        }
        return unitRows;
    }

    const available_status = statuses.map(({ name, id }) => {
        return { name, id }
    });

    const css = {
        centerH5: { textAlign: 'center', margin: 1 }
    }

    return (
        <div className="unit-wrapper">
            <Popup open={open} setOpen={setOpen} onCancel={onCancel} onAccept={onAccept} popupTitle={POPUP_DATA.title} popupBody={POPUP_DATA.body} />
            <UserSelect unit={SELECTED_UNIT} open={openUser} setOpen={setOpenUser} type={type} />
            <TableContainer component={Paper}>
                <Typography gutterBottom variant="h5" component="div" sx={css.centerH5}>
                    <b>UNIDAD {SELECTED_UNIT.name}</b>
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