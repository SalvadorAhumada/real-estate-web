import { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { UnitContext } from '../Context/UnitContext';
import Grid from '@mui/material/Grid';
import UnitDetail from './Detail/UnitDetail/UnitDetail';
import PaymentsDetails from './Detail/PaymentsDetail/PaymentsDetail';
import { UserContext } from '../Context/UserContext';

function UnitModal({ open, close }) {

    const {
        GET_AVAILABLE_STATUS,
        AVAILABLE_STATUS
    } = useContext(UnitContext);

    const {
        GET_EXECUTIVES,
        EXECUTIVES,
        GET_USERS,
        USERS
    } = useContext(UserContext);

    useEffect(() => {
        GET_AVAILABLE_STATUS();
        GET_EXECUTIVES();
        GET_USERS();
    }, [])

    const handleClose = () => close(false);

    const views = [
        <UnitDetail executives={EXECUTIVES} customers={USERS} statuses={AVAILABLE_STATUS} />,
        <PaymentsDetails />
    ];

    return (
        <div className="modal-wrapper">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="unit-modal"
                aria-describedby="unit-data"
            >
                {/*                 <Box sx={{ flexGrow: 1, width: '70%', margin: '0 auto', maxWidth: '1300px' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 4, md: 8 }}>
                        {views.map((View, index) => (
                            <Grid item xs={3} sm={2} md={4} key={index} sx={{margin:4}}>
                                { View }
                            </Grid>
                        ))}
                    </Grid>
                </Box> */}
                <Box sx={{ flexGrow: 1, width: '80%', margin: '2rem auto', maxWidth: '1300px' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={4}>
                            <UnitDetail executives={EXECUTIVES} customers={USERS} statuses={AVAILABLE_STATUS} />
                        </Grid>
                        <Grid item xs={7}>
                            <PaymentsDetails />
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
