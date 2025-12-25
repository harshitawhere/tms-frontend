import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Sidebar = ({ open, onClose, role, shipments = [] }) => {
  const carriers = Array.from(new Set(shipments.map((s) => s.carrier))).filter(Boolean);
  return (
    <aside className={`bg-white border-r w-64 p-4 hidden md:block` + (open ? ' block' : '')}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Menu</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <button className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-50">
              Dashboard <FiChevronDown />
            </button>
          </li>
          <li>
            <div className="text-sm text-gray-500 px-2">Shipments</div>
            <ul className="pl-4">
              <li>
                <a className="block p-2 rounded hover:bg-gray-50" href="#">All Shipments</a>
              </li>
              <li>
                <a className="block p-2 rounded hover:bg-gray-50" href="#">My Shipments</a>
              </li>
            </ul>
          </li>
          <li>
            <div className="text-sm text-gray-500 px-2">Carriers</div>
            <ul className="pl-4">
              {carriers.map((c) => (
                <li key={c} className="text-sm text-gray-700 p-1">{c}</li>
              ))}
            </ul>
          </li>
          {role === 'admin' && (
            <li>
              <a className="block p-2 rounded hover:bg-gray-50" href="#">Admin Panel</a>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
