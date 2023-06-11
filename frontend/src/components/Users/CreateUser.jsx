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
import { OtherContext } from "../../Context/OtherContext";
import { UserContext } from "../../Context/UserContext";

function CreateUser({ open, close }) {

    const {
        SET_SNACK,
    } = useContext(OtherContext);

    const {
        CREATE_EXECUTIVE,
        GET_EXECUTIVES
    } = useContext(UserContext);

    const [newUser, setNewUser] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        type: 'E',
        confirmPassword: ''
    });

    const [showError, setShowError] = useState(false);

    const changeField = (e) => {
        const key = e.target.id || 'type';
        setNewUser({ ...newUser, [key]: e.target.value })
    }

    useEffect(() => {
        if (newUser.password !== newUser.confirmPassword) {
            setShowError(true)
        } else {
            setShowError(false)
        }
    }, [newUser.password, newUser.confirmPassword])

    const validateUser = () => {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (newUser.password !== newUser.confirmPassword) {
            SET_SNACK({
                value: true,
                message: 'Contraseñas no coinciden.',
                severity: 'error'
            });
            return;
        }

        for (const key in newUser) {

            if (!newUser[key]) {
                SET_SNACK({
                    value: true,
                    message: 'Todos los campos son obligatorios.',
                    severity: 'error'
                });
                return;
            }

            if (!emailPattern.test(newUser.email)) {
                SET_SNACK({
                    value: true,
                    message: 'Por favor introduzca un correo electrónico valido.',
                    severity: 'error'
                });
                return;
            }
        }
        console.log(newUser);
        CREATE_EXECUTIVE(newUser).then(
            () => {
                GET_EXECUTIVES()
                close(false);
                SET_SNACK({
                    value: true,
                    message: 'Ejecutivo agregado con éxito',
                    severity: 'success'
                });
            }
        )

    }

    const closeModal = () => close(false);

    return (
        <div className="create-users-page-wrapper">
            <Dialog open={open}
                onClose={closeModal}
            >
                <DialogTitle>Agregar Ejecutivo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre(s)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newUser.name}
                        onChange={changeField} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastname"
                        label="Apellidos"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newUser.lastname}
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
                        value={newUser.email}
                        onChange={changeField}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                        error={showError}
                        value={newUser.password}
                        onChange={changeField}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="confirmPassword"
                        label="Confirmar contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                        error={showError}
                        value={newUser.confirmPassword}
                        onChange={changeField}
                    />
                    <FormControl sx={{ marginTop: '15px' }}>
                        <InputLabel id="type-label">Tipo</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            value={newUser.type}
                            label="Tipo"
                            onChange={changeField}
                        >
                            <MenuItem value={'E'}>Ejecutivo</MenuItem>
                            <MenuItem value={'A'}>Administrador</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button color="secondary" onClick={closeModal}>Cancelar</Button>
                        <Button onClick={validateUser}>Actualizar</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateUser;
