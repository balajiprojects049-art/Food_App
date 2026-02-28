import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Stores } from './pages/Stores';
import { MenuCategories } from './pages/menu/MenuCategories';
import { Items } from './pages/menu/Items';
import { SubCategories } from './pages/menu/SubCategories';
import { ItemAttributes } from './pages/menu/ItemAttributes';
import { ItemSchedule } from './pages/menu/ItemSchedule';

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
            <Route path="menu/categories" element={<MenuCategories />} />
            <Route path="menu/items" element={<Items />} />
            <Route path="menu/sub-categories" element={<SubCategories />} />
            <Route path="menu/attributes" element={<ItemAttributes />} />
            <Route path="menu/schedule" element={<ItemSchedule />} />
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
