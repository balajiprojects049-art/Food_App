// Shared mock data for Transactions & Financial module

export const mockPayouts = [
    { key: '1', id: 'PAY-001', store: 'Star Biryani', gross: 4200, commission: 630, tax: 75, platform: 42, delivery: 180, refunds: 0, net: 3273, status: 'Pending', mode: '—', txnId: '—', msg: '—', createdAt: '2026-02-28 02:51 PM' },
    { key: '2', id: 'PAY-002', store: 'Sri Sai Ice-Cream & Juices', gross: 8200, commission: 1230, tax: 147, platform: 82, delivery: 350, refunds: 120, net: 6271, status: 'Pending', mode: '—', txnId: '—', msg: '—', createdAt: '2026-02-28 12:18 PM' },
    { key: '3', id: 'PAY-003', store: 'Feasti-Mart', gross: 28400, commission: 4260, tax: 510, platform: 284, delivery: 820, refunds: 0, net: 22526, status: 'Pending', mode: '—', txnId: '—', msg: '—', createdAt: '2026-02-28 09:54 AM' },
    { key: '4', id: 'PAY-004', store: 'Sendriya Chenuku Rasam', gross: 3100, commission: 465, tax: 55, platform: 31, delivery: 120, refunds: 0, net: 2429, status: 'Pending', mode: '—', txnId: '—', msg: '—', createdAt: '2026-02-28 09:42 AM' },
    { key: '5', id: 'PAY-005', store: 'Hotel Chinna', gross: 18900, commission: 2835, tax: 340, platform: 189, delivery: 560, refunds: 200, net: 14776, status: 'Pending', mode: '—', txnId: '—', msg: '—', createdAt: '2026-02-28 08:00 AM' },
    { key: '6', id: 'PAY-006', store: 'New Venkataramana Hot Foods', gross: 1100, commission: 165, tax: 19, platform: 11, delivery: 60, refunds: 0, net: 845, status: 'Pending', mode: '—', txnId: '—', msg: '—', createdAt: '2026-02-28 03:00 AM' },
    { key: '7', id: 'PAY-007', store: 'Pizza Box', gross: 14800, commission: 2220, tax: 266, platform: 148, delivery: 480, refunds: 0, net: 11686, status: 'Pending', mode: '—', txnId: '—', msg: '—', createdAt: '2026-02-28 12:22 AM' },
    { key: '8', id: 'PAY-008', store: 'Original Gareeb Biryani', gross: 870, commission: 130, tax: 15, platform: 8, delivery: 40, refunds: 0, net: 677, status: 'Pending', mode: '—', txnId: '—', msg: '—', createdAt: '2026-02-27 02:48 PM' },
    { key: '9', id: 'PAY-009', store: 'Budget Biryani', gross: 1500, commission: 225, tax: 27, platform: 15, delivery: 80, refunds: 0, net: 1153, status: 'Completed', mode: 'Hand Cash', txnId: 'Hand Cash', msg: 'Paid through hand cash', createdAt: '2026-02-27 12:25 PM' },
    { key: '10', id: 'PAY-010', store: 'Buchi Biryani Point', gross: 32000, commission: 4800, tax: 576, platform: 320, delivery: 980, refunds: 450, net: 24874, status: 'Completed', mode: 'Bank Transfer', txnId: 'TXN-8842199', msg: 'Settled via NEFT', createdAt: '2026-02-26 11:00 AM' },
    { key: '11', id: 'PAY-011', store: 'Apsara Badam Milk', gross: 5600, commission: 840, tax: 100, platform: 56, delivery: 210, refunds: 0, net: 4394, status: 'Failed', mode: 'UPI', txnId: 'UPI-FAIL-441', msg: 'Beneficiary account error', createdAt: '2026-02-26 09:20 AM' },
];

