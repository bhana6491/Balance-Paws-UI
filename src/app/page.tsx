import Image from "next/image";
import NavBar from "../components/HomeNavigationBar";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';



function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-6 bg-beige">
      <NavBar></NavBar>
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="mb-16 mx-10 flex flex-col md:flex-row items-center">
          <Image className="rounded-full border-4 border-earth-green aspect-square object-cover" src="/cat_dog.jpeg" alt="Image" width={500} height={500} />
          <div className="mx-auto">
            <Typography variant="h4" component="div" className='text-3xl text-earth-green font-poppins text-center mt-5' sx={{ flexGrow: 1, maxWidth: '600px' }}>
              Craft balanced and nutritious recipes for your furry friends!
            </Typography>
            <Link href={`/recipes/`}>
              <Button variant='contained' size='large' className='mt-12 mx-auto fill-earth-green block text-base text-beige font-poppins' color="inherit" style={{ backgroundColor: '#4F6F52', width: '200px' }}>Get Started</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Home;
