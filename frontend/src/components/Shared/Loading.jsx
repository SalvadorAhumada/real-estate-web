import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

export default function LinearIndeterminate({ message, fullscreen }) {

    const isFullscreen = fullscreen ? { zIndex: 9999999, background: '#00000069', position: 'fixed', top: 0, bottom: 0, right: 0, left: 0, width: '100%' } : { width: '100%' }

    return (
        <Box sx={isFullscreen}>
            <LinearProgress />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                flexDirection: 'column'
            }}>
                <CircularProgress sx={{ margin: '10px' }} />
                {message}
            </Box>
        </Box>
    );
}