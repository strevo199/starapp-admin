import BundleStatusToggle from "@/app/components/BundleStatusToggle";
import { cookies } from "next/headers";

/* eslint-disable @next/next/no-img-element */

export type BundleDetail = {
  message: string;

  data: {
    id: number;
    applicationName: string;
    appLogo: null;
    appBundleUrl: string;
    appAssetUrl: string;
    bundleVersion: string;
    targetedVersion: string;
    bundleStatus: string;
    isMandatory: true;
    isHeadless: true;
    autoRestart: true;
    platform: string;
    isCustom: true;
    successfulDownloadCount: number;
    failedDownloadCount: number;
    devices: string[];
    whitelistedBundles: string[];
    releaseNote: string;
    createdAt: string;
    updatedAt: string;
  };
};
interface PageProps {
  params: { id: string };
  searchParams: { status?: string };
}

async function getBundleDetail(bundleId: string): Promise<BundleDetail> {
  // Fetch from your API

  const cookieStore = await cookies(); // ✅ Await it!
  const token = cookieStore.get("authToken");

  if (!token) {
    throw new Error("Failed to fetch App Details");
  }
  const res = await fetch(
    `https:// /api/bundle/summary/${bundleId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessKey: token.value }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch app");
  }

  return res.json();
}

export default async function BundleDetailPage({
  params,
  searchParams,
}: PageProps) {
  let bundle: BundleDetail["data"] = {
    id: 0,
    applicationName: "",
    appLogo: null,
    appBundleUrl: "",
    appAssetUrl: "",
    bundleVersion: "",
    targetedVersion: "",
    bundleStatus: "",
    isMandatory: true,
    isHeadless: true,
    autoRestart: true,
    platform: "",
    isCustom: true,
    devices: [],
    whitelistedBundles: [],
    releaseNote: "",
    createdAt: "",
    updatedAt: "",
    successfulDownloadCount: 0,
    failedDownloadCount: 0
  };
  const { status } = await searchParams;
  const { id } = await params;

  let resMessage: string = "";

  try {
    const appresult: BundleDetail = await getBundleDetail(id);
    bundle = appresult.data;
  } catch (error) {
    resMessage =
      error instanceof Error
        ? error.message
        : "Failed to load Bundle, kindly reload the page";
  }

  try {
    await getActiveBundle();
    const appresult: BundleDetail = await getBundleDetail(id);
    bundle = appresult.data;
  } catch (error) {
    resMessage =
      error instanceof Error ? error.message : "Failed to update Bundle Status";
  }

  async function getActiveBundle(): Promise<
    { message: string; code: number; data: string } | undefined
  > {
    if (status === undefined) return;
    const cookieStore = await cookies(); // ✅ Await it!
    const token = cookieStore.get("authToken");
    if (!token) {
      throw new Error("Failed to fetch active bundle");
    }
    const res = await fetch(
      `https:// /api/bundle/${bundle.id}?status=${status}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessKey: token.value }),
      }
    );

    if (!res.ok) {
      const text = await res.text(); // Get the actual error response
      throw new Error("Failed to update bundle: " + text);
    }
    getBundleDetail(id);
    return res.json();
  }

  return (
    <div className="p-1 flex  flex-col">
      <div className=" text-center font-bold">{resMessage}</div>
      <div className=" lg:flex  justify-between ">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={bundle.appLogo}
            alt={bundle.applicationName}
            width={80}
            height={80}
            className="rounded-lg"
          />
          <div>
            <h1 className="text-2xl font-bold">{bundle.applicationName}</h1>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {bundle.platform}
            </span>
          </div>
        </div>
        <div>
          <div className=" hidden xl:flex gap-x-2 ">
            <div className=" text-lg font-bold flex-1">Bundle Version:</div>
            <div className=" text-lg font-bold text-gray-600 ">
              {bundle.bundleVersion}v
            </div>
          </div>
          <div className=" hidden xl:flex gap-x-2  ">
            <div className=" text-lg font-bold flex-1">Targeted app:</div>
            <div className=" text-lg font-bold text-gray-600 ">
              {bundle.targetedVersion}v
            </div>
          </div>
        </div>
        <BundleStatusToggle status={status || bundle.bundleStatus} />
      </div>

      <div className="  mt-5 flex-col lg:flex-row flex gap-4 flex-1">
        <div className="  h-fit flex-1  bg-white">
          <div className="flex gap-x-2 p-3  item-center xl:hidden xl:bg-white bg-gray-100">
            <div className=" text-sm flex-1">App Version</div>
            <div className=" text-md font-bold text-gray-700 ">
              {bundle.targetedVersion}v
            </div>
          </div>
          <div className="xl:hidden flex gap-x-2 p-3  item-center   ">
            <div className=" text-sm flex-1">Bundle Version:</div>
            <div className=" text-md font-bold text-gray-700 ">
              {bundle.bundleVersion}v
            </div>
          </div>
          <div className=" flex gap-x-2 p-3  item-center bg-gray-100   ">
            <div className=" text-sm flex-1">Is Mandatory:</div>
            <div className=" text-md font-bold text-gray-700 ">
              {bundle.isMandatory ? "Yes" : "No"}
            </div>
          </div>
          <div className=" flex gap-x-2 p-3  item-center ">
            <div className=" text-sm flex-1">Is Custom:</div>
            <div className=" text-md font-bold text-gray-700 ">
              {bundle.isCustom ? "Yes" : "No"}
            </div>
          </div>
          <div className=" flex gap-x-2 p-3  item-center  bg-gray-100 ">
            <div className=" text-sm flex-1">Background Mode:</div>
            <div className=" text-md font-bold  text-gray-700">
              {bundle.isHeadless ? "Yes" : "No"}
            </div>
          </div>
          <div className=" flex gap-x-2 p-3  item-center  ">
            <div className=" text-sm flex-1">Auto restart:</div>
            <div className=" text-md font-bold text-gray-700 ">
              {bundle.autoRestart ? "Yes" : "No"}
            </div>
          </div>
        </div>
        {!bundle.isCustom && (
          <div className="flex-1   bg-gray-100 ">
            <div className=" p-2 mt-2 text-center font-bold bg-gray-500 text-white">
              Whitelisted bundles
            </div>
            {bundle.whitelistedBundles.length ? (
              bundle.whitelistedBundles.map((item) => (
                <div
                  className=" px-1 text-md font-bold text-gray-500 "
                  key={item}
                >
                  {item}
                </div>
              ))
            ) : (
              <div className=" text-sm p-2">No whitelisted Bundle found</div>
            )}
          </div>
        )}
        {bundle.isCustom && (
          <div className=" flex-1  bg-gray-100 ">
            <div className=" p-2 mt-2 text-center font-bold bg-gray-500 text-white">
              Targeted device ID
            </div>
            {bundle.devices.map((item) => (
              <div className=" text-sm " key={item}>
                {item}
              </div>
            ))}
          </div>
        )}
        <div className=" rounded-xl flex-1   h-fit bg-white">
          {/* Bubdle Property */}
          <div className=" p-4 text-center font-bold bg-gray-500 text-white">
            Downloads Counts
          </div>
          <div className=" flex gap-x-2 p-3  item-center  ">
            <div className=" text-md text-green-800 flex-1">Successful:</div>
            <div className=" text-md text-green-800 font-bold ">
              {bundle.successfulDownloadCount}
            </div>
          </div>
          <div className=" flex gap-x-2 p-3  item-center  ">
            <div className=" text-md flex-1 text-red-800">Failed:</div>
            <div className=" text-md font-bold text-red-700 ">
              {bundle.failedDownloadCount}
            </div>
          </div>
        </div>
        <div className=" rounded-xl overflow-hidden = bg-white">
          {/* Bubdle Property */}
          <div className=" p-4 text-center font-bold bg-gray-500 text-white">
            Release Note
          </div>
          <pre className=" p-3  flex-wrap">{bundle.releaseNote}</pre>
        </div>
      </div>
      <div className=" flex-1/6 mt-6 bg-white">
        {/* Bubdle Property */}
      </div>
    </div>
  );
}
 