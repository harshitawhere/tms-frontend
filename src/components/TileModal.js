import React from 'react';

const TileModal = ({ shipment, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white rounded shadow-lg max-w-2xl w-full mx-4 z-10 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{shipment.shipmentNumber}</h2>
            <p className="text-sm text-gray-500">{shipment.origin} → {shipment.destination}</p>
          </div>
          <div>
            <button onClick={onClose} className="px-3 py-1 bg-gray-100 rounded">Close</button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Status</div>
            <div className="font-medium">{shipment.status}</div>
          </div>
          <div>
            <div className="text-gray-500">Carrier</div>
            <div className="font-medium">{shipment.carrier}</div>
          </div>
          <div>
            <div className="text-gray-500">Weight</div>
            <div className="font-medium">{shipment.weight}</div>
          </div>
          <div>
            <div className="text-gray-500">ETA</div>
            <div className="font-medium">{shipment.eta}</div>
          </div>
          <div className="col-span-2">
            <div className="text-gray-500">Notes</div>
            <div className="font-medium">{shipment.notes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TileModal;
