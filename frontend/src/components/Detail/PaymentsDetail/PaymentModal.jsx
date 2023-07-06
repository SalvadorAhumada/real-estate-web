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
    Button
} from '@mui/material';
import dayjs from 'dayjs';


export default function FormDialog({ open, setOpen, financial, payments, unit }) {

    const {
        POPUP_DATA,
        SET_POPUP_DATA,
        SET_SNACK,
        SET_IS_UPDATING,
    } = useContext(OtherContext);

    const {
        GET_UNIT_PAYMENTS,
        ADD_PAYMENT,
        VALIDATE_PAYMENT
    } = useContext(PaymentsContext)

    const [dateValue, setDateValue] = useState(dayjs(new Date()));

    const [openModal, setOpenModal] = useState(false);

    const [selectedType, setSelectedType] = useState('Enganche');

    const [selectedPaymentState, setSelectedPaymentState] = useState('Por Pagar');

    const [amount, setAmount] = useState(1000);

    const [comment, setComment] = useState(null);

    const changeType = e => setSelectedType(e.target.value);

    const changeStatus = e => setSelectedPaymentState(e.target.value);

    const handleChange = (e) => setAmount(e);

    const handleClose = () => setOpen(false);

    const dateHandler = (date) => setDateValue(date);

    const handleComment = (e) => setComment(e.target.value);

    const sendPayment = () => {

        const isValid = VALIDATE_PAYMENT(amount, unit);

        if(!isValid) {
            return SET_SNACK({
                value: true,
                message: 'Pago fuera de limite',
                severity: 'error'
            })
        }

        SET_POPUP_DATA({
            title: '¿Agregar Pago?',
            body: ``,
            type: 'payment'
        })
        setOpenModal(true);

    }

    const onAccept = () => {

        SET_IS_UPDATING(true);

        let paymentno = 1;

        if (payments.length) paymentno = payments.length + 1;

        const payment = {
            financialId: financial.id,
            paymentno,
            paymentamount: parseFloat(amount),
            paymenttype: selectedType,
            duedate: dateValue.$d,
            comment,
            currency: "MXN",
            paymentstatus: selectedPaymentState
        };

        ADD_PAYMENT(payment).then(response => {
            GET_UNIT_PAYMENTS(financial.id);
            SET_IS_UPDATING(false);
            /**
             * TODO: Improve error handling
             */
            if(response.error) {
                SET_SNACK({
                    value: true,
                    message: 'Error inesperado. Intente de nuevo.',
                    severity: 'error'
                })
            } else {
                SET_SNACK({
                    value: true,
                    message: 'Plan de pago actualizado con éxito.',
                    severity: 'success'
                })
            }
            setOpenModal(false);
            handleClose();

        })
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <Popup open={openModal} setOpen={setOpenModal} onAccept={onAccept} popupTitle={POPUP_DATA.title} popupBody={POPUP_DATA.body} />
                <DialogTitle>Agregar Pago</DialogTitle>
                <DialogContent></DialogContent>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Fecha de Pago"
                            format="DD/MM/YYYY"
                            value={dateValue}
                            onChange={(newValue) => dateHandler(newValue)}
                        />
                    </LocalizationProvider>
                    <p className="currency-input">
                        <CurrencyInput
                            id="input-currency"
                            name="currency"
                            className="muiClon"
                            placeholder="Please enter a number"
                            defaultValue={1000}
                            decimalsLimit={2}
                            prefix="MXN "
                            onValueChange={handleChange}
                        />
                    </p>
                    <TextField
                        sx={{ width: '100%' }}
                        id="multiline-comment"
                        label="Notas"
                        multiline
                        rows={4}
                        onChange={handleComment}
                    />
                    <FormControl sx={{ marginTop: '15px' }}>
                        <InputLabel id="type-label">Tipo</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            value={selectedType}
                            label="Tipo"
                            onChange={changeType}
                        >
                            <MenuItem value={'Enganche'}>Enganche</MenuItem>
                            <MenuItem value={'Mensualidad'}>Mensualidad</MenuItem>
                        </Select>
                    </FormControl>
                    &nbsp; 
                    <FormControl sx={{ marginTop: '15px' }}>
                        <InputLabel id="type-label">Estatus</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            value={selectedPaymentState}
                            label="Estatus"
                            onChange={changeStatus}
                        >
                            <MenuItem value={'Por Pagar'}>Por Pagar</MenuItem>
                            <MenuItem value={'Pagado'}>Pagado</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button onClick={sendPayment}>Agregar</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}