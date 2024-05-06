import React from 'react'
import logoImage from '../../assets/Logo.png'
import saladImage from '../../assets/salad.jpg'
import { Box, Button, Typography } from '@mui/material'

export default function WellcomeLayout() {
    return (
        <Box style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "100%", }}>
            <Typography variant='h3'>Welcome to PrivateChef </Typography>
            <Typography paragraph={true}>Here you will get your best menu</Typography>
            <Box sx={{ display: 'flex', mt: 2 }}>
                <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                    Sign In
                </Button>
                <Button variant="outlined" color="secondary">
                    Log In
                </Button>
            </Box>
        </Box>
    )
}
