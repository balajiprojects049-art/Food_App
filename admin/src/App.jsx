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
import { AllUsers } from './pages/users/AllUsers';
import { Customers, StoreOwners, DeliveryGuys, Staff } from './pages/users/FilteredUsers';
import { RolesPermissions } from './pages/users/RolesPermissions';
import { AllOrders, CancelledOrders, RefundRequests, DisputedOrders, CODOrders, HighValueOrders, FraudFlaggedOrders, ScheduledOrders } from './pages/orders/AllOrders';
import { LiveOrders } from './pages/orders/LiveOrders';

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
            <Route path="users/all" element={<AllUsers />} />
            <Route path="users/customers" element={<Customers />} />
            <Route path="users/store-owners" element={<StoreOwners />} />
            <Route path="users/delivery" element={<DeliveryGuys />} />
            <Route path="users/staff" element={<Staff />} />
            <Route path="users/roles" element={<RolesPermissions />} />
            <Route path="partners" element={<PlaceholderPage title="Delivery Partners" />} />
            <Route path="orders" element={<PlaceholderPage title="Orders History" />} />
            <Route path="orders/all" element={<AllOrders />} />
            <Route path="orders/live" element={<LiveOrders />} />
            <Route path="orders/scheduled" element={<ScheduledOrders />} />
            <Route path="orders/cancelled" element={<CancelledOrders />} />
            <Route path="orders/refunds" element={<RefundRequests />} />
            <Route path="orders/disputed" element={<DisputedOrders />} />
            <Route path="orders/cod" element={<CODOrders />} />
            <Route path="orders/high-value" element={<HighValueOrders />} />
            <Route path="orders/fraud" element={<FraudFlaggedOrders />} />
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