export const mockDeliveryCollections = [
    { key: '1', id: 'DC-001', name: 'Mallikarjun', phone: '+919100858196', cashInHand: 4846.35, totalCollected: 12400, pendingCollection: 4846.35, lastSettled: '2026-02-27 08:30 PM' },
    { key: '2', id: 'DC-002', name: 'Narayana', phone: '+919518141340', cashInHand: 1211.30, totalCollected: 8200, pendingCollection: 1211.30, lastSettled: '2026-02-27 07:45 PM' },
    { key: '3', id: 'DC-003', name: 'Manoj', phone: '6300797264', cashInHand: 2622.80, totalCollected: 6500, pendingCollection: 2622.80, lastSettled: '2026-02-27 06:00 PM' },
    { key: '4', id: 'DC-004', name: 'Naveen', phone: '+919030042198', cashInHand: 0, totalCollected: 4100, pendingCollection: 0, lastSettled: '2026-02-28 10:00 AM' },
    { key: '5', id: 'DC-005', name: 'Nitish 2', phone: '+919391615610', cashInHand: 0, totalCollected: 2800, pendingCollection: 0, lastSettled: '2026-02-28 09:00 AM' },
    { key: '6', id: 'DC-006', name: 'Sonu', phone: '+916364004780', cashInHand: 0, totalCollected: 1900, pendingCollection: 0, lastSettled: '2026-02-28 08:30 AM' },
    { key: '7', id: 'DC-007', name: 'Shaik Thoheer', phone: '+918184812135', cashInHand: 0, totalCollected: 3200, pendingCollection: 0, lastSettled: '2026-02-28 08:00 AM' },
    { key: '8', id: 'DC-008', name: 'Shaik Aslom', phone: '+917466979790', cashInHand: 0, totalCollected: 1600, pendingCollection: 0, lastSettled: '2026-02-27 11:30 PM' },
];

export const mockCollectionLogs = [
    { key: '1', name: 'Nivas', phone: '+919347341902', amount: 1267, mode: 'Hand Cash', msg: 'Paid through hand cash', collectedBy: 'Admin', date: '2026-02-27 08:34 PM', status: 'Completed' },
    { key: '2', name: 'Nivas', phone: '+919347341902', amount: 299, mode: 'PhonePe', msg: 'PhonePe collected', collectedBy: 'Admin', date: '2026-02-27 08:30 PM', status: 'Completed' },
    { key: '3', name: 'Nivas', phone: '+919347341902', amount: 103, mode: 'Hand Cash', msg: 'Paid through hand cash', collectedBy: 'Admin', date: '2026-02-27 08:29 PM', status: 'Completed' },
    { key: '4', name: 'Nivas', phone: '+919347341902', amount: 47, mode: 'Wallet', msg: 'Deducted from wallet', collectedBy: 'Admin', date: '2026-02-27 08:24 PM', status: 'Completed' },
    { key: '5', name: 'Nithin', phone: '+919440734083', amount: 700, mode: 'Hand Cash', msg: 'Paid through hand cash', collectedBy: 'Admin', date: '2026-02-27 08:03 PM', status: 'Completed' },
    { key: '6', name: 'Nithin', phone: '+919440734083', amount: 130, mode: 'Wallet', msg: 'Deducted from wallet', collectedBy: 'Admin', date: '2026-02-27 08:02 PM', status: 'Completed' },
    { key: '7', name: 'Prasad SV', phone: '+919110584485', amount: 118, mode: 'PhonePe', msg: 'PhonePe collected', collectedBy: 'Admin', date: '2026-02-27 07:59 PM', status: 'Completed' },
    { key: '8', name: 'Prasad SV', phone: '+919110584485', amount: 1148, mode: 'Wallet', msg: 'Deducted from wallet', collectedBy: 'Admin', date: '2026-02-27 07:58 PM', status: 'Reversed' },
    { key: '9', name: 'Prasad SV', phone: '+919110584485', amount: 236, mode: 'Wallet', msg: 'Deducted from wallet', collectedBy: 'Admin', date: '2026-02-27 07:46 PM', status: 'Completed' },
    { key: '10', name: 'Babu', phone: '+917386267302', amount: 3681, mode: 'PhonePe', msg: 'PhonePe collected', collectedBy: 'Admin', date: '2026-02-27 10:31 AM', status: 'Completed' },
];

