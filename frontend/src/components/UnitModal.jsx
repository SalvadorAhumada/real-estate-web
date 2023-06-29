import { useContext, useEffect, useState } from 'react';
import { UnitContext } from '../Context/UnitContext';
import UnitDetail from './Detail/UnitDetail/UnitDetail';
import PaymentsDetail from './Detail/PaymentsDetail/PaymentsDetail';
import UnitDetailNew from './Detail/UnitDetail/UnitDetail';
import { UserContext } from '../Context/UserContext';
import { FinancialContext } from '../Context/FinancialContext';
import Popup from './Shared/Popup';
import { OtherContext } from '../Context/OtherContext';
import {
    Box,
    Modal,
    Grid,
} from '@mui/material';
import { PaymentsContext } from '../Context/PaymentsContext';

function UnitModal({ open, close }) {

    const [openModal, setOpenModal] = useState(false);

    const [modalType, setModalType] = useState(null);

    const [paymentPlan, setPaymentPlan] = useState('');

    const [paymentMethod, setPaymentMethod] = useState(''); 

    const {
        GET_AVAILABLE_STATUS,
        AVAILABLE_STATUS,
        SELECTED_UNIT,
    } = useContext(UnitContext);

    const {
        GET_EXECUTIVES,
        EXECUTIVES,
        GET_USERS,
        USERS
    } = useContext(UserContext);

    const {
        GET_UNITS_FINANCIAL,
        FINANCIAL_DATA,
        UPDATE_UNITS_FINANCIAL,
        SET_FINANCIAL_DATA,
    } = useContext(FinancialContext);

    const {
        SET_SNACK,
    } = useContext(OtherContext);

    useEffect(() => {
        GET_AVAILABLE_STATUS();
    }, [])

    const handleClose = () => {
        SET_FINANCIAL_DATA({});
        close(false);
    }

    const paymentPlanHandler = () => {
        UPDATE_UNITS_FINANCIAL({ unitId: SELECTED_UNIT.id, plan: paymentPlan, method: paymentMethod }).then(() => {
            SET_SNACK({
                value: true,
                message: 'Plan de pago actualizado con éxito.',
                severity: 'success'
            })
            setOpenModal(false);
        })
    }

    return (
        <div className="modal-wrapper">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="unit-modal"
                aria-describedby="unit-data"
                style={{overflowY: 'auto'}}
            >
                <Box sx={{ flexGrow: 1, width: '80%', margin: '2rem auto', maxWidth: '1300px' }}>
                    <Popup
                        modalType={modalType}
                        open={openModal}
                        setOpen={setOpenModal}
                        onCancel={setOpenModal}
                        onAccept={paymentPlanHandler}
                        popupTitle={'Plan De Pago Creado'}
                        popupBody={'El plan de pago ha sido creado. Por favor seleccione el tipo de plan de pago'}
                        financialData={FINANCIAL_DATA}
                        setPaymentPlan={setPaymentPlan}
                        setPaymentMethod={setPaymentMethod}
                    />
                    <Grid container spacing={{ xs: 2, md: 2 }}>
                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <UnitDetail statuses={AVAILABLE_STATUS}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <PaymentsDetail/>
                        </Grid>
                        {/*                         <Grid item xs={4}>
                            xs=4
                        </Grid>
                        <Grid item xs={7}>
                            xs=8
                        </Grid> */}
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default UnitModal;
