import React, { useState } from "react";
import { BundleDetail } from "../dashboard/applist/[id]/page";
import EditBundle from "./EditBundle";
import Link from "next/link";

function BundleCard({ bundle }: { bundle: BundleDetail["data"]["data"][0] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const statusbg =
    bundle.bundleStatus === "ACTIVE"
      ? "bg-green-300"
      : bundle.bundleStatus === "PENDING"
      ? "bg-orange-300"
      : bundle.bundleStatus === "ROLLBACK"
      ? "bg-red-300"
      : "bg-amber-400";
  const statusborder =
    bundle.bundleStatus === "ACTIVE"
      ? "border-green-300"
      : bundle.bundleStatus === "PENDING"
      ? "border-orange-300"
      : "border-amber-300";
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };


  return (
    <div
      className={`h-32 w-50 flex-col relative flex bg-white shadow-md overflow-hidden  rounded-2xl  ${statusborder} border-[0.5] `}
    >
      <div
        className={`h-6 justify-center items-center flex p-2  self-end absolute  ${statusbg} my-1`}
      >
        <h1 className="font-bold lowercase text-gray-700 text-xs">
          {bundle.bundleStatus}
        </h1>
      </div>

      <div className="h-10 w-full p-2">
        <h1 className="font-bold text-gray-700 ">{bundle.bundleVersion}v</h1>
      </div>
      <div className="flex-1 flex items-end justify-between p-2  bg-gray-200 ">
      {bundle.isCustom ? <div className=" absolute top-10 font-bold">C</div>:<div className=" absolute top-10 font-bold">E</div>}

        <div>
          <Link
            href={`/dashboard/bundle/${bundle.id}`}
            className="bg-blue-600 cursor-pointer shadow text-white p-1 rounded-sm text-sm"
          >
            View detail
          </Link>
        </div>
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="text-blue-600 cursor-pointer shadow-sm border-blue-600 border-1 px-1 rounded-sm text-sm"
          >
            Edit
          </button>
        </div>
      </div>
      <EditBundle
        bundle={bundle}
        closeModalAction={handleCloseModal}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}

export default BundleCard;
