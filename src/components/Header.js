import React from 'react';
import { FiMenu, FiGrid, FiList } from 'react-icons/fi';

const Header = ({ onToggleSidebar, view, setView, setShowLogin, role, onLogout }) => {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-3 bg-white shadow">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="p-2 rounded hover:bg-gray-100">
          <FiMenu size={20} />
        </button>
        <div className="text-lg font-semibold">TMS POC</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded">
          <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-white shadow' : ''}`}><FiGrid/></button>
          <button onClick={() => setView('tile')} className={`p-2 ${view === 'tile' ? 'bg-white shadow' : ''}`}><FiList/></button>
        </div>
        <div className="flex items-center gap-2">
          {!role ? (
            <button onClick={() => setShowLogin(true)} className="px-3 py-1 bg-gray-100 rounded">Login</button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600">{role}</div>
              <button onClick={onLogout} className="px-3 py-1 bg-red-100 text-red-700 rounded">Logout</button>
            </div>
          )}
        </div>
        {/* authHeader intentionally not shown to avoid leaking credentials */}
      </div>
    </header>
  );
};

export default Header;
