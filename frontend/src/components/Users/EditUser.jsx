import { useContext, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import { UserContext } from "../../Context/UserContext";
import { OtherContext } from "../../Context/OtherContext";
import Popup from "../Shared/Popup";

export default function FormDialog({ open, close, executive, updateExecutive }) {

    const {
        UPDATE_USER,
        GET_EXECUTIVES,
        DELETE_EXECUTIVE
    } = useContext(UserContext);

    useEffect(() => {
        setSelectedType(executive.type);
    }, [executive])

    const {
        SET_SNACK,
        POPUP_DATA,
        SET_POPUP_DATA
    } = useContext(OtherContext);

    const [selectedType, setSelectedType] = useState('');

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClose = () => close(false);

    const changeField = (e) => updateExecutive(e)

    const changeType = e => setSelectedType(e.target.value);

    const sendUpdate = () => {
        const updateUser = { ...executive, type: selectedType };
        UPDATE_USER(updateUser).then(
            ({ errorCode }) => {

                if (errorCode) {
                    SET_SNACK({
                        value: true,
                        message: 'Correo electrónico ya existe en base de datos',
                        severity: 'error'
                    });
                    return;
                }

                GET_EXECUTIVES()
                close(false);
                SET_SNACK({
                    value: true,
                    message: 'Ejecutivo actualizado con éxito',
                    severity: 'success'
                });
            }
        )
    }

    const handleDelete = () => {
        SET_POPUP_DATA({
            title: '¿Eliminar?',
            body: `¿Eliminar a ${executive.name} ${executive.lastname} de la base de datos?`,
            type: 'status'
        })
        setOpenConfirm(true);
    }

    const onAccept = () => {
        DELETE_EXECUTIVE({ userId: executive.id }).then(
            (res) => {

                if (res.error) {
                    SET_SNACK({
                        value: true,
                        message: 'No es posible eliminar a usuario actual',
                        severity: 'error'
                    });
                    return;
                }

                GET_EXECUTIVES();
                setOpenConfirm(false);
                close(false);
                SET_SNACK({
                    value: true,
                    message: 'Ejecutivo eliminado con éxito',
                    severity: 'success'
                });
            }
        )
    }

    const onCancel = () => {
        setOpenConfirm(false);
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <Popup open={openConfirm} setOpen={setOpenConfirm} onCancel={onCancel} onAccept={onAccept} popupTitle={POPUP_DATA.title} popupBody={POPUP_DATA.body} />
                <DialogTitle>Editar Ejecutivo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre(s)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={executive.name}
                        onChange={changeField}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastname"
                        label="Apellidos"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={executive.lastname}
                        onChange={changeField}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Correo electrónico"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={executive.email}
                        onChange={changeField}
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
                            <MenuItem value={'E'}>Ejecutivo</MenuItem>
                            <MenuItem value={'A'}>Administrador</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleDelete}>Eliminar</Button>
                    <Button color="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button onClick={sendUpdate}>Actualizar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}