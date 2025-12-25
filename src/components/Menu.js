import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Menu = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', subMenu: [] },
    { name: 'Shipments', subMenu: ['All Shipments', 'Pending'] },
    { name: 'Reports', subMenu: [] }
  ];

  return (
    <div className="bg-gray-800 text-white w-64">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">TMS</h1>
        <FaBars className="cursor-pointer" onClick={() => setOpen(!open)} />
      </div>
      <ul>
        {menuItems.map((item, idx) => (
          <li key={idx} className="p-2 hover:bg-gray-700">
            {item.name}
            {item.subMenu.length > 0 && open && (
              <ul className="pl-4">
                {item.subMenu.map((sub, i) => (
                  <li key={i} className="p-1 hover:bg-gray-600">{sub}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
