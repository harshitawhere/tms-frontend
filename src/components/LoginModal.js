import React, { useState } from 'react';

const LoginModal = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setError(null);
    onLogin(username.trim(), password, (err) => {
      if (err) setError(err);
      else {
        setUsername('');
        setPassword('');
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <form onSubmit={submit} className="bg-white rounded shadow-lg w-full max-w-sm p-6 z-10">
        <h3 className="text-lg font-semibold mb-4">Login</h3>
        <div className="flex flex-col gap-3">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border px-3 py-2 rounded" autoFocus />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="border px-3 py-2 rounded" />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border rounded">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
