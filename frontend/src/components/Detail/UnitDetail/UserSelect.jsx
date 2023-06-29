import { useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Person4Icon from '@mui/icons-material/Person4';
import Loading from "../../Shared/Loading";
import { UnitContext } from "../../../Context/UnitContext";
import { OtherContext } from "../../../Context/OtherContext";
import { UserContext } from "../../../Context/UserContext";
import './UserSelect.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {

    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ open, setOpen, unit, type }) {

    const {
        GET_EXECUTIVES,
        EXECUTIVES,
        GET_USERS,
        USERS
    } = useContext(UserContext);

    const {
        SET_SNACK,
        GET_CLUSTERS_UNITS,
        IS_UPDATING,
        SET_IS_UPDATING
    } = useContext(OtherContext);

    const {
        UPDATE_USER,
        SET_SELECTED_UNIT,
        UPDATE_CUSTOMER
    } = useContext(UnitContext);

    useEffect(() => {
        GET_EXECUTIVES();
        GET_USERS();
    }, [])


    const text = {
        title: type === 'customer' ? 'Clientes' : 'Ejecutivos',
        body: type === 'customer' ? `NOTA: La unidad cambiara de estatus a RESERVADO automáticamente al asignarle un cliente.` : 'Asignar un ejecutivo encargado de esta unidad.',
    }

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (_event, index) => setSelectedIndex(index);

    const handleUserAssign = () => {
        SET_IS_UPDATING(true);

        const callback = type === 'customer' ? UPDATE_CUSTOMER : UPDATE_USER
        const data = type === 'customer' ?
            { customerId: USERS[selectedIndex].id, unitId: unit.id, clusterId: unit.cluster.id, statusId: 3 } :
            { userId: EXECUTIVES[selectedIndex].id, unitId: unit.id, clusterId: unit.cluster.id }

        callback(data).then(
            () => {
                GET_CLUSTERS_UNITS(data.clusterId).then((units) => {
                    setOpen(false);
                    const updatedUnit = units.find(u => u.id === unit.id)
                    SET_SELECTED_UNIT(updatedUnit);

                    SET_SNACK({
                        value: true,
                        message: 'Unidad actualizada con éxito',
                        severity: 'success'
                    });
                    SET_IS_UPDATING(false);
                    
                })
            }
        ).catch(ex => {
            console.log(ex)
        })
    }

    const handleClose = () => setOpen(false);

    const usersExist = () => {
        const users = type === 'customer' ? USERS : EXECUTIVES

        if (users && users.length !== 0) {
            return users.map((user, index) => {
                return <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                >
                    <ListItemIcon>
                        <Person4Icon />
                    </ListItemIcon>
                    <ListItemText primary={`${user.name} ${user.lastname}`} />
                </ListItemButton>
            })

        } else {
            return <p>No executives</p>
        }
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                 {IS_UPDATING ? <Loading fullscreen="true" /> : '' }
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {text.title}
                </BootstrapDialogTitle>
                <DialogActions className='users-wrapper'>
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <List component="nav" aria-label="unit executives">
                            {usersExist()}
                        </List>
                    </Box>
                </DialogActions>
                <Divider />
                <DialogContent>
                    <Typography gutterBottom>
                        {text.body}
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions>
                <Button color="secondary" onClick={handleClose}>
                        CANCELAR
                    </Button>
                    <Button autoFocus onClick={handleUserAssign}>
                        ASIGNAR
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}