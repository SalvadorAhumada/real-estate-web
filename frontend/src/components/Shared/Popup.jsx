import { forwardRef, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCardIcon from '@mui/icons-material/AddCard';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
    open,
    setOpen,
    popupTitle,
    popupBody,
    onCancel,
    onAccept,
    modalType,
    financialData,
    setPaymentPlan,
    setPaymentMethod
}) {

    const [selectedIndexPlan, setSelectedIndexPlan] = useState(-1);

    const [selectedIndexMethod, setSelectedIndexMethod] = useState(-1);

    const handleMethodClick = (_event, index) => {
        const plan = financialData.plansoptions.plans[index];
        setPaymentPlan(plan);
        setSelectedIndexPlan(index);
    }

    const handlePlanClick = (_event, index) => {
        const method = financialData.methodsoptions.methods[index];
        setPaymentMethod(method);
        setSelectedIndexMethod(index);
    }

    const handleClose = () => setOpen(false);

    const getOptions = () => {

        switch (modalType) {
            case 'financial':

                if (!financialData || !financialData.plansoptions) return;


                return <>
                <List component="nav" aria-label="unit executives">
                    {financialData.plansoptions.plans.map((plan, index) => {
                        return <ListItemButton
                            key={index}
                            selected={selectedIndexPlan === index}
                            onClick={(event) => handleMethodClick(event, index)}
                        >
                            <ListItemIcon>
                                <AddCardIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${plan}`} />
                        </ListItemButton>
                    })}
                </List>
                <DialogContentText id="alert-dialog-slide-description">
                        Seleccione método de pago
                    </DialogContentText>
                <List component="nav" aria-label="unit executives">
                    {financialData.methodsoptions.methods.map((method, index) => {
                        return <ListItemButton
                            key={index}
                            selected={selectedIndexMethod === index}
                            onClick={(event) => handlePlanClick(event, index)}
                        >
                            <ListItemIcon>
                                <AddCardIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${method}`} />
                        </ListItemButton>
                    })}
                </List></>
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{popupTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {popupBody}
                    </DialogContentText>
                    {getOptions()}
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button onClick={onAccept}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}