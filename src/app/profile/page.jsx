'use client';  // Ensures the code is executed on the client-side only
import { useSession } from "next-auth/react";
import { Avatar, Dropdown } from 'antd';
import { SessionProvider } from "next-auth/react";
import Profile from './Profile';
import { UserOutlined } from '@ant-design/icons';
import { MenuComponent } from '../../components/utils';

const Page = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>; // Show a loading state while session is being fetched
    }

    return (
        <div>
            {session ? (
                <div className="parent bg-beige px-20 pt-10" style={{ height: '100%', minHeight: '100vh' }}>
                    <nav className="flex justify-between items-center mb-10">
                        <div className="font-poppins text-earth-green text-3xl">Balance Paws</div>
                        <Dropdown overlay={MenuComponent} placement="bottomRight">
                            <Avatar size="large" src={session?.user?.image} />
                        </Dropdown>
                    </nav>
                    <div>
                        <Profile session={session}></Profile>
                    </div>
                </div>
            ) : (
                <div>404</div>
            )}
        </div>
    );
};

export default function ProfilePage() {
    return (
        <SessionProvider>
            <Page />
        </SessionProvider>
    );
}
