import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

export default function LinearIndeterminate() {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                flexDirection: 'column'
            }}>
                 <CircularProgress sx={{margin: '10px'}} />
                 
                Validando datos de usuario...</Box>
        </Box>
    );
}