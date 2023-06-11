import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './PaymentsDetail.css';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

export default function PaymentsDetail() {

    return (
        <div className="payments-wrapper">
            <TableContainer component={Paper} sx={{height: '100%'}}>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center', margin: 1 }}>
                    <b>PAGOS</b>
                </Typography>
                <Table className='payments-list-wrapper' aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center'}}>
                                <PriceChangeIcon sx={{ fontSize: '100px', opacity: 0.3 }} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
                                    Asignar un plan de pago para registrar pagos.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}