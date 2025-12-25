import React from 'react';

const HorizontalMenu = () => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex space-x-6 py-3 text-sm">
          <li><a className="text-gray-700 hover:text-blue-600" href="#">Home</a></li>
          <li><a className="text-gray-700 hover:text-blue-600" href="#">Shipments</a></li>
          <li><a className="text-gray-700 hover:text-blue-600" href="#">Analytics</a></li>
          <li><a className="text-gray-700 hover:text-blue-600" href="#">Settings</a></li>
        </ul>
      </div>
    </div>
  );
};

export default HorizontalMenu;
