import { useContext, useEffect, useState } from "react";
import { OtherContext } from "../../Context/OtherContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
/* import UnitModal from "./UnitModal"; */
/* import './ListUnits.css'; */
import EditUser from "./EditUser";
import { UserContext } from "../../Context/UserContext";
import Chip from '@mui/material/Chip';

export default function UsersList() {

    const [open, setOpen] = useState(false);

    const [executive, setExecutive] = useState({
        name: '',
        lastname: '',
        email: '',
        type: ''
    });

    const {
        GET_EXECUTIVES,
        EXECUTIVES
    } = useContext(UserContext);

    useEffect(() => {
        GET_EXECUTIVES();
    }, [])

    useEffect(() => {
        setExecutive(executive);
    }, [executive])

    const setSelectedExecutive = (selectedExec) => {
        setExecutive(selectedExec);
        setOpen(true);
    }

    const updateUser = (e) => {
        setExecutive({ ...executive, [e.target.id]: e.target.value })
    }

    const getType = (type) => {
        let color = '';

        switch (type) {
            case 'A':
                color = 'primary';
                break;
            case 'E':
                color = 'success';
                break;

        }
        return <Chip label={type} color={color} variant="outlined" />
    }
    return (
        <>
            <TableContainer sx={{ width: '70%', maxWidth: 800, margin: '0 auto', cursor: 'pointer' }} component={Paper}>
                <Table id="main-table" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="header-modifier">NOMBRE</TableCell>
                            <TableCell className="header-modifier">APELLIDO</TableCell>
                            <TableCell className="header-modifier">CORREO ELECTRÓNICO</TableCell>
                            <TableCell className="header-modifier">TIPO</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {EXECUTIVES ? EXECUTIVES.map((row) => (
                            <TableRow
                                onClick={() => setSelectedExecutive(row)}
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { background: '#0000002b' } }}
                            >
                                <TableCell className="cell-modifier-units-list" component="th" scope="row">
                                    <b>{row.name}</b>
                                </TableCell>
                                <TableCell className="cell-modifier-units-list" component="th" scope="row">
                                    {row.lastname}
                                </TableCell>
                                <TableCell className="cell-modifier-units-list" component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell className="cell-modifier-units-list" component="th" scope="row">
                                    {getType(row.type)}
                                </TableCell>
                            </TableRow>
                        )) : ''}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditUser
                open={open}
                close={setOpen}
                executive={executive}
                updateExecutive={updateUser} />
        </>
    );
}