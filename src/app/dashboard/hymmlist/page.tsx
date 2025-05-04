import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
import { HymmListype } from "@/store.tsx/slices/appSlice";
import HymmListClient from "@/app/components/HymmListClient";

export async function gethymmlist(): Promise<HymmListype> {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("authToken");

  const response = await fetch(
    "https://startapp-be.onrender.com/hymms/get_hymms",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token?.value}`,
      },
      // body: JSON.stringify({ accessKey: token?.value }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch hymmlist");
  }

  const data = await response.json();
  if (data.statusCode === 200) {
    return data.responseDetails;
  }

  return [];
}

export default async function hymmlistPage() {
  try {
    const hymmlist = await gethymmlist();
    return <HymmListClient hymmlist={hymmlist} />;
  } catch (error) {
    console.error("hymmlist error:", error);
    redirect("/dashboard");
  }
}
