import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar';

export default async function DashboardLayout({children}:{
  children: React.ReactNode;
}) {
    const cookieStore = await cookies(); // ✅ Await it!
    const token = cookieStore.get('authToken');    

  if (!token) {
    redirect('/'); // not logged in
  }
  

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Header/> */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
