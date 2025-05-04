// app/dashboard/hymmlist/[id]/releases/page.tsx
export default function AppReleasesPage({
    params,
  }: {
    params: { id: string };
  }) {
    console.log('params',params);
    
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">App Releases</h1>
        {/* Releases content */}
      </div>
    );
  }