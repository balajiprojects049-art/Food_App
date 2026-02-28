// Shared mock data for Promotions module

export const mockSliders = [
    {
        key: '1', id: 'SL-001', position: 'Primary Position Slider',
        slides: 29, lastModified: '1 week ago', enabled: true,
        images: ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#f5222d', '#13c2c2', '#faad14', '#2f54eb']
    },
    {
        key: '2', id: 'SL-002', position: 'Recommended',
        slides: 14, lastModified: '1 week ago', enabled: true,
        images: ['#389e0d', '#096dd9', '#d46b08', '#531dab', '#cf1322', '#006d75', '#d4380d']
    },
    {
        key: '3', id: 'SL-003', position: 'Get it Quickly',
        slides: 7, lastModified: '1 week ago', enabled: true,
        images: ['#1890ff', '#52c41a', '#fa8c16', '#722ed1']
    },
    {
        key: '4', id: 'SL-004', position: 'Top Pickups for You',
        slides: 4, lastModified: '4 days ago', enabled: false,
        images: ['#cf1322', '#096dd9', '#530099', '#389e0d']
    },
];

export const mockCategories = [
    { key: '1', name: 'Ice Creams', icon: '🍦', enabled: true },
    { key: '2', name: 'Pizza', icon: '🍕', enabled: true },
    { key: '3', name: 'Burger', icon: '🍔', enabled: true },
    { key: '4', name: 'Biryani', icon: '🍚', enabled: true },
    { key: '5', name: 'Chinese', icon: '🍜', enabled: true },
    { key: '6', name: 'South Indian', icon: '🍛', enabled: true },
    { key: '7', name: 'Sweets', icon: '🍬', enabled: true },
    { key: '8', name: 'Juice', icon: '🥤', enabled: false },
    { key: '9', name: 'Meat', icon: '🥩', enabled: true },
    { key: '10', name: 'Cakes', icon: '🎂', enabled: false },
];

export const mockCoupons = [
    { key: '1', name: 'LOYALITY', store: 'Red Box Fast Foods', code: 'REDBOX100', type: 'AMOUNT', discount: 100, status: 'Active', usage: 1, expiryDate: '20-Dec-2025', expiryStatus: 'EXPIRED', minSubtotal: 199, maxDiscount: 'NA' },
    { key: '2', name: 'CRAZYMILK', store: 'Andhra Dairy', code: 'FG1602', type: 'AMOUNT', discount: 10, status: 'Active', usage: 0, expiryDate: '30-Nov-2025', expiryStatus: 'EXPIRED', minSubtotal: 30, maxDiscount: 'NA' },
    { key: '3', name: 'CRAZYMILK', store: 'Andhra Dairy', code: 'FG1601', type: 'AMOUNT', discount: 10, status: 'Active', usage: 0, expiryDate: '30-Nov-2025', expiryStatus: 'EXPIRED', minSubtotal: 30, maxDiscount: 'NA' },
    { key: '4', name: 'Jackpot Biryani', store: 'Hello Habibi', code: 'JACKPOTHABIBI', type: 'AMOUNT', discount: 20, status: 'Active', usage: 1, expiryDate: '21-Nov-2025', expiryStatus: 'EXPIRED', minSubtotal: 99, maxDiscount: 'NA' },
    { key: '5', name: 'GIFT4YOU', store: 'Multiple Stores', code: 'LOVE50', type: 'AMOUNT', discount: 50, status: 'Active', usage: 24, expiryDate: '14-Feb-2026', expiryStatus: 'EXPIRED', minSubtotal: 750, maxDiscount: 'NA' },
    { key: '6', name: 'PONGAL15', store: 'Multiple Stores', code: 'PONGAL15', type: 'AMOUNT', discount: 15, status: 'Active', usage: 349, expiryDate: '16-Jan-2026', expiryStatus: 'EXPIRED', minSubtotal: 300, maxDiscount: 'NA' },
    { key: '7', name: 'Feast', store: 'Jana Family Dhaba', code: 'FIRSTTIME', type: 'PERCENTAGE', discount: 5, status: 'Active', usage: 4, expiryDate: '30-Sep-2025', expiryStatus: 'EXPIRED', minSubtotal: 100, maxDiscount: 100 },
    { key: '8', name: 'PONGAL25', store: 'Multiple Stores', code: 'FEAST25', type: 'AMOUNT', discount: 25, status: 'Active', usage: 117, expiryDate: '16-Jan-2026', expiryStatus: 'EXPIRED', minSubtotal: 500, maxDiscount: 'NA' },
];

export const mockRewards = [
    { key: '1', id: 1, level: 'Gold', name: 'Free Delivery', type: 'Voucher', pointsRequired: 500, value: '₹50', status: 'Active', repeatable: true, startDate: '2026-01-01', endDate: '2026-12-31' },
    { key: '2', id: 2, level: 'Silver', name: '10% Off Coupon', type: 'Coupon', pointsRequired: 200, value: '10%', status: 'Active', repeatable: true, startDate: '2026-01-01', endDate: '2026-12-31' },
    { key: '3', id: 3, level: 'Bronze', name: '₹25 Cashback', type: 'Cashback', pointsRequired: 100, value: '₹25', status: 'Inactive', repeatable: false, startDate: '2025-01-01', endDate: '2025-12-31' },
    { key: '4', id: 4, level: 'Platinum', 'name': 'Free Item', type: 'Free Item', pointsRequired: 1000, value: '₹150', status: 'Active', repeatable: false, startDate: '2026-02-01', endDate: '2026-06-30' },
];

export const mockRewardClaims = [
    { key: '1', id: 101, requestId: 'REQ-88812', user: 'Sk Sana', reward: 'Free Delivery', points: 500, status: 'Pending', submitted: '2026-02-28 10:00 AM', processed: '—' },
    { key: '2', id: 102, requestId: 'REQ-88813', user: 'Harshitha', reward: '10% Off Coupon', points: 200, status: 'Processed', submitted: '2026-02-27 03:45 PM', processed: '2026-02-27 05:00 PM' },
    { key: '3', id: 103, requestId: 'REQ-88814', user: 'Anitha', reward: '₹25 Cashback', points: 100, status: 'Rejected', submitted: '2026-02-27 11:00 AM', processed: '2026-02-27 11:30 AM' },
    { key: '4', id: 104, requestId: 'REQ-88815', user: 'Mohammda', reward: 'Free Item', points: 1000, status: 'Pending', submitted: '2026-02-28 08:30 AM', processed: '—' },
    { key: '5', id: 105, requestId: 'REQ-88816', user: 'Saritha', reward: 'Free Delivery', points: 500, status: 'Processed', submitted: '2026-02-26 02:00 PM', processed: '2026-02-26 03:15 PM' },
];

export const mockPages = [
    { key: '1', id: 1, name: 'Privacy Policy', slug: 'privacy-policy', created: '2024-01-15 10:00 AM', updated: '2025-11-10 03:00 PM' },
    { key: '2', id: 2, name: 'Terms & Conditions', slug: 'terms-and-conditions', created: '2024-01-15 10:05 AM', updated: '2025-11-10 03:05 PM' },
    { key: '3', id: 3, name: 'About Us', slug: 'about-us', created: '2024-02-01 09:00 AM', updated: '2026-01-05 11:00 AM' },
    { key: '4', id: 4, name: 'Refund Policy', slug: 'refund-policy', created: '2024-03-12 11:30 AM', updated: '2025-12-20 02:00 PM' },
    { key: '5', id: 5, name: 'Contact Us', slug: 'contact-us', created: '2024-04-20 08:00 AM', updated: '2026-02-01 09:30 AM' },
];
