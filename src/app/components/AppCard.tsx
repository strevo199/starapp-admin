/* eslint-disable @next/next/no-img-element */
import { AppItemType } from "@/store.tsx/slices/appSlice";
import Link from "next/link";
import React from "react";

type ItemPropsYpe = {
  item: AppItemType["data"][0];
};

const AppCard = ({ item }: ItemPropsYpe) => {
  return (
    <div className="pt-4 bg-white w-96 rounded-xl shadow-md">
      <div className="px-4 flex justify-between items-center">
        <div className="flex gap-x-2 ">
          <h1 className="font-bold text-lg ">{item.appName}</h1>
        </div>
        <img
          src={item.appLogo}
          alt="App Icon"
          width={35}
          height={35}
          className="rounded-lg p-1 bg-gray-100"
        />
      </div>
      <div className="px-4 my-4">
        <div className=" flex gap-x-2  items-center">
          
          <div className="bg-gray-600 p-1 rounded-3xl px-2">
            <h1 className=" text-md font-medium text-white">{item.platform}</h1>
          </div>
        </div>
      </div>
      <div className="gap-y-3 flex flex-col">
        <div className="bg-gray-100  px-4">
          <div>
            <h1 className=" text-md ">Staging Key</h1>
          </div>
          <div>
            <h1 className=" text-md font-bold">{item.stagingKey}</h1>
          </div>
        </div>
        <div className="bg-gray-100  px-4">
          <div>
            <h1 className=" text-md ">Production Key</h1>
          </div>
          <div>
            <h1 className=" text-md font-bold">{item.productionKey}</h1>
          </div>
        </div>
      </div>
      <div className="mt-5 p-1 flex justify-end">
        <Link  href={`/dashboard/applist/${item.id}`}  className=" rounded-xl shadow-blue-900 hover:bg-blue-800 font-semibold text-white bg-blue-600 px-5 py-2" >View Detail</Link>
      </div>
    </div>
  );
};

export default AppCard;