export const mockWalletTxns = [
    { key: '1', txnId: '5c53b09c-7da8-4c9b-9d60-e24afd176fc8', user: 'Sk Sana', role: 'Customer', type: 'Deposit', amount: 0, desc: 'Delivery Tip: OD-02-28-XFYT-368560', orderId: 'OD-1001', date: '12 minutes ago', status: 'Completed' },
    { key: '2', txnId: '2b3274c5-4d76-4375-8776-32f189a3a3d', user: 'Venkat', role: 'Delivery', type: 'Deposit', amount: 15, desc: 'Commission for OD-02-28-XFYT-368560', orderId: 'OD-1001', date: '12 minutes ago', status: 'Completed' },
    { key: '3', txnId: 'c460b23a-d20b-4b66-b3e4-5ba4af539fa9', user: 'Harshitha', role: 'Customer', type: 'Deposit', amount: 0, desc: 'Delivery Tip: OD-02-28-4CPW-152274', orderId: 'OD-1002', date: '26 minutes ago', status: 'Completed' },
    { key: '4', txnId: '3e3e2764-83bf-4d88-98bd-d1a6617ddd6a', user: 'Ramu', role: 'Delivery', type: 'Deposit', amount: 15, desc: 'Commission for OD-02-28-4CPW-152274', orderId: 'OD-1002', date: '26 minutes ago', status: 'Completed' },
    { key: '5', txnId: 'd686d0a8-ec38-422d-accb-3cc6f22813e7', user: 'Anitha', role: 'Customer', type: 'Deposit', amount: 0, desc: 'Delivery Tip: OD-02-28-YC3K-687435', orderId: 'OD-1003', date: '27 minutes ago', status: 'Completed' },
    { key: '6', txnId: 'b096491a-217b-4ba9-9a55-6e2de492090f', user: 'Gopal', role: 'Delivery', type: 'Deposit', amount: 15, desc: 'Commission for OD-02-28-YC3K-687435', orderId: 'OD-1003', date: '27 minutes ago', status: 'Completed' },
    { key: '7', txnId: 'f4d397cd-7725-4261-b189-9b8a18e41c2b', user: 'Mohammda', role: 'Customer', type: 'Refund', amount: 0, desc: 'Delivery Tip: OD-02-28-MF2W-760413', orderId: 'OD-1004', date: '29 minutes ago', status: 'Completed' },
    { key: '8', txnId: 'a6686a44-a7b9-4932-a2dc-1c754709a5ca', user: 'Saritha', role: 'Customer', type: 'Deposit', amount: 29, desc: 'Commission for OD-02-28-MF2W-760413', orderId: 'OD-1004', date: '29 minutes ago', status: 'Completed' },
    { key: '9', txnId: 'acc8a9d0-64cb-496f-8030-e832e3b02750', user: 'Vijaya', role: 'Customer', type: 'Withdrawal', amount: 0, desc: 'Delivery Tip: OD-02-28-XOX3-861825', orderId: 'OD-1005', date: '35 minutes ago', status: 'Completed' },
    { key: '10', txnId: '111311d5-59fe-4da8-9f0e-455cf9ea7b5a', user: 'Babu', role: 'Customer', type: 'Deposit', amount: 15, desc: 'Commission for OD-02-28-XOX3-861825', orderId: 'OD-1005', date: '35 minutes ago', status: 'Completed' },
    { key: '11', txnId: 'a41fd337-84e6-4988-bdbc-b8028bb3c189', user: 'Varsha', role: 'Customer', type: 'Penalty', amount: 0, desc: 'Delivery Tip: OD-02-28-JDY6-498303', orderId: 'OD-1006', date: '40 minutes ago', status: 'Completed' },
];

export const mockTopItems = [
    { key: '1', name: 'Roti - 1', count: 4035, revenue: 20252, store: 'Hotel Chinna' },
    { key: '2', name: 'Roti (1pc)', count: 2022, revenue: 16932, store: 'Hotel Chinna' },
    { key: '3', name: 'Roti', count: 1085, revenue: 7595, store: 'Multiple' },
    { key: '4', name: 'Roti', count: 1001, revenue: 8005, store: 'Reddy Meals' },
    { key: '5', name: 'Punga Roti -1', count: 944, revenue: 8496, store: 'Sendriya' },
    { key: '6', name: 'Roti', count: 929, revenue: 7432, store: 'New Venkataramana' },
    { key: '7', name: 'Ponga Roti (1pc)', count: 747, revenue: 5975, store: 'Sendriya' },
    { key: '8', name: 'Punga Roti', count: 599, revenue: 6990, store: 'Sendriya' },
    { key: '9', name: 'Pulka', count: 467, revenue: 4670, store: 'Budget Biryani' },
    { key: '10', name: 'Chapati', count: 443, revenue: 19935, store: 'Multiple' },
];
