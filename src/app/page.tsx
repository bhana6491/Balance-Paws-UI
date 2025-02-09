import { Button } from 'antd';
import Image from 'next/image';
import { GoogleOutlined } from '@ant-design/icons';
import { signIn, signOut, auth } from "../../auth";

const Home = async () => {
  const session = await auth();
  console.log(process.env.AUTH_SECRET)
  console.log(process.env.NEXTAUTH_URL)
  console.log(process.env.AUTH_GOOGLE_ID)
  console.log(process.env.AUTH_GOOGLE_SECRET)

  return (
    <div className="flex flex-col bg-beige min-h-screen px-4 md:px-20 pt-10">
    <nav>
        <div className="font-poppins text-earth-green text-3xl">Balance Paws</div>
    </nav>
    <main className="flex flex-col md:flex-row items-center justify-center flex-grow">
      <div className="flex justify-center items-center basis-full md:basis-1/2 p-4">
      <Image
      className="rounded-full border-4 border-earth-green aspect-square object-cover"
      src="/cat_dog.jpeg"
      alt="Image"
      width={400}
      height={400}
      />
      </div>
      <div className="flex justify-center items-center basis-full md:basis-1/2 p-4">
        <div className="mx-auto flex flex-col w-1/2 space-y-4">
          <div> 
        <h2 className="text-3xl text-earth-green font-poppins text-center">
          Craft balanced and nutritious recipes for your furry friends!
        </h2>
          </div>

          {session ? (
        <form
          action={async () => {
        "use server";
        await signOut({redirectTo: '/'});
          }}
        >
          <Button type='primary' className="w-full" htmlType='submit' 
        style={{ 
          backgroundColor: '#4F6F52', 
          borderColor: '#4F6F52', 
          color: 'white', 
          fontWeight: 'bold' 
        }}
          >
        Logout
          </Button>
        </form>
          ) : (
        <form
          action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/recipes" });
          }}
        >
          <Button className='earth-green w-full' htmlType='submit' 
        icon={<GoogleOutlined />} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: '#4F6F52', 
          borderColor: '#4F6F52', 
          color: 'white', 
          fontWeight: 'bold' 
        }}
          >
        Sign in with Google
          </Button>
        </form>
          )}
        </div>
      </div>
    </main>

    </div>

  );
};

export default Home;

