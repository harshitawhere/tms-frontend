import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HorizontalMenu from './components/HorizontalMenu';
import GridView from './components/GridView';
import TileView from './components/TileView';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_SHIPMENTS, ADD_SHIPMENT, UPDATE_SHIPMENT, DELETE_SHIPMENT } from './graphql/operations';
import LoginModal from './components/LoginModal';
import EditShipmentModal from './components/EditShipmentModal';

const AUTH_HEADERS = {
  emp: 'Basic ZW1wOmVtcA==',
  admin: 'Basic YWRtaW46YWRtaW4='
};

export default function App() {
  const [view, setView] = useState('grid');
  const [role, setRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [editing, setEditing] = useState(null);

  // Apollo queries/mutations (skipped until login to ensure auth header is present)
  const { data, refetch } = useQuery(GET_SHIPMENTS, { skip: true });
  const [addShipmentMut] = useMutation(ADD_SHIPMENT);
  const [updateShipmentMut] = useMutation(UPDATE_SHIPMENT);
  const [deleteShipmentMut] = useMutation(DELETE_SHIPMENT);

  // login handler receives username/password and a callback(err)
  const loginAs = (username, password, cb) => {
    const encoded = typeof window !== 'undefined' ? btoa(`${username}:${password}`) : '';
    const header = `Basic ${encoded}`;
    if (encoded === AUTH_HEADERS.emp.replace('Basic ', '')) {
      localStorage.setItem('authHeader', header);
      setRole('emp');
      setShowLogin(false);
      // fetch first page
      refetch({ page: 0, size: 100 }).then((res) => { if (res?.data?.shipments?.data) setShipments(res.data.shipments.data); }).catch(()=>{});
      cb && cb(null);
      return;
    }
    if (encoded === AUTH_HEADERS.admin.replace('Basic ', '')) {
      localStorage.setItem('authHeader', header);
      setRole('admin');
      setShowLogin(false);
      refetch({ page: 0, size: 100 }).then((res) => { if (res?.data?.shipments?.data) setShipments(res.data.shipments.data); }).catch(()=>{});
      cb && cb(null);
      return;
    }
    cb && cb('Invalid username or password');
  };

  useEffect(() => {
    // on mount, check stored auth
    const token = typeof window !== 'undefined' ? localStorage.getItem('authHeader') : null;
    if (token) {
      if (token === AUTH_HEADERS.emp) {
        setRole('emp');
        refetch({ page: 0, size: 100 }).then((res) => { if (res?.data?.shipments?.data) setShipments(res.data.shipments.data); }).catch(()=>{});
      } else if (token === AUTH_HEADERS.admin) {
        setRole('admin');
        refetch({ page: 0, size: 100 }).then((res) => { if (res?.data?.shipments?.data) setShipments(res.data.shipments.data); }).catch(()=>{});
      } else {
        // invalid token stored
        localStorage.removeItem('authHeader');
        setShowLogin(true);
      }
    } else {
      setShowLogin(true);
    }
  }, [refetch]);

  const handleLogout = () => {
    localStorage.removeItem('authHeader');
    setRole(null);
    setShipments([]);
    setShowLogin(true);
  };

  const handleAddShipment = async (newShipment) => {
    try {
      const weightVal = parseFloat(newShipment.weight);
      const variables = {
        inputShipmentNumber: newShipment.shipmentNumber,
        origin: newShipment.origin,
        destination: newShipment.destination,
        status: newShipment.status,
        carrier: newShipment.carrier,
        weight: Number.isFinite(weightVal) ? weightVal : 0.0,
      };
      const res = await addShipmentMut({ variables });
      if (res?.data?.addShipment) {
        const created = { id: res.data.addShipment.id, ...newShipment, assignedEmployee: 'emp' };
        setShipments((prev) => [created, ...prev]);
      } else {
        setShipments((prev) => [{ ...newShipment, id: prev.length + 1, assignedEmployee: 'emp' }, ...prev]);
      }
    } catch (e) {
      setShipments((prev) => [{ ...newShipment, id: prev.length + 1, assignedEmployee: 'emp' }, ...prev]);
    }
  };

  const handleUpdateShipment = async (updated) => {
    try {
      const variables = { id: updated.id, status: updated.status, carrier: updated.carrier };
      const res = await updateShipmentMut({ variables });
      if (res?.data?.updateShipment) {
        setShipments((prev) => prev.map((s) => (s.id === updated.id ? { ...s, ...res.data.updateShipment } : s)));
      } else {
        setShipments((prev) => prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s)));
      }
    } catch (e) {
      setShipments((prev) => prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s)));
    }
    setEditing(null);
  };

  const handleDeleteShipment = async (id) => {
    if (role !== 'admin') {
      alert('Not authorized');
      return;
    }

    try {
      await deleteShipmentMut({ variables: { id } });
      setShipments((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('deleteShipment failed, falling back to local remove', err);
      setShipments((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const visibleShipments = useMemo(() => {
    if (role === 'emp') {
      // backend may not supply `assignedEmployee`; if missing, show the shipment to employees
      return shipments.filter((s) => {
        if (s.assignedEmployee === undefined || s.assignedEmployee === null) return true;
        return s.assignedEmployee === 'emp' || s.assignedEmployee === 'all';
      });
    }
    return shipments;
  }, [role, shipments]);

  useEffect(() => {
    if (data && data.shipments && data.shipments.data) setShipments(data.shipments.data);
  }, [data]);
  // If not logged in, show the login page only
  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoginModal onClose={() => {}} onLogin={loginAs} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} role={role} shipments={shipments} />
      <div className="flex-1 flex flex-col">
        <Header
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          view={view}
          setView={setView}
          setShowLogin={setShowLogin}
          role={role}
          onLogout={handleLogout}
        />
        <HorizontalMenu />
        <main className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Shipments POC</h1>
            <div className="text-sm text-gray-600">Role: <span className="font-medium">{role ?? 'not logged in'}</span></div>
          </div>

          {role === 'admin' && (
            <div className="mb-4">
              <button onClick={() => setEditing({})} className="px-4 py-2 bg-blue-600 text-white rounded">Add Shipment</button>
            </div>
          )}

          {view === 'grid' ? (
            <GridView shipments={visibleShipments} role={role} onEdit={(s) => setEditing(s)} onDelete={handleDeleteShipment} />
          ) : (
            <TileView shipments={visibleShipments} role={role} onEdit={(s) => setEditing(s)} onDelete={handleDeleteShipment} />
          )}
        </main>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={loginAs} />}
      {editing !== null && <EditShipmentModal shipment={editing} onClose={() => setEditing(null)} onSave={(s) => { if (!s.id) handleAddShipment(s); else handleUpdateShipment(s); }} role={role} />}
    </div>
  );
}
