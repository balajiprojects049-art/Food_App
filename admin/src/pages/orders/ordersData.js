// Shared data & constants for Orders module

export const ORDER_STATUS_META = {
    Placed: { color: '#096dd9', bg: '#e6f4ff', border: '#91caff', label: 'Placed' },
    Accepted: { color: '#389e0d', bg: '#f6ffed', border: '#b7eb8f', label: 'Accepted' },
    Preparing: { color: '#d46b08', bg: '#fff7e6', border: '#ffd591', label: 'Preparing' },
    Ready: { color: '#08979c', bg: '#e6fffb', border: '#87e8de', label: 'Ready' },
    'Out for Delivery': { color: '#531dab', bg: '#f9f0ff', border: '#d3adf7', label: 'Out for Delivery' },
    Delivered: { color: '#237804', bg: '#f6ffed', border: '#73d13d', label: 'Delivered' },
    Cancelled: { color: '#cf1322', bg: '#fff1f0', border: '#ffa39e', label: 'Cancelled' },
    Rejected: { color: '#820014', bg: '#fff1f0', border: '#ff7875', label: 'Rejected' },
    Refunded: { color: '#006d75', bg: '#e6fffb', border: '#5cdbd3', label: 'Refunded' },
    Disputed: { color: '#820014', bg: '#fff0f6', border: '#ffadd2', label: 'Disputed' },
    Failed: { color: '#595959', bg: '#f5f5f5', border: '#d9d9d9', label: 'Failed' },
};

