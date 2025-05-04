// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import featureList from "./featureList";
import Card from "../components/Card";

export default async function Page() {
  // const cookieStore = await cookies(); // ✅ Await it!
  // const token = cookieStore.get("authToken");

  // if (!token) {
  //   redirect("/"); // not logged in
  // }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome! You are authenticated.</p>
      <div className="gap-5 mt-10 flex-wrap flex flex-1 ">
        {featureList.map((item) => (
          <Card key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
