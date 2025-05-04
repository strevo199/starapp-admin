"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ToggleByKey = ({environment}:{environment:string}) => {

  

  const router = useRouter()
  const searchParams = useSearchParams()
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('bundle', value)
    router.replace(`?${params.toString()}`)
  }
  
  return (
    <div>
      <label className="block uppercase font-bold text-md  text-gray-700">
      Environment
      </label>
      <div className="mt-2 space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="platform"
            value="staging"
            onChange={() =>handleChange('staging')}
            checked={environment ==="staging"}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2">Staging</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="platform"
            value="production"
            checked={environment ==="production"}
            onChange={() =>handleChange('production')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2">Production</span>
        </label>
      </div>
    </div>
  );
};

export default ToggleByKey;
