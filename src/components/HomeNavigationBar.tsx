import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
export default function NavBar() {
    return (
        <Box sx={{marginTop: '1%', marginLeft: '5%', marginRight: '5%' }}>
            <AppBar position="static" className='bg-beige' elevation={0}>
                <Toolbar>
                    <Typography variant="h4" component="div" className='text-4xl text-earth-green font-poppins' sx={{ flexGrow: 1 }}>
                        Balance Paws
                    </Typography>
                    <Button variant='outlined' size='large' className=' text-base text-earth-green font-poppins' color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}