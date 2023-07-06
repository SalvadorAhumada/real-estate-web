import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useContext, useEffect } from "react";
import { OtherContext } from "../../../Context/OtherContext";
import Popup from "../../Shared/Popup";
import CurrencyInput from 'react-currency-input-field';
import { PaymentsContext } from '../../../Context/PaymentsContext';
import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Checkbox,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import dayjs from 'dayjs';


export default function FormDialog({ open, setOpen, payment, financial, unit }) {

    const {
        SET_SNACK,
        SET_IS_UPDATING,
        POPUP_DATA,
        SET_POPUP_DATA,
    } = useContext(OtherContext);

    const {
        GET_UNIT_PAYMENTS,
        REMOVE_PAYMENT,
        UPDATE_PAYMENT,
        VALIDATE_PAYMENT
    } = useContext(PaymentsContext);

    const [newPayment, setNewPayment] = useState({});

    const handleClose = () => setOpen(false);

    const [openModal, setOpenModal] = useState(false);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setEdit(false);
        setNewPayment(payment);
    }, [payment]);

    const onAccept = () => {
        SET_IS_UPDATING(true);
        REMOVE_PAYMENT({ paymentId: payment.id }).then(() => {
            setOpenModal(false);
            GET_UNIT_PAYMENTS(financial.id);
            SET_IS_UPDATING(false);
            setOpen(false);

            SET_SNACK({
                value: true,
                message: 'Pago eliminado con éxito',
                severity: 'success'
            })
        })
    };

    const updatePayment = () => {

        const isValid = VALIDATE_PAYMENT(payment.paymentamount, unit);

        if (!isValid) {
            return SET_SNACK({
                value: true,
                message: 'Pago fuera de limite',
                severity: 'error'
            })
        }

        UPDATE_PAYMENT(newPayment).then(() => {
            GET_UNIT_PAYMENTS(financial.id);
            setOpen(false);

            SET_SNACK({
                value: true,
                message: 'Pago actualizado con éxito',
                severity: 'success'
            });

        });
    }

    const deletePayment = () => {

        if (payment.paymentstatus === "Pagado") {

            return SET_SNACK({
                value: true,
                message: 'No se puede eliminar pagos con estado "Pagado"',
                severity: 'error'
            });
        }
        setOpenModal(true);

        SET_POPUP_DATA({
            title: '¿Eliminar Pago?',
            body: ``,
            type: 'payment'
        });
    }

    const editHandler = (e) => setEdit(e.target.checked);

    return (
        <div className="payment-edit-modal">
            <Dialog open={open} onClose={handleClose}>
                <Popup open={openModal} setOpen={setOpenModal} onAccept={onAccept} popupTitle={POPUP_DATA.title} popupBody={POPUP_DATA.body} />
                <DialogTitle>Editar Pago</DialogTitle>
                <DialogContent></DialogContent>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Fecha de Pago"
                            format="DD/MM/YYYY"
                            value={dayjs(payment.duedate)}
                            onChange={(e) => setNewPayment({ ...payment, duedate: e.$d })}
                        />
                    </LocalizationProvider>
                    <p className="currency-input">
                        <CurrencyInput
                            id="input-currency"
                            name="currency"
                            className="muiClon"
                            placeholder="Please enter a number"
                            defaultValue={payment.paymentamount}
                            decimalsLimit={2}
                            prefix="MXN "
                            onValueChange={(e) => setNewPayment({ ...payment, paymentamount: parseInt(e) })}
                        />
                    </p>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={editHandler} />} label="Editar notas" />
                    </FormGroup>
                    &nbsp;
                    <TextField
                        sx={{ width: '100%' }}
                        id="multiline-comment"
                        label="Notas"
                        multiline
                        rows={4}
                        disabled={!edit}
                        defaultValue={payment.comment}
                        onChange={(e) => setNewPayment({ ...payment, comment: e.target.value })}
                    />
                    <FormControl sx={{ marginTop: '15px' }}>
                        <InputLabel id="type-label">Tipo</InputLabel>
                        {newPayment.paymenttype ? <Select
                            labelId="type-label"
                            id="type"
                            value={newPayment.paymenttype}
                            label="Tipo"
                            onChange={(e) => setNewPayment({ ...payment, paymenttype: e.target.value })}
                        >
                            <MenuItem value={'Enganche'}>Enganche</MenuItem>
                            <MenuItem value={'Mensualidad'}>Mensualidad</MenuItem>
                        </Select> : ''}
                    </FormControl>
                    &nbsp;
                    <FormControl sx={{ marginTop: '15px' }}>
                        <InputLabel id="type-label">Estatus</InputLabel>
                        {newPayment.paymentstatus ? <Select
                            labelId="status-label"
                            id="status"
                            value={newPayment.paymentstatus}
                            label="Estatus"
                            onChange={(e) => setNewPayment({ ...payment, paymentstatus: e.target.value })}
                        >
                            <MenuItem value={'Por Pagar'}>Por Pagar</MenuItem>
                            <MenuItem value={'Pagado'}>Pagado</MenuItem>
                        </Select> : ''}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button color="error" onClick={deletePayment}>Eliminar Pago</Button>
                    <Button onClick={updatePayment}>Actualizar Pago</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}