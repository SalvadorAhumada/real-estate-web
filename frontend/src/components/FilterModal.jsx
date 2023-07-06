import { useContext, useEffect, useState } from "react";
import { UnitContext } from "../Context/UnitContext";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Box,
    Slider,
    Typography
} from '@mui/material';
import { useSearchParams } from "react-router-dom";
import { OtherContext } from "../Context/OtherContext";

export default function FormDialog({ open, setOpen, cluster }) {

    const priceMinRange = 0;
    const priceMaxRange = 2000000

    const {
        FORMAT_CURRENCY,
        SET_CLUSTER_UNITS,
        SET_IS_LOADING,
        IS_FILTERING,
        SET_IS_FILTERING
    } = useContext(OtherContext);

    const {
        AVAILABLE_STATUS,
        FILTER_UNITS
    } = useContext(UnitContext);

    const [searchParams, setSearchParams] = useSearchParams();

    const [price, setPrice] = useState([priceMinRange, priceMaxRange]);

    const [unit, setUnit] = useState('');

    const [status, setStatus] = useState([]);

    useEffect(() => {
        if (searchParams.size !== 0 && IS_FILTERING) {
            for (const [key, value] of searchParams.entries()) {
                switch (key) {
                    case 'unit':
                        setUnit(value);
                        break;
                    case 'minPrice':
                        let newMin = price;
                        newMin[0] = +value;
                        setPrice(newMin);
                        break;
                    case 'maxPrice':
                        let newMax = price;
                        newMax[1] = +value;
                        setPrice(newMax);
                        break;
                    case 'status':
                        const newStatus = AVAILABLE_STATUS.find(status => status.id == value).name;
                        setStatus([...status, newStatus]);
                        break;
                }
            }
        }

        if (searchParams.size === 0) {
            setUnit('');
            setStatus([]);
            setPrice([priceMinRange, priceMaxRange]);
        }

    }, [searchParams, IS_FILTERING])

    const handleChange = (_event, newValue) => setPrice(newValue);

    const handleClose = () => setOpen(false);

    const changeStatus = (event) => {

        const {
            target: { value },
        } = event;

        setStatus(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const filterSearch = () => {

        let toSearch = {
            unit: unit.toUpperCase(),
            minPrice: price[0],
            maxPrice: price[1],
            clusterId: cluster.id,
            status: []
        }

        status.map(s => toSearch.status.push(
            AVAILABLE_STATUS.find(
                status => status.name == s
                ).id
            )
        )
        setSearchParams(toSearch);
        setOpen(false);

    }

    useEffect(() => {
        if (searchParams.size != 0 && !IS_FILTERING) {
            SET_IS_FILTERING(true);
            SET_IS_LOADING(true);
            FILTER_UNITS(searchParams).then((data) => {
                SET_CLUSTER_UNITS(data);
                SET_IS_LOADING(false);
            })
        }
    }, [searchParams, IS_FILTERING])

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Filtrar Unidades</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ width: '150px' }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Número de Unidad"
                        type="text"
                        value={unit || ''}
                        fullWidth
                        variant="standard"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    <br></br>
                    <FormControl sx={{ marginTop: '15px', width: '200px' }}>
                        <InputLabel id="type-label">Estatus</InputLabel>
                        <Select
                            multiple
                            labelId="status-label"
                            id="status"
                            label="Estatus"
                            placeholder="Seleccionar"
                            value={status}
                            onChange={changeStatus}
                        >
                            {AVAILABLE_STATUS.map(({ name, id }) => {
                                return <MenuItem key={id} value={name}>{name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Box sx={{ width: 300, marginTop: '15px', }}>
                        <Slider
                            getAriaLabel={() => 'Precio'}
                            value={price}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={priceMinRange}
                            max={priceMaxRange}
                            step={100000}
                            marks
                        />
                    </Box>
                    <Typography variant="span">
                        Rango de Precio {FORMAT_CURRENCY(price[0])}-{FORMAT_CURRENCY(price[1])}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button onClick={filterSearch}>Filtrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}