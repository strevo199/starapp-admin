"use client";
// components/Sidebar.tsx
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const pathname = usePathname();
  const params = useParams();
  const [showSideBar, setShowSideBar] = useState(false);
  const currentAppId = (params as { id?: string })?.id;

  // Base links that always appear
  const baseLinks: SidebarLink[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Hymm List",
      href: "/dashboard/hymmlist",
      icon: <AppsIcon />,
    },
  ];

  // Additional links that appear when viewing a specific app
  const appSpecificLinks: SidebarLink[] = currentAppId
    ? [
        {
          name: "Overview",
          href: `/dashboard/hymmlist/${currentAppId}`,
          icon: <OverviewIcon />,
        },
        {
          name: 'Releases',
          href: `/dashboard/hymmlist/${currentAppId}/releases`,
          icon: <ReleasesIcon />,
        },
        {
          name: 'Settings',
          href: `/dashboard/hymmlist/${currentAppId}/settings`,
          icon: <SettingsIcon />,
        },
        {
          name: 'Analytics',
          href: `/dashboard/hymmlist/${currentAppId}/analytics`,
          icon: <AnalyticsIcon />,
        },
      ]
    : [];

  return (
    <div>
      <div
        onClick={() => setShowSideBar(!showSideBar)}
        className="bg-white w-fit p-1 z-50 shadow-2xl  block right-5  absolute rounded-md my-3"
      >
        <img
          className="h-6 text-white"
          src={!showSideBar ? "/list.png" : "/close.png"}
        />
      </div>
      {showSideBar && <div className="w-64 sm:relative z-50 absolute h-full bg-gray-800 text-white p-4">
        <div className="space-y-2">
          {[...baseLinks, ...appSpecificLinks].map((link) => (
            <Link
            onClick={() => setShowSideBar(false)}
              key={link.href}
              href={link.href}
              className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
                pathname === link.href ? "bg-gray-700" : ""
              }`}
            >
              <span className="mr-3">{link.icon}</span>
              
              {link.name}
            </Link>
          ))}
        </div>
      </div>}
    </div>
  );
}

// Example icon components (replace with your actual icons)
function DashboardIcon() {
  return <span>📊</span>;
}
function AppsIcon() {
  return <span>📱</span>;
}
function OverviewIcon() {
  return <span>👁️</span>;
}
function ReleasesIcon() {
  return <span>🔄</span>;
}
function SettingsIcon() {
  return <span>⚙️</span>;
}
function AnalyticsIcon() {
  return <span>📈</span>;
}
