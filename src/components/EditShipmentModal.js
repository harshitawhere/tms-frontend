import React, { useState, useEffect } from 'react';

const blank = {
  shipmentNumber: '',
  origin: '',
  destination: '',
  status: '',
  carrier: '',
  weight: '',
  eta: '',
  priority: '',
  notes: '',
  assignedEmployee: 'all'
};

const EditShipmentModal = ({ shipment, onClose, onSave, role }) => {
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (shipment && shipment.id) setForm(shipment);
    else setForm(blank);
  }, [shipment]);

  const handleChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white rounded shadow-lg w-full max-w-2xl p-6 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{form.id ? 'Edit Shipment' : 'Add Shipment'}</h3>
          <button onClick={onClose} className="px-3 py-1 bg-gray-100 rounded">Close</button>
        </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <input value={form.shipmentNumber} onChange={handleChange('shipmentNumber')} placeholder="Shipment #" className="p-2 border rounded" />
            <input value={form.origin} onChange={handleChange('origin')} placeholder="Origin" className="p-2 border rounded" />
            <input value={form.destination} onChange={handleChange('destination')} placeholder="Destination" className="p-2 border rounded" />
            <input value={form.status} onChange={handleChange('status')} placeholder="Status" className="p-2 border rounded" />
            <input value={form.carrier} onChange={handleChange('carrier')} placeholder="Carrier" className="p-2 border rounded" />
            <input value={form.weight} onChange={handleChange('weight')} placeholder="Weight" type="number" step="any" className="p-2 border rounded" />
          <input value={form.eta} onChange={handleChange('eta')} placeholder="ETA" className="p-2 border rounded" />
          <input value={form.priority} onChange={handleChange('priority')} placeholder="Priority" className="p-2 border rounded" />
          <select value={form.assignedEmployee} onChange={handleChange('assignedEmployee')} className="p-2 border rounded">
            <option value="all">All</option>
            <option value="emp">Employee</option>
          </select>
          <input value={form.notes} onChange={handleChange('notes')} placeholder="Notes" className="p-2 border rounded" />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={() => onSave(form)} disabled={role !== 'admin'} className={`px-4 py-2 rounded ${role === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{form.id ? 'Save' : 'Add'}</button>
        </div>
      </div>
    </div>
  );
};

export default EditShipmentModal;
