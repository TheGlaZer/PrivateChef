import React from 'react'
import logoImage from '../../assets/Logo.png'
import saladImage from '../../assets/salad.jpg'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function WellcomeLayout() {
    const navigate = useNavigate()
    return (
        <Box style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "100%", }}>
            <Typography variant='h3'>Welcome to PrivateChef </Typography>
            <Typography paragraph={true}>Here you will get your best menu</Typography>
            <Box sx={{ display: 'flex', mt: 2 }}>
                <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => navigate("/signup")}>
                    Sign In
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/login")}>
                    Log In
                </Button>
            </Box>
        </Box>
    )
}
