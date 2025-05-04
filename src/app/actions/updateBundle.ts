'use server'

// import { cookies } from "next/headers";

export async function updateBundleDetail(payload:any) {
    // const cookieStore = await cookies(); // ✅ Await it!
    // const token = cookieStore.get("authToken");

  // if (!token) {
  //   throw new Error("No auth token found");
  // }

  const url = `https://startapp-be.onrender.com/hymms/update_hymm`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text(); // Get the actual error response
    console.error("Update failed with status:", res.status);
    console.error("Error response:", text);
    throw new Error("Failed to update bundle: " + text);
  }

  return res.json();
}
