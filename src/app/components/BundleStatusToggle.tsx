"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const BundleStatusToggle = ({ status }: { status: string }) => {
  const setstatusType = [
    "PENDING",
    "ACTIVE",
    "INACTIVE",
    "ROLLBACK",
    "SUSPENDED",
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    router.replace(`?${params.toString()}`);
  };


  return (
    <div>
      <label className="block uppercase font-bold text-md  text-gray-700">
      Update  Status
      </label>
      <div className="mt-2 flex flex-wrap  space-x-4">
        {setstatusType.map((item,index) => (
         <label key={index} className="flex items-center">
          <input
            type="radio"
            name="platform"
            value="staging"
            onChange={() => handleChange(item)}
            checked={status === item}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-700 text-sm">{item}</span>
        </label>

        )) 
        }
        
      </div>
    </div>
  );
};

export default BundleStatusToggle;
