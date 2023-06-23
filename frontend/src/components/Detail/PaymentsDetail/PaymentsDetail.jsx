import { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import './PaymentsDetail.css';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { FinancialContext } from '../../../Context/FinancialContext';
import PaymentModal from './PaymentModal';
import { PaymentsContext } from '../../../Context/PaymentsContext';
import {
    TableHead,
    Box,
    Button,
    Paper,
    TableRow,
    TableContainer,
    TableCell,
    TableBody,
    Table
} from '@mui/material';
import { OtherContext } from '../../../Context/OtherContext';

export default function PaymentsDetail({
    financial,
    openModal,
    unitId,
    setModalType
}) {

    const {
        UNIT_PAYMENTS
    } = useContext(PaymentsContext);

    const {
        FORMAT_DATE,
        FORMAT_CURRENCY
    } = useContext(OtherContext)

    const [openPayment, setOpenPayment] = useState(false);

    const {
        UPDATE_UNITS_FINANCIAL
    } = useContext(FinancialContext);

    const createPlan = () => {
        UPDATE_UNITS_FINANCIAL({ unitId }).then(() => {
            openModal(true)
            setModalType('financial');
        })
    }

    const openPaymentModal = () => setOpenPayment(true);

    const css = {
        height100: { height: '100%', textAlign: 'center' },
        alignCenter: { textAlign: 'center', margin: 1 },
        priceIcon: { fontSize: '100px', opacity: 0.3 },
        leftAlign: { textAlign: 'right', margin: '10px' }
    }

    let hasPaymentPlan = financial.id ?
        <>
            <PaymentModal open={openPayment} setOpen={setOpenPayment} financial={financial} payments={UNIT_PAYMENTS} />
            <Box sx={css.leftAlign}>
                <Button variant="contained" size="small" onClick={openPaymentModal}>
                    Agregar Pago
                </Button>
            </Box>
            <Table className='payments-list-wrapper' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>No. Pago</b></TableCell>
                        <TableCell><b>Cantidad</b></TableCell>
                        <TableCell><b>Tipo</b></TableCell>
                        <TableCell><b>Fecha De Pago</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {UNIT_PAYMENTS.length ? UNIT_PAYMENTS.map(({ paymentno, paymentamount, paymenttype, duedate }, index) => {
                        return <TableRow key={index}>
                            <TableCell> {paymentno} </TableCell>
                            <TableCell>{FORMAT_CURRENCY(paymentamount)} </TableCell>
                            <TableCell>{paymenttype} </TableCell>
                            <TableCell>{FORMAT_DATE(duedate)} </TableCell>
                        </TableRow>
                    }) : <TableRow>
                        <TableCell>Sin Pagos Registrados</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </>
        :
        <Table className='payments-list-wrapper' aria-label="simple table">
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

    return (
        <div className="payments-wrapper">
            <TableContainer component={Paper} sx={css.height100}>
                <Typography gutterBottom variant="h5" component="div" sx={css.alignCenter}>
                    <b>PAGOS</b>
                </Typography>
                {hasPaymentPlan}
            </TableContainer>
        </div>
    );
}