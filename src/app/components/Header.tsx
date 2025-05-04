// components/Header.jsx
export default function Header() {


    return (
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Page Title</h2>
          <div className="flex items-center space-x-4">
            {/* User profile, notifications, etc. */}
            <button>Profile</button>
          </div>
        </div>
      </header>
    );
  }