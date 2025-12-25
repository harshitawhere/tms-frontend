import React from 'react';

const GridView = ({ shipments = [], role = 'emp', onEdit, onDelete }) => {
  // Ensure 10 columns for demonstration
  const columns = ['ID','Shipment #','Origin','Destination','Status','Carrier','Weight','ETA','Priority','Notes'];

  return (
    <div className="bg-white border rounded shadow overflow-auto">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="text-lg font-medium">Shipments Grid</div>
        <div className="text-sm text-gray-600">Showing {shipments.length} rows</div>
      </div>
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{c}</th>
            ))}
            {role === 'admin' && <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {shipments.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (role === 'admin' ? 1 : 0)} className="px-4 py-6 text-center text-gray-500">No shipments</td>
            </tr>
          ) : (
            shipments.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-4 py-3">{s.id}</td>
                <td className="px-4 py-3">{s.shipmentNumber}</td>
                <td className="px-4 py-3">{s.origin}</td>
                <td className="px-4 py-3">{s.destination}</td>
                <td className="px-4 py-3">{s.status}</td>
                <td className="px-4 py-3">{s.carrier}</td>
                <td className="px-4 py-3">{s.weight}</td>
                <td className="px-4 py-3">{s.eta}</td>
                <td className="px-4 py-3">{s.priority}</td>
                <td className="px-4 py-3">{s.notes}</td>
                {role === 'admin' && (
                  <td className="px-4 py-3">
                    <button onClick={() => onEdit && onEdit(s)} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
                    <button onClick={() => onDelete && onDelete(s.id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GridView;
