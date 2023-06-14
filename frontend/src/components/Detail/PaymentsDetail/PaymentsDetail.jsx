import { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './PaymentsDetail.css';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FinancialContext } from '../../../Context/FinancialContext';

export default function PaymentsDetail({ financial, openModal, unitId, setModalType }) {

    const {
        UPDATE_UNITS_FINANCIAL
    } = useContext(FinancialContext);

    const createPlan = () => {
        UPDATE_UNITS_FINANCIAL({ unitId }).then(() => {
            openModal(true)
            setModalType('financial');
        })
    }

    const css = {
        height100: { height: '100%', textAlign: 'center' },
        alignCenter: { textAlign: 'center', margin: 1 },
        priceIcon: { fontSize: '100px', opacity: 0.3 },
        leftAlign: { textAlign: 'right', margin: '10px' }
    }

    let hasPaymentPlan = financial.id ?
        <Table className='payments-list-wrapper' aria-label="simple table">
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Box sx={css.leftAlign}>
                            <Button variant="contained" size="small">
                                Agregar Pago
                            </Button>
                        </Box>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
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