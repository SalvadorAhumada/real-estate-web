import { useState, useContext } from "react";
import {
    IconButton,
    Typography,
    Menu,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterModal from '../FilterModal';
import { OtherContext } from "../../Context/OtherContext";
import XLSX from "xlsx";
import './OptionsMenu.css';

export default function LongMenu({ cluster, type, openCreate }) {

    const ITEM_HEIGHT = 48;

    const [filter, setFilter] = useState(false);

    const {
        CURRENT_DATE
    } = useContext(OtherContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const printDiv = () => window.print()

    const getSheet = () => {
        var dom = document.getElementById("main-table");
        const wb = XLSX.utils.table_to_book(dom, { sheet: "Departments" });

        return XLSX.writeFile(
            wb,
            `${CURRENT_DATE}_unidades_${cluster.name}.xlsx`
        );

    }

    const openFilter = () => setFilter(true);

    const showExecutiveModal = () => openCreate(true);

    let options;

    switch (type) {
        case 'units':
            options = [
                { name: 'Descargar PDF', callback: printDiv, icon: <PictureAsPdfIcon fontSize="small" /> },
                { name: 'Descargar XLSX', callback: getSheet, icon: <GridOnIcon fontSize="small" /> },
                { name: 'Filtar unidades', callback: openFilter, icon: <FilterAltIcon fontSize="small" /> }
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
            <FilterModal open={filter} setOpen={setFilter} cluster={cluster} />
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