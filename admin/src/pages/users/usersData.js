// Shared mock data & utilities for the Users module

export const ROLE_META = {
    Customer: { color: '#1890ff', bg: '#e6f4ff', border: '#91caff', label: 'Customer' },
    'Store Owner': { color: '#722ed1', bg: '#f9f0ff', border: '#d3adf7', label: 'Store Owner' },
    'Delivery Guy': { color: '#fa8c16', bg: '#fff7e6', border: '#ffd591', label: 'Delivery Guy' },
    Staff: { color: '#13c2c2', bg: '#e6fffb', border: '#87e8de', label: 'Staff' },
    Admin: { color: '#f5222d', bg: '#fff1f0', border: '#ffa39e', label: 'Admin' },
};

export const STATUS_META = {
    Active: { color: '#389e0d', bg: '#f6ffed', border: '#b7eb8f' },
    Suspended: { color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
    Blocked: { color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
    Pending: { color: '#096dd9', bg: '#e6f4ff', border: '#91caff' },
};

export const mockUsers = [
    { key: '1', id: 1, name: 'Sk Sana', email: '8303380966@gmail.com', phone: '+918303380966', role: 'Customer', wallet: 0, orders: 5, ltv: 2340, rating: null, status: 'Active', verified: true, zone: 'Buchi Town', createdAt: '2025-02-28 01:14 PM', lastLogin: '2025-02-28 01:14 PM', image: 'https://i.pravatar.cc/40?img=1' },
    { key: '2', id: 2, name: 'Harshitha', email: '7595902940@gmail.com', phone: '+917595902940', role: 'Customer', wallet: 0, orders: 3, ltv: 940, rating: null, status: 'Active', verified: true, zone: 'Buchi Town', createdAt: '2025-02-28 12:59 PM', lastLogin: '2025-02-28 12:59 PM', image: 'https://i.pravatar.cc/40?img=2' },
    { key: '3', id: 3, name: 'Anitha', email: '7730085486@gmail.com', phone: '+917730085486', role: 'Customer', wallet: 50, orders: 8, ltv: 3200, rating: null, status: 'Active', verified: true, zone: 'Jonnawada', createdAt: '2025-02-28 12:21 PM', lastLogin: '2025-02-28 12:21 PM', image: 'https://i.pravatar.cc/40?img=3' },
    { key: '4', id: 4, name: 'Mohammda', email: '6307174198@gmail.com', phone: '+916307174198', role: 'Customer', wallet: 0, orders: 2, ltv: 560, rating: null, status: 'Active', verified: false, zone: 'Buchi Town', createdAt: '2025-02-28 10:05 PM', lastLogin: '2025-02-28 10:05 PM', image: 'https://i.pravatar.cc/40?img=4' },
    { key: '5', id: 5, name: 'Saritha', email: '9042946415@gmail.com', phone: '+919042946415', role: 'Customer', wallet: 100, orders: 12, ltv: 5600, rating: null, status: 'Suspended', verified: true, zone: 'Sangam', createdAt: '2025-02-28 11:11 AM', lastLogin: '2025-02-27 09:00 AM', image: 'https://i.pravatar.cc/40?img=5' },
    { key: '6', id: 6, name: 'Shaik Rakhib', email: '6304559322@gmail.com', phone: '+916304559322', role: 'Customer', wallet: 0, orders: 1, ltv: 120, rating: null, status: 'Active', verified: true, zone: 'Jonnawada', createdAt: '2025-02-28 10:59 AM', lastLogin: '2025-02-28 10:59 AM', image: 'https://i.pravatar.cc/40?img=6' },
    { key: '7', id: 7, name: 'Venkat', email: '9539162642@gmail.com', phone: '+919539162642', role: 'Delivery Guy', wallet: 450, orders: 89, ltv: 0, rating: 4.6, status: 'Active', verified: true, zone: 'Buchi Town', createdAt: '2025-01-15 09:00 AM', lastLogin: '2025-02-28 08:00 AM', image: 'https://i.pravatar.cc/40?img=7' },
    { key: '8', id: 8, name: 'Vijaya', email: '8142108824@gmail.com', phone: '+918142108824', role: 'Store Owner', wallet: 2000, orders: 0, ltv: 45000, rating: 4.2, status: 'Active', verified: true, zone: 'Buchi Town', createdAt: '2025-01-10 10:00 AM', lastLogin: '2025-02-28 07:30 AM', image: 'https://i.pravatar.cc/40?img=8' },
    { key: '9', id: 9, name: 'Babu', email: '6309723174@gmail.com', phone: '+916309723174', role: 'Customer', wallet: 75, orders: 6, ltv: 1800, rating: null, status: 'Active', verified: true, zone: 'Sangam', createdAt: '2025-02-27 10:08 PM', lastLogin: '2025-02-27 10:08 PM', image: 'https://i.pravatar.cc/40?img=9' },
    { key: '10', id: 10, name: 'Varsha', email: '9014737069@gmail.com', phone: '+919014737069', role: 'Customer', wallet: 0, orders: 4, ltv: 980, rating: null, status: 'Pending', verified: false, zone: 'Jonnawada', createdAt: '2025-02-27 09:02 PM', lastLogin: '2025-02-27 09:02 PM', image: 'https://i.pravatar.cc/40?img=10' },
    { key: '11', id: 11, name: 'Ravi Kumar', email: 'ravi@buchi.in', phone: '+919876543210', role: 'Staff', wallet: 0, orders: 0, ltv: 0, rating: null, status: 'Active', verified: true, zone: 'Buchi Town', createdAt: '2025-01-01 09:00 AM', lastLogin: '2025-02-28 09:00 AM', image: 'https://i.pravatar.cc/40?img=11' },
    { key: '12', id: 12, name: 'Admin User', email: 'admin@foodapp.in', phone: '+910000000000', role: 'Admin', wallet: 0, orders: 0, ltv: 0, rating: null, status: 'Active', verified: true, zone: 'All Zones', createdAt: '2024-12-01 09:00 AM', lastLogin: '2025-02-28 10:00 AM', image: 'https://i.pravatar.cc/40?img=12' },
];

export const mockRoles = [
    { key: '1', id: 1, name: 'Super Admin', color: '#f5222d', usersCount: 1, permissions: ['all'], sessionTime: 120, ipWhitelist: ['0.0.0.0'] },
    { key: '2', id: 2, name: 'Admin', color: '#fa541c', usersCount: 2, permissions: ['users', 'stores', 'orders', 'menu', 'reports'], sessionTime: 60, ipWhitelist: [] },
    { key: '3', id: 3, name: 'Operations Admin', color: '#fa8c16', usersCount: 1, permissions: ['stores', 'orders', 'menu'], sessionTime: 60, ipWhitelist: [] },
    { key: '4', id: 4, name: 'Finance Admin', color: '#52c41a', usersCount: 1, permissions: ['transactions', 'reports'], sessionTime: 60, ipWhitelist: [] },
    { key: '5', id: 5, name: 'Support Staff', color: '#13c2c2', usersCount: 3, permissions: ['users', 'orders'], sessionTime: 30, ipWhitelist: [] },
    { key: '6', id: 6, name: 'Store Owner', color: '#722ed1', usersCount: 8, permissions: ['menu', 'orders'], sessionTime: 480, ipWhitelist: [] },
    { key: '7', id: 7, name: 'Delivery Partner', color: '#1890ff', usersCount: 15, permissions: ['orders'], sessionTime: 720, ipWhitelist: [] },
    { key: '8', id: 8, name: 'Customer', color: '#595959', usersCount: 142, permissions: ['self'], sessionTime: 1440, ipWhitelist: [] },
];

export const ALL_MODULES = ['Dashboard', 'Stores', 'Menu', 'Items', 'Users', 'Orders', 'Transactions', 'Promotions', 'Reports', 'Settings'];
