import { useState, useContext } from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { OtherContext } from "../../Context/OtherContext";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import XLSX from "xlsx";
import AddIcon from '@mui/icons-material/Add';
import './OptionsMenu.css';

const ITEM_HEIGHT = 48;

export default function LongMenu({ cluster, type, openCreate }) {

    const {
        CURRENT_DATE
    } = useContext(OtherContext);


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const printDiv = () => window.print()

    const getSheet = () => {
        var dom = document.getElementById("main-table");
        const wb = XLSX.utils.table_to_book(dom, { sheet: "Departments" });

        return XLSX.writeFile(
            wb,
            `${CURRENT_DATE}_unidades_${cluster}.xlsx`
        );

    }

    const showExecutiveModal = () => openCreate(true);

    let options;
    switch(type) {
        case 'units':
            options = [
                { name: 'Descargar PDF', callback: printDiv, icon: <PictureAsPdfIcon fontSize="small" /> },
                { name: 'Descargar XLSX', callback: getSheet, icon: <GridOnIcon fontSize="small" /> }
            ];
            break;
        case 'users':
            options = [
                { name: 'Agregar Ejecutivo', callback: showExecutiveModal, icon: <AddIcon fontSize="small" /> }
            ]
        break;
    }

    return (
        <div className="config-menu">
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map(({ name, callback, icon }) => (
                    <MenuItem key={name} onClick={callback}>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <Typography variant="body2" color="text.secondary">
                        {name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}