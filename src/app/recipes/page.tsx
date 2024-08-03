'use client';
import Image from "next/image";
import * as React from 'react';
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
import RecipeGenerator from './RecipeGenerator';
import RecipeCarousel from "@/components/RecipeCarousel";

function RecipesHome() {
    return (
        <div className="parent bg-beige px-20 pt-10" style={{height:'100%', minHeight:'100vh'}}>

            <nav>
                <div className="font-poppins text-earth-green text-3xl mb-10">Balance Paws</div>
            </nav>
                {/* <Typography variant="h4" component="div" className='text-earth-green font-poppins'>
                    Recipes
                </Typography>
                <Divider className='' sx={{ borderBottomWidth: 2, borderBottomColor: 'black' }} /> */}
                {/* <PetInfo></PetInfo> */}
                {/* <RecipeCarousel></RecipeCarousel> */}
                <div>
                <RecipeGenerator></RecipeGenerator>
                </div>
        </div>

    );
}
export default RecipesHome;
