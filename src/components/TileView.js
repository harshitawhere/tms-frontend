import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import TileModal from './TileModal';

const TileView = ({ shipments = [], role = 'emp', onEdit, onDelete }) => {
  const [selected, setSelected] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <div>
      {shipments.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">No shipments</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shipments.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded shadow relative">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{s.shipmentNumber}</h3>
                  <p className="text-sm text-gray-500">{s.origin} → {s.destination}</p>
                </div>
                <div className="relative">
                  <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === s.id ? null : s.id); }} className="p-2 rounded hover:bg-gray-100">
                    <FaEllipsisV />
                  </button>
                  {openMenuId === s.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                      <button className="block w-full text-left px-3 py-2 hover:bg-gray-50" onClick={() => { if (role === 'admin') { if (typeof onEdit === 'function') onEdit(s); } else alert('Not authorized'); }}>Edit</button>
                      <button className="block w-full text-left px-3 py-2 hover:bg-gray-50" onClick={() => alert('Flag '+s.id)}>Flag</button>
                      <button className="block w-full text-left px-3 py-2 hover:bg-gray-50" onClick={() => { if (role==='admin') { if (typeof onDelete === 'function') onDelete(s.id); } else alert('Not authorized'); }}>Close</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-600">{s.status}</div>
                <div>
                  {role === 'admin' && <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Admin</span>}
                </div>
              </div>

              <button className="absolute inset-0" onClick={() => setSelected(s)} aria-hidden />
            </div>
          ))}
        </div>
      )}

      {selected && <TileModal shipment={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default TileView;
