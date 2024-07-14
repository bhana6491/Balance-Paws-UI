'use client';
import Image from "next/image";
import * as React from 'react';
import NavBar from "../../components/HomeNavigationBar";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PetInfo from './PetInfo';

function RecipesHome() {
    return (
        <div className="bg-beige pt-6 flex-inline min-h-screen">
            <NavBar></NavBar>
            <Box className='mt-14 flex-inline mx-11'>
                <Typography variant="h4" component="div" className='text-earth-green font-poppins'>
                    Recipes
                </Typography>
                <Divider className='' sx={{ borderBottomWidth: 2, borderBottomColor: 'black' }} />
                <PetInfo></PetInfo>

            </Box>
        </div>
    );
}
export default RecipesHome;
