import Image from "next/image";
import NavBar from "../components/HomeNavigationBar";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';



function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-beige">
      <NavBar></NavBar>
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="mb-16 mr-8 flex items-center">
            <Image className="rounded-full border-4 border-earth-green aspect-square object-cover" src="/cat_dog.jpeg" alt="Image" width={500} height={500} />
          <div className="ml-16">
            <Typography variant="h4" component="div" className='text-3xl text-earth-green font-poppins text-center' sx={{ flexGrow: 1, maxWidth: '600px' }}>
              Craft balanced and nutritious recipes for your furry friends!
            </Typography>
            <Button variant='contained' size='large' className='mt-12 mx-auto fill-earth-green block text-base text-beige font-poppins' color="inherit" style={{ backgroundColor: '#4F6F52', width: '200px' }}>Get Started</Button>

            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block">
              Get Started
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
export default Home;