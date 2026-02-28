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
import { StorePayouts } from './pages/transactions/StorePayouts';
import { DeliveryCollections, DeliveryCollectionLogs } from './pages/transactions/DeliveryCollections';
import { WalletTransactions } from './pages/transactions/WalletTransactions';
import { Reports } from './pages/transactions/Reports';
import { PromoSliders, StoreCategorySlider } from './pages/promotions/PromoSliders';
import { Coupons, Rewards, RewardClaims } from './pages/promotions/Coupons';
import { Pages, SendNotifications } from './pages/promotions/PagesAndNotifications';
import { ModulesPage, StoreTypes } from './pages/modules/ModulesPage';
import { PickupDropSettings, DeliveryTimeSlots, DeliveryRadiusSchedules, PayoutSchedules } from './pages/modules/Schedules';
import { Utilities, CustomDeliverySettings } from './pages/modules/UtilitiesAndDelivery';
import { DeliveryGuyReport, StoreWiseReport, MostSoldItemsReport } from './pages/reports/ReportsPages';

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
            <Route path="transactions/payouts" element={<StorePayouts />} />
            <Route path="transactions/collections" element={<DeliveryCollections />} />
            <Route path="transactions/logs" element={<DeliveryCollectionLogs />} />
            <Route path="transactions/wallet" element={<WalletTransactions />} />
            <Route path="transactions/reports" element={<Reports />} />
            <Route path="promotions/sliders" element={<PromoSliders />} />
            <Route path="promotions/category-slider" element={<StoreCategorySlider />} />
            <Route path="promotions/coupons" element={<Coupons />} />
            <Route path="promotions/rewards" element={<Rewards />} />
            <Route path="promotions/reward-claims" element={<RewardClaims />} />
            <Route path="promotions/pages" element={<Pages />} />
            <Route path="promotions/notifications" element={<SendNotifications />} />
            <Route path="modules/list" element={<ModulesPage />} />
            <Route path="modules/pickup-drop" element={<PickupDropSettings />} />
            <Route path="modules/time-slots" element={<DeliveryTimeSlots />} />
            <Route path="modules/radius-schedules" element={<DeliveryRadiusSchedules />} />
            <Route path="modules/payout-schedules" element={<PayoutSchedules />} />
            <Route path="modules/store-types" element={<StoreTypes />} />
            <Route path="modules/utilities" element={<Utilities />} />
            <Route path="modules/delivery-settings" element={<CustomDeliverySettings />} />
            <Route path="reports/delivery-guys" element={<DeliveryGuyReport />} />
            <Route path="reports/store-wise" element={<StoreWiseReport />} />
            <Route path="reports/most-sold" element={<MostSoldItemsReport />} />
            <Route path="settings" element={<PlaceholderPage title="System Settings" />} />
            <Route path="logout" element={<PlaceholderPage title="Logging Out..." />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
