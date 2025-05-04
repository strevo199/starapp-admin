export const dynamic = 'force-dynamic'; 

import LastFiveBundle from "@/app/components/LastFiveBundle";
import ToggleByKey from "@/app/components/ToggleByKey";
import { cookies } from "next/headers";
import UploadBundle from "@/app/components/UploadBundle";

/* eslint-disable @next/next/no-img-element */
interface AppDetail {
  message: string;

  data: {
    id: string;
    appName: string;
    appLogo: string;
    platform: string;
    stagingKey: string;
    productionKey: string;
  };
}
export type BundleDetail = {
  message: string;

  data: {
     data: {
      id: number,
      applicationName: string;
      appLogo: string;
      appBundleUrl: string;
      appAssetUrl: string;
      bundleVersion:  string;
      targetedVersion:  string;
      bundleStatus:  string;
      isMandatory: true,
      isHeadless: true,
      autoRestart: true,
      platform:  string;
      isCustom: true,
      devices:  string[];
      whitelistedBundles:  string[];
      releaseNote:  string;
      createdAt:  string;
      updatedAt:  string;
    }[];
    pageInfo: {
      totalPage: number;
      currentPage: number;
      perPage: number;
      total: number;
    };
  };
};

async function getAppDetail(id: string): Promise<AppDetail> {
  // Fetch from your API
  const cookieStore = await cookies(); // ✅ Await it!
  const token = cookieStore.get("authToken");

  if (!token) {
    throw new Error("Failed to fetch App Details");
  }
  const res = await fetch(`https:// /api/app/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessKey: token.value }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch app");
  }
  return res.json();
}

export async function getLastFiveBundle(evnKey: string): Promise<BundleDetail> {
  // Fetch from your API
  const pageSize = 5;
  const pageNumber = 1;

  const cookieStore = await cookies(); // ✅ Await it!
  const token = cookieStore.get("authToken");
  if (!token) {
    throw new Error("Failed to fetch App Details");
  }
  const res = await fetch(
    `https:// /api/bundle/all/${evnKey}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ accessKey: token.value }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch app");
  }
  return res.json();
}
export async function getActiveBundle(evnKey: string): any {
  const cookieStore = await cookies(); // ✅ Await it!
  const token = cookieStore.get("authToken");
  if (!token) {
    throw new Error("Failed to fetch active bundle");
  }
  const res = await fetch(
    `https:// /api/bundle/active-bundles?envKey=${evnKey}`,
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
    console.error("Update failed with status:", res.status);
    console.error("Error response:", text);
    throw new Error("Failed to update bundle: " + text);
  }
  return res.json();
}

export default async function AppDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { bundle: string};
}) {
  const { id } = await params;
  const { bundle } = await searchParams;

  let app: AppDetail["data"] = {
    id: "",
    appName: "",
    appLogo: "",
    platform: "",
    stagingKey: "",
    productionKey: "",
  };
  let lastFiveBundles: BundleDetail["data"]["data"] = [];
  let activeBundles: BundleDetail["data"]["data"] = [];
  let errorMessage: string = "";
  try {
    const appresult: AppDetail = await getAppDetail(id);
    app = appresult.data;
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load App, kindly reload the page";
  }
  try {
    const showBundles =
      bundle === "production"
        ? await getLastFiveBundle(app.productionKey)
        : await getLastFiveBundle(app.stagingKey);
    lastFiveBundles = showBundles.data.data || [];
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load App Bundle";
  }
  try {
    const fetchactiveBundles =
      bundle === "production"
        ? await getActiveBundle(app.productionKey)
        : await getActiveBundle(app.stagingKey);
    activeBundles = fetchactiveBundles.data || [];
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load App Bundle";
  }


  return (
    <div className="p-1 flex min-h-full  flex-col">
      <div className=" md:flex justify-between items-center">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={app.appLogo}
            alt={app.appName}
            width={80}
            height={80}
            className="rounded-lg"
          />
          <div>
            <h1 className="text-2xl font-bold">{app.appName}</h1>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {app.platform}
            </span>
          </div>
        </div>
        <ToggleByKey environment={bundle || "staging"} />
      </div>

      <div className="space-y-4 flex-col xl:flex-row flex gap-2 flex-1">
        <div className="flex-3/6 gap-3 flex-col flex">
          {/* last five bundles */}
            <LastFiveBundle bundles={lastFiveBundles} />
          
          <UploadBundle   environment={bundle || "staging"} app ={app} />
        </div>
        <div className="bg-gray-200 flex-[0.5] xl:flex-1 flex justify-center items-center">
          {/* <div className=" text-3xl">App admins here</div> */}
        </div>
      </div>
    </div>
  );
}
