"use client";

import React, { useState } from "react";
import { HymmListype } from "@/store.tsx/slices/appSlice";
import EditBundle from "./EditBundle";

type Props = {
  hymmlist: HymmListype;
};

export default function HymmListClient({ hymmlist }: Props) {
  const [selected, setSelected] = useState<HymmListype[0]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowPreview = (item: (typeof hymmlist)[0]) => setSelected(item);
  const closeModalAction = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Hymm List</h1>
      <div className="flex lg:flex-row flex-col gap-3 flex-1">
        <div className="flex-1 sm:max-h-[20vh] lg:max-h-lvh overflow-y-auto">
          {hymmlist.length > 0 ? (
            <div className="gap-5  flex-wrap flex">
              {hymmlist.map((item) => (
                <div
                  key={item.hymm_number}
                  className={`${
                    selected?.hymm_number === item.hymm_number
                      ? "border-purple-500"
                      : "border-none"
                  } border-1 bg-white h-10 w-10 sm:h-15 sm:w-15 rounded-xl shadow-lg justify-center items-center flex cursor-pointer`}
                  onClick={() => handleShowPreview(item)}
                >
                  <div className="font-bold text-lg sm:text-xl">{item.hymm_number}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hymm found</p>
          )}
        </div>
        {selected?.title && (
          <div className="flex-1 sm:max-h-[80vh] p-4 lg:max-h-lvh overflow-y-auto bg-gray-200">
            {/* You could render the preview here */}
            <div className="flex justify-between">
              <div className="text-sm"></div>
              <div className=" font-bold text-lg sm:text-xl text-center">
                {selected?.content}
              </div>
              <div
                className={`border-1 bg-white h-6 w-10 rounded-xl shadow-lg justify-center items-center flex cursor-pointer`}
                onClick={() => setIsModalOpen(true)}
              >
                <div className="text-sm">Edit</div>
              </div>
            </div>
            <div className="flex justify-around my-3">
              <div className=" text-center">{selected?.title}</div>
            </div>
            {selected?.chorus && (
              <div className="flex gap-x-3 m">
                <div className=" text-center">Chorus:</div>
                <pre>{selected?.chorus}</pre>
              </div>
            )}
            <div className="font-bold my-2.5"> Verses</div>

            {selected?.verses.map((item, index) => (
              <div
                className={`p-2  ${
                  index % 2 ? "bg-gray-100" : " bg-transparent"
                } flex gap-x-3`}
                key={index.toString()}
              >
                <div>{item.label}</div>
                <pre className="text-sm sm:text-lg lg:text-xl">{item.value}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
      <EditBundle
        hymm={selected}
        isModalOpen={isModalOpen}
        closeModalAction={closeModalAction}
      />
    </div>
  );
}
