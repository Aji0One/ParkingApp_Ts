import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "../styles/Loading.css";



export default function Loading() {


    return (
        <div className='loading' data-testid='loading-component'>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    );
}