
export default async function UsersTable({bundle}:any) {
  const res = await fetch(`https:// /api/bundle/analytics/${bundle.id}`, { cache: 'no-store' });
  const data = await res.json();
  const users = data.data || [];    

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">S/N</th>
              <th className="border px-4 py-2">deviceId</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">reason</th>
              <th className="border px-4 py-2">event</th>
              <th className="border px-4 py-2">createdAt</th>
              <th className="border px-4 py-2">updatedAt</th>
              <th className="border px-4 py-2">action</th>
            </tr>
          </thead>
          <tbody>
            { users.map((user:any, index: number) => (
              <tr key={user.id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.deviceId}</td>
                <td className="border px-4 py-2">{user.bundleUploadStatus}</td>
                <td className="border px-4 py-2">{user.reason}</td>
                <td className="border px-4 py-2">{user.event}</td>
                <td className="border px-4 py-2">{user.createdAt}</td>
                <td className="border px-4 py-2">{user.updatedAt}</td>
                <td className="border px-4 py-2">action</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
