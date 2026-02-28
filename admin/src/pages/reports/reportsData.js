// Shared mock data for Reports module

export const mockDeliveryReports = [
    { key: '1', user: 'Manoj Kumar', distance: '45.2 km', deliveryCount: 18, orderValue: 4250, cod: 1200, chargeFromCustomer: 360, tipFromCustomer: 80, deliveryCharge: 360, deliveryTip: 80, totalEarnings: 1680, date: '28-02-2026' },
    { key: '2', user: 'Prasad SV', distance: '38.7 km', deliveryCount: 14, orderValue: 3100, cod: 800, chargeFromCustomer: 280, tipFromCustomer: 40, deliveryCharge: 280, deliveryTip: 40, totalEarnings: 1160, date: '28-02-2026' },
    { key: '3', user: 'Srikanth', distance: '52.4 km', deliveryCount: 21, orderValue: 5800, cod: 2100, chargeFromCustomer: 420, tipFromCustomer: 100, deliveryCharge: 420, deliveryTip: 100, totalEarnings: 2080, date: '28-02-2026' },
    { key: '4', user: 'Rambabu', distance: '29.1 km', deliveryCount: 10, orderValue: 1900, cod: 500, chargeFromCustomer: 200, tipFromCustomer: 20, deliveryCharge: 200, deliveryTip: 20, totalEarnings: 740, date: '28-02-2026' },
    { key: '5', user: 'Venkatesh', distance: '61.0 km', deliveryCount: 24, orderValue: 6400, cod: 2800, chargeFromCustomer: 480, tipFromCustomer: 120, deliveryCharge: 480, deliveryTip: 120, totalEarnings: 2360, date: '28-02-2026' },
];

export const mockStoreWiseOrders = [
    { key: '1', date: '28-02-2026', orderId: 'OD-02-28-RZTD-895252', zone: 'Buchireddypalem', storeName: 'Cool & Spicy', customerName: 'Aravind Kumar', customerPhone: '+918500855952', deliveryGuy: 'Manoj', orderType: 'Delivery', deliveryType: 'Instant Delivery', distance: '2.4 km' },
    { key: '2', date: '28-02-2026', orderId: 'OD-02-28-MLRS-106473', zone: 'Buchireddypalem', storeName: 'Rever', customerName: 'Farooq', customerPhone: '+919666383832', deliveryGuy: 'Prasad SV', orderType: 'Delivery', deliveryType: 'Instant Delivery', distance: '3.1 km' },
    { key: '3', date: '28-02-2026', orderId: 'OD-02-28-3GBP-836073', zone: 'Buchireddypalem', storeName: 'Middle Class Fast Foods', customerName: 'Sangeetha', customerPhone: '+918106897344', deliveryGuy: 'Manoj', orderType: 'Delivery', deliveryType: 'Instant Delivery', distance: '1.8 km' },
    { key: '4', date: '28-02-2026', orderId: 'OD-02-28-DPQP-178445', zone: 'Buchireddypalem', storeName: 'Middle Class Fast Foods', customerName: 'Sreedhar', customerPhone: '+918977659981', deliveryGuy: 'Manoj', orderType: 'Delivery', deliveryType: 'Instant Delivery', distance: '2.1 km' },
    { key: '5', date: '28-02-2026', orderId: 'OD-02-28-WCCZ-120392', zone: 'Buchireddypalem', storeName: 'Koli HUT FIVE STAR', customerName: 'Gunji Sarita', customerPhone: '+917036089939', deliveryGuy: 'Prasad SV', orderType: 'Delivery', deliveryType: 'Instant Delivery', distance: '4.2 km' },
    { key: '6', date: '28-02-2026', orderId: 'OD-02-28-ABCD-123456', zone: 'Buchireddypalem', storeName: 'Buchi Biryani', customerName: 'Ramesh Kumar', customerPhone: '+919876543210', deliveryGuy: 'Srikanth', orderType: 'Self Pickup', deliveryType: 'Scheduled', distance: '0.0 km' },
    { key: '7', date: '28-02-2026', orderId: 'OD-02-28-WXYZ-789012', zone: 'Jonnawada', storeName: 'Star Biryani', customerName: 'Anitha', customerPhone: '+918765432109', deliveryGuy: 'Rambabu', orderType: 'Delivery', deliveryType: 'Instant Delivery', distance: '5.3 km' },
    { key: '8', date: '28-02-2026', orderId: 'OD-02-28-PQRS-345678', zone: 'Jonnawada', storeName: 'Andhra Dairy', customerName: 'Mohana', customerPhone: '+917654321098', deliveryGuy: 'Venkatesh', orderType: 'Delivery', deliveryType: 'Instant Delivery', distance: '3.7 km' },
];

export const mockTopItems = [
    { key: '1', rank: 1, itemName: 'Roti - 1', salesCount: 4036, netAmount: 28252, color: '#13c2c2' },
    { key: '2', rank: 2, itemName: 'Roti (1pc)', salesCount: 2822, netAmount: 16932, color: '#1890ff' },
    { key: '3', rank: 3, itemName: 'Roti', salesCount: 1085, netAmount: 7595, color: '#722ed1' },
    { key: '4', rank: 4, itemName: 'Roti', salesCount: 1001, netAmount: 6006, color: '#eb2f96' },
    { key: '5', rank: 5, itemName: 'Punga Roti -1', salesCount: 944, netAmount: 8496, color: '#52c41a' },
    { key: '6', rank: 6, itemName: 'Roti', salesCount: 929, netAmount: 7432, color: '#1677ff' },
    { key: '7', rank: 7, itemName: 'Ponga Roti (1 pc)', salesCount: 747, netAmount: 5976, color: '#2f54eb' },
    { key: '8', rank: 8, itemName: 'Chapati', salesCount: 698, netAmount: 4188, color: '#fa8c16' },
    { key: '9', rank: 9, itemName: 'Pulka', salesCount: 612, netAmount: 3672, color: '#a0d911' },
    { key: '10', rank: 10, itemName: 'Punga Roti', salesCount: 554, netAmount: 3324, color: '#faad14' },
];
