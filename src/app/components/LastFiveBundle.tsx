"use client";

import React from 'react'
import { BundleDetail } from '../dashboard/hymmlist/[id]/page';
import BundleCard from './BundleCard';

const LastFiveBundle = ({bundles}:{bundles:BundleDetail['data']['data']}) => {
  return (
    <div className=" flex-col p-3 rounded-xl bg-white  shadow  flex gap-3 py-2">
         <div className='font-bold text-gray-700 text-sm'>Recent Bundles</div>
    <div className=" flex-wrap p-6 flex gap-3 py-2">
    {
      bundles.map(bundle => (
        <BundleCard bundle ={bundle} key={bundle.id}/>
      ))
    }
  </div>
  </div>
    
  )
}

export default LastFiveBundle

