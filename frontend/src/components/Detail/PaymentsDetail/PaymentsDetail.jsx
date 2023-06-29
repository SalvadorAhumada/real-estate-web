import { useContext, useEffect, useState } from 'react';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import {
    Typography,
    TableHead,
    Box,
    Button,
    Paper,
    TableRow,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Chip,
    LinearProgress
} from '@mui/material';
import PaymentModal from './PaymentModal';
import PaymentEditModal from './PaymentEditModal';
import Popup from '../../Shared/Popup';
import Loading from "../../Shared/Loading";
import { FinancialContext } from '../../../Context/FinancialContext';
import { PaymentsContext } from '../../../Context/PaymentsContext';
import { UnitContext } from '../../../Context/UnitContext';
import { OtherContext } from '../../../Context/OtherContext';
import './PaymentsDetail.css';

export default function PaymentsDetailNew() {

    const [isLoading, setIsLoading] = useState(true);

    const [open, setOpenModal] = useState(false);

    const [openPayment, setOpenPayment] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState({});

    const [openEditPayment, setOpenEditPayment] = useState(false);

    const {
        SELECTED_UNIT,
    } = useContext(UnitContext);

    const {
        GET_UNITS_FINANCIAL,
        FINANCIAL_DATA,
        UPDATE_UNITS_FINANCIAL
    } = useContext(FinancialContext);

    const {
        SET_POPUP_DATA,
        POPUP_DATA,
        SET_IS_UPDATING,
        SET_SNACK,
        FORMAT_CURRENCY,
        FORMAT_DATE
    } = useContext(OtherContext);

    const {
        UNIT_PAYMENTS,
        GET_UNIT_PAYMENTS,
        SET_UNIT_PAYMENTS
    } = useContext(PaymentsContext);

    useEffect(() => {
        GET_UNITS_FINANCIAL(SELECTED_UNIT.id);
    }, [SELECTED_UNIT]);

    useEffect(() => {
        SET_UNIT_PAYMENTS([]);
        if (FINANCIAL_DATA.id !== undefined) {
            setIsLoading(false);
            GET_UNIT_PAYMENTS(FINANCIAL_DATA.id);
        }
    }, [FINANCIAL_DATA]);

    const onAccept = () => {
        SET_IS_UPDATING(true);

        UPDATE_UNITS_FINANCIAL({ unitId: SELECTED_UNIT.id }).then(() => {
            SET_IS_UPDATING(false);
            setOpenModal(false);
            SET_SNACK({
                value: true,
                message: 'Unidad Actualizada',
                severity: 'success'
            });
        })
    };

    const openPaymentModal = () => setOpenPayment(true);

    if (isLoading) return <TableContainer component={Paper}><Loading message="Cargando Finanzas..." /></TableContainer>;

    const css = {
        height100: { height: '100%', textAlign: 'center', position: 'relative' },
        alignCenter: { textAlign: 'center', margin: 1 },
        priceIcon: { fontSize: '100px', opacity: 0.3 },
        leftAlign: { textAlign: 'right', margin: '10px' },
        rightAlign: { textAlign: 'right' },
        absolute: { position: 'absolute', bottom: 0, borderTop: '1px solid #e0e0e0', background: 'white' }
    }

    const createPlan = () => {
        setOpenModal(true);
        SET_POPUP_DATA({
            title: `¿Crear Plan de Pago para unidad ${SELECTED_UNIT.name}?`,
            type: 'plan'
        });
    }

    const getStatus = (statusName) => {

        let color = "success";
        let variant = "filled";

        if (statusName === "Por Pagar") {
            color = "warning";
            variant = "outlined";
        }

        return <Chip size="small" label={statusName} variant={variant} color={color} />
    }

    const setEditPayment = (payment) => {
        setSelectedPayment(payment);
        setOpenEditPayment(true);
    }

    const getTotalPayments = () => {

        if (UNIT_PAYMENTS.noPayments) return 0;

        const totalAmount = UNIT_PAYMENTS.reduce((acc, { paymentstatus, paymentamount }) => {
            if (paymentstatus === 'Pagado') return acc + paymentamount;
            return acc;
        }, 0)
        return totalAmount;
    };

    const getPaidValue = () => {
        const paid = getTotalPayments();
        const price = SELECTED_UNIT.price;
        const percentage = (paid * 100) / price;        ;
        if(percentage > 100) return 100;
        return percentage;
    }

    const rowColor = (row) => {
        let styleObj = { cursor: 'pointer' };
        if (row % 2 === 0) styleObj.background = '#cbcbcb1c';
        return styleObj;
    }

    let hasPaymentPlan;

    if (FINANCIAL_DATA.id === 0) {
        hasPaymentPlan = <Table className='payments-list-wrapper' aria-label="simple table">
            <TableBody>
                <TableRow>
                    <TableCell sx={css.alignCenter}>
                        <PriceChangeIcon sx={css.priceIcon} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography gutterBottom variant="h6" component="div" sx={css.height100}>
                            Crear un plan de pago para habilitar el registro de pagos.
                        </Typography>
                        <Box sx={css.alignCenter}>
                            <Button variant="contained" onClick={createPlan} size="small">
                                Crear Plan De Pago
                            </Button>
                        </Box>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

    } else {

        hasPaymentPlan = <>
            <PaymentModal open={openPayment} setOpen={setOpenPayment} financial={FINANCIAL_DATA} payments={UNIT_PAYMENTS} />
            <PaymentEditModal financial={FINANCIAL_DATA} open={openEditPayment} setOpen={setOpenEditPayment} payment={selectedPayment} />
            <Box sx={css.leftAlign}>
                <Button variant="contained" size="small" onClick={openPaymentModal}>
                    Agregar Pago
                </Button>
            </Box>
            <div className="table-overflow">
                <Table className='payments-list-wrapper' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>No. Pago</b></TableCell>
                            <TableCell><b>Cantidad</b></TableCell>
                            <TableCell><b>Tipo</b></TableCell>
                            <TableCell><b>Fecha De Pago</b></TableCell>
                            <TableCell><b>Estatus</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {UNIT_PAYMENTS.length ? UNIT_PAYMENTS.map((payment, index) => {
                            return <TableRow key={index} style={rowColor(index)} onClick={() => setEditPayment(payment)}>
                                <TableCell> {index + 1}</TableCell>
                                <TableCell>{FORMAT_CURRENCY(payment.paymentamount)}</TableCell>
                                <TableCell>{payment.paymenttype}</TableCell>
                                <TableCell>{FORMAT_DATE(payment.duedate)}</TableCell>
                                <TableCell>{getStatus(payment.paymentstatus)}</TableCell>
                            </TableRow>
                        }) : <TableRow>
                            <TableCell>
                                {UNIT_PAYMENTS.noPayments ? 'Sin Pagos Registrados' : 'Cargando Pagos...'}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </div>
            <Table sx={{ borderTop: '1px solid #e0e0e0' }}>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <b>TOTAL PAGADO</b>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={2} sx={css.rightAlign}>
                            <b>{FORMAT_CURRENCY(getTotalPayments())} / {FORMAT_CURRENCY(SELECTED_UNIT.price)}</b>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={getPaidValue()} />
            </Box>
        </>
    }

    return (
        <div className="payments-wrapper">
            <Popup open={open} setOpen={setOpenModal} onAccept={onAccept} popupTitle={POPUP_DATA.title} popupBody={POPUP_DATA.body} />
            <TableContainer component={Paper} sx={css.height100}>
                <Typography gutterBottom variant="h5" component="div" sx={css.alignCenter}>
                    <b>PAGOS</b>
                </Typography>
                {hasPaymentPlan}
            </TableContainer>
        </div>
    );
}