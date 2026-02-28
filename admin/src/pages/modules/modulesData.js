// Shared mock data for Modules section

export const mockModules = [
    { key: '1', name: 'AdvancedReports', description: 'Advanced analytics and reporting for admin dashboard', status: 'Enabled' },
    { key: '2', name: 'CallAndOrder', description: 'Create manual orders over call for new and existing customers', status: 'Enabled' },
    { key: '3', name: 'DeliveryAreaPro', description: 'GeoFence stores by creating polygons using Google Maps', status: 'Enabled' },
    { key: '4', name: 'LiveOrders', description: 'Real-time live order tracking with sound notifications', status: 'Enabled' },
    { key: '5', name: 'OrderSchedule', description: 'Allow orders to be scheduled by customers', status: 'Enabled' },
    { key: '6', name: 'ThermalPrinter', description: 'Connect to a POS Printer and automatically print receipts', status: 'Enabled' },
];

export const mockTimeSlots = [
    { key: '1', id: 1, title: '12.00PM to 12.30PM', adminLabel: 'Noon Slot', startTime: '12:00', endTime: '12:30', lastOrderTime: '12:15', createdAt: '2024-01-10 09:00 AM' },
    { key: '2', id: 2, title: '06.00PM to 07.00PM', adminLabel: 'Evening Slot', startTime: '18:00', endTime: '19:00', lastOrderTime: '18:45', createdAt: '2024-01-10 09:05 AM' },
    { key: '3', id: 3, title: '08.00AM to 10.00AM', adminLabel: 'Morning Slot', startTime: '08:00', endTime: '10:00', lastOrderTime: '09:45', createdAt: '2024-01-10 09:10 AM' },
];

export const mockRadiusSchedules = [
    { key: '1', id: 1, name: 'Standard Schedule', description: 'Default delivery radius schedule', status: 'Active', restaurants: 5, createdAt: '2024-06-01 10:00 AM' },
    { key: '2', id: 2, name: 'Peak Hours', description: 'Reduced radius during peak hours', status: 'Active', restaurants: 3, createdAt: '2024-07-15 02:00 PM' },
    { key: '3', id: 3, name: 'Weekend Extended', description: 'Extended radius on weekends', status: 'Inactive', restaurants: 0, createdAt: '2024-08-01 11:00 AM' },
];

export const mockPayoutSchedules = [
    { key: '1', id: 1, name: 'Daily Payout', description: 'Process payouts daily at 12 AM', status: 'Active', createdAt: '2024-01-01 09:00 AM' },
    { key: '2', id: 2, name: 'Weekly Payout', description: 'Process payouts every Monday', status: 'Active', createdAt: '2024-01-01 09:05 AM' },
    { key: '3', id: 3, name: 'Monthly Payout', description: 'Process payouts on the 1st of every month', status: 'Inactive', createdAt: '2024-01-01 09:10 AM' },
];

export const mockStoreTypes = [
    { key: '1', id: 1, name: 'Restaurants', description: 'Restaurants', storeUI: 'Restaurant', image: null, status: 'Enabled', createdAt: '2 years ago' },
    { key: '2', id: 2, name: 'Meat Stores', description: 'Batter | Meat | Cakes', storeUI: 'Meat', image: null, status: 'Enabled', createdAt: '9 months ago' },
    { key: '3', id: 3, name: 'Grocery', description: 'Grocery & Vegetables', storeUI: 'Grocery', image: null, status: 'Enabled', createdAt: '9 months ago' },
    { key: '4', id: 4, name: 'Pickups', description: 'Pickup & Drop', storeUI: 'Pickups', image: null, status: 'Enabled', createdAt: '9 months ago' },
    { key: '5', id: 5, name: 'Pharmacy', description: 'Medical & Pharmacy', storeUI: 'Grocery', image: null, status: 'Disabled', createdAt: '3 months ago' },
];

export const mockDeliveryLocations = [
    { key: '1', id: 1, name: 'Buchireddypalem', description: 'Main city zone', deliveryCharge: 20, commission: 15, freeDeliveryThreshold: 199 },
    { key: '2', id: 2, name: 'Jonnawada', description: 'Adjacent zone', deliveryCharge: 30, commission: 15, freeDeliveryThreshold: 299 },
    { key: '3', id: 3, name: 'Sangam', description: 'Outer zone', deliveryCharge: 40, commission: 12, freeDeliveryThreshold: 399 },
    { key: '4', id: 4, name: 'Naidupet Road', description: 'Highway zone', deliveryCharge: 35, commission: 12, freeDeliveryThreshold: 349 },
];
