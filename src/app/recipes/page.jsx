'use client';  // Ensures the code is executed on the client-side only

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import RecipeGenerator from "./RecipeGenerator";
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { SessionProvider } from "next-auth/react";
import { Image } from 'antd';
import { signOut } from "next-auth/react";

const menu = (
    <Menu>
        <Menu.Item key="3" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
            Logout
        </Menu.Item>
    </Menu>
);

const Page = () => {
    const { data: session} = useSession();

return (
    <div>
            {session ? (
        <div className="parent bg-beige px-20 pt-10" style={{ height: '100%', minHeight: '100vh' }}>
        <nav className="flex justify-between items-center mb-10">
            <div className="font-poppins text-earth-green text-3xl">Balance Paws</div>
            <Dropdown overlay={menu} placement="bottomRight">
                <Avatar size="large" src={session?.user?.image} />
            </Dropdown>        
        </nav>
        <div>
            <RecipeGenerator />
        </div>
    </div>
    ):
    (
        <div>404</div>
    )}

    </div>
)
};

export default function RecipesHome() {
    return (
        <SessionProvider>
            <Page />
        </SessionProvider>
    );
}
