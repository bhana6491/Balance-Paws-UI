"use client";
import React, { useState } from "react";
import {Typography} from "antd";
import { useEffect } from "react";
const {Title} = Typography;
import { Avatar,} from 'antd';
export default function Profile({session}) {
  // Refactor this
  useEffect(() => {
  }, []);
  return (
    <div className="bg-beige px-30 pt-10 bg-beige">
      <div className='flex flex-col items-center mr-10'>
        <div className="">
          <Avatar size={128} src={session?.user?.image} />
        </div>
        <div className="text-center">
          <Typography.Title level={2} className="text-earth-green font-poppins mt-4">
            {session?.user?.name}
          </Typography.Title>
          <Typography.Title level={5} className="text-earth-green font-poppins mt-4">
            {session?.user?.email}
          </Typography.Title>
        </div>
      </div>
      <div>
              </div>
    </div>
  );
}
