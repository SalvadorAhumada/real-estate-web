import { useContext, useEffect, useState } from "react";
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
import { UserContext } from "../../../Context/UserContext";

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

export default function CustomizedDialogs() {

    const {
        GET_EXECUTIVES,
        EXECUTIVES
    } = useContext(UserContext);

    useEffect(() => {
        GET_EXECUTIVES();
    }, []);

    const [open, setOpen] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (_event, index) => {
        setSelectedIndex(index);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const executivesExist = () => {

        if (EXECUTIVES && EXECUTIVES.length !== 0) {
            return EXECUTIVES.map((executive, index) => {
                return <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                >
                    <ListItemIcon>
                        <Person4Icon />
                    </ListItemIcon>
                    <ListItemText primary={`${executive.name} ${executive.lastname}`} />
                </ListItemButton>
            })

        } else {
            return <p>No executives</p>
        }
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Seleccionar un ejecutivo
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Ejecutivos
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Asignar un ejecutivo encargado de esta unidad.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <List component="nav" aria-label="unit executives">
                            {executivesExist()}
                        </List>
                        <Divider />
                    </Box>
                </DialogActions>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        ASIGNAR
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}