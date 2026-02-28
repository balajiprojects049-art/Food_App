import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Stores } from './pages/Stores';

// Placeholder Pages
const PlaceholderPage = ({ title }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontSize: '24px', color: '#888' }}>
    {title} Module - Coming Soon
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="stores" element={<Stores />} />
            <Route path="menu" element={<PlaceholderPage title="Menu & Items" />} />
            <Route path="users" element={<PlaceholderPage title="User Management" />} />
            <Route path="partners" element={<PlaceholderPage title="Delivery Partners" />} />
            <Route path="orders" element={<PlaceholderPage title="Orders History" />} />
            <Route path="transactions" element={<PlaceholderPage title="Transactions" />} />
            <Route path="promotions" element={<PlaceholderPage title="Promotions" />} />
            <Route path="reports" element={<PlaceholderPage title="Analytics Reports" />} />
            <Route path="settings" element={<PlaceholderPage title="System Settings" />} />
            <Route path="logout" element={<PlaceholderPage title="Logging Out..." />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