export const PAYMENT_STATUS_META = {
    Paid: { color: '#237804', bg: '#f6ffed', border: '#73d13d' },
    Pending: { color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
    Failed: { color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
    Refunded: { color: '#006d75', bg: '#e6fffb', border: '#5cdbd3' },
};

export const mockOrders = [
    { key: '1', id: 'ORD-1001', customer: 'Sk Sana', phone: '+918303380966', store: 'Buchi Biryani Point', partner: 'Venkat', amount: 320, deliveryFee: 30, tax: 25, commission: 42, payMode: 'Online', payStatus: 'Paid', status: 'Delivered', type: 'Instant', placedAt: '2025-02-28 01:14 PM', eta: '01:40 PM', zone: 'Buchi Town', fraud: false, cod: false, scheduled: false, items: 3 },
    { key: '2', id: 'ORD-1002', customer: 'Harshitha', phone: '+917595902940', store: 'Apsara Badam Milk', partner: 'Ramu', amount: 180, deliveryFee: 20, tax: 14, commission: 23, payMode: 'COD', payStatus: 'Pending', status: 'Out for Delivery', type: 'Instant', placedAt: '2025-02-28 12:59 PM', eta: '01:25 PM', zone: 'Buchi Town', fraud: false, cod: true, scheduled: false, items: 2 },
    { key: '3', id: 'ORD-1003', customer: 'Anitha', phone: '+917730085486', store: 'Reddy Meals', partner: 'Gopal', amount: 540, deliveryFee: 40, tax: 43, commission: 70, payMode: 'Wallet', payStatus: 'Paid', status: 'Preparing', type: 'Instant', placedAt: '2025-02-28 12:21 PM', eta: '12:55 PM', zone: 'Jonnawada', fraud: false, cod: false, scheduled: false, items: 4 },
    { key: '4', id: 'ORD-1004', customer: 'Mohammda', phone: '+916307174198', store: 'Cool & Spicy', partner: '—', amount: 95, deliveryFee: 15, tax: 7, commission: 12, payMode: 'Online', payStatus: 'Paid', status: 'Placed', type: 'Instant', placedAt: '2025-02-28 10:05 PM', eta: '10:35 PM', zone: 'Buchi Town', fraud: false, cod: false, scheduled: false, items: 1 },
    { key: '5', id: 'ORD-1005', customer: 'Saritha', phone: '+919042946415', store: 'Buchi Biryani Point', partner: 'Venkat', amount: 780, deliveryFee: 50, tax: 62, commission: 101, payMode: 'Online', payStatus: 'Refunded', status: 'Refunded', type: 'Instant', placedAt: '2025-02-28 11:11 AM', eta: '11:50 AM', zone: 'Sangam', fraud: false, cod: false, scheduled: false, items: 5 },
    { key: '6', id: 'ORD-1006', customer: 'Shaik Rakhib', phone: '+916304559322', store: 'Sri Sai Ice-Cream', partner: 'Krishna', amount: 120, deliveryFee: 20, tax: 9, commission: 15, payMode: 'COD', payStatus: 'Paid', status: 'Delivered', type: 'Instant', placedAt: '2025-02-28 10:59 AM', eta: '11:25 AM', zone: 'Jonnawada', fraud: false, cod: true, scheduled: false, items: 2 },
    { key: '7', id: 'ORD-1007', customer: 'Venkat', phone: '+919539162642', store: 'Lassi shop', partner: '—', amount: 65, deliveryFee: 10, tax: 5, commission: 8, payMode: 'Wallet', payStatus: 'Failed', status: 'Failed', type: 'Instant', placedAt: '2025-02-28 09:45 AM', eta: '10:10 AM', zone: 'Buchi Town', fraud: false, cod: false, scheduled: false, items: 1 },
    { key: '8', id: 'ORD-1008', customer: 'Vijaya', phone: '+918142108824', store: 'Buchi Biryani Point', partner: 'Gopal', amount: 1200, deliveryFee: 60, tax: 96, commission: 156, payMode: 'Online', payStatus: 'Paid', status: 'Accepted', type: 'Scheduled', placedAt: '2025-02-28 08:30 AM', eta: '01:00 PM', zone: 'Buchi Town', fraud: true, cod: false, scheduled: true, items: 6 },
    { key: '9', id: 'ORD-1009', customer: 'Babu', phone: '+916309723174', store: 'Reddy Meals', partner: 'Ramu', amount: 430, deliveryFee: 35, tax: 34, commission: 56, payMode: 'COD', payStatus: 'Pending', status: 'Preparing', type: 'Instant', placedAt: '2025-02-27 10:08 PM', eta: '10:45 PM', zone: 'Sangam', fraud: false, cod: true, scheduled: false, items: 3 },
    { key: '10', id: 'ORD-1010', customer: 'Varsha', phone: '+919014737069', store: 'Apsara Badam Milk', partner: 'Krishna', amount: 250, deliveryFee: 25, tax: 20, commission: 32, payMode: 'Online', payStatus: 'Paid', status: 'Cancelled', type: 'Instant', placedAt: '2025-02-27 09:02 PM', eta: '09:30 PM', zone: 'Jonnawada', fraud: false, cod: false, scheduled: false, items: 2 },
    { key: '11', id: 'ORD-1011', customer: 'Ravi Kumar', phone: '+919876543210', store: 'Cool & Spicy', partner: 'Venkat', amount: 2500, deliveryFee: 80, tax: 200, commission: 325, payMode: 'Online', payStatus: 'Paid', status: 'Delivered', type: 'Instant', placedAt: '2025-02-27 07:00 PM', eta: '07:45 PM', zone: 'Buchi Town', fraud: true, cod: false, scheduled: false, items: 8 },
    { key: '12', id: 'ORD-1012', customer: 'Anitha', phone: '+917730085486', store: 'Buchi Biryani Point', partner: '—', amount: 360, deliveryFee: 30, tax: 28, commission: 46, payMode: 'Wallet', payStatus: 'Paid', status: 'Disputed', type: 'Instant', placedAt: '2025-02-27 06:15 PM', eta: '06:50 PM', zone: 'Jonnawada', fraud: false, cod: false, scheduled: false, items: 3 },
];

export const ORDER_STATUS_FLOW = [
    'Placed', 'Accepted', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered'
];
