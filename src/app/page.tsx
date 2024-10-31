'use client';
import { Button, Typography } from 'antd';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const { Title } = Typography;

const Home: React.FC = () => (
  <div className="flex flex-col h-screen bg-beige px-20 pt-10">
      <nav>
          <div className="font-poppins text-earth-green text-3xl">Balance Paws</div>
      </nav>

    {/* <NavBar></NavBar> */}
    <main className="flex flex-col items-center justify-center flex-grow">
      <div className="mb-16 flex flex-col md:flex-row items-center">
        <div className="flex-shrink-0">
          <Image
            className="rounded-full border-4 border-earth-green aspect-square object-cover"
            src="/cat_dog.jpeg"
            alt="Image"
            width={400}
            height={400}
          />
        </div>
        <div className="mx-auto flex flex-col w-1/2">
          <h2 className="text-3xl text-earth-green font-poppins text-center ml-2 mt-5">
            Craft balanced and nutritious recipes for your furry friends!
          </h2>
          <Link href={`/recipes/`}>
            <Button
              type="primary"
              size="large"
              className="mt-12 mx-auto fill-earth-green block text-base text-beige font-poppins"
              style={{ backgroundColor: '#4F6F52', width: '200px', outline: '1px solid black' }}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </main>
  </div>
);

export default Home;
