import React, { useState } from 'react';
import { Layout, Menu, Input, Select, Badge, Avatar, Dropdown, Space, Button, Breadcrumb } from 'antd';
import {
    DashboardOutlined, ShopOutlined, MenuOutlined, UserOutlined,
    ShoppingCartOutlined, TransactionOutlined, TagOutlined, BarChartOutlined,
    SettingOutlined, LogoutOutlined, BellOutlined, SearchOutlined,
    MenuUnfoldOutlined, MenuFoldOutlined, GlobalOutlined, SunOutlined, MoonOutlined,
    TeamOutlined, SafetyOutlined, UserSwitchOutlined, AppstoreOutlined
} from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const location = useLocation();

    const menuItems = [
        { key: '/', icon: <DashboardOutlined />, label: <Link to="/">Dashboard</Link> },
        { key: '/stores', icon: <ShopOutlined />, label: <Link to="/stores">Stores</Link> },
        {
            key: 'sub-menu',
            icon: <MenuOutlined />,
            label: 'Items & Menu',
            children: [
                { key: '/menu/categories', label: <Link to="/menu/categories">Menu Categories</Link> },
                { key: '/menu/items', label: <Link to="/menu/items">Items</Link> },
                { key: '/menu/sub-categories', label: <Link to="/menu/sub-categories">Sub Categories</Link> },
                { key: '/menu/attributes', label: <Link to="/menu/attributes">Item Attributes</Link> },
                { key: '/menu/schedule', label: <Link to="/menu/schedule">Item Schedule</Link> },
            ]
        },
        {
            key: 'sub-users',
            icon: <UserOutlined />,
            label: 'Users',
            children: [
                { key: '/users/all', label: <Link to="/users/all">All Users</Link> },
                { key: '/users/customers', label: <Link to="/users/customers">Customers</Link> },
                { key: '/users/store-owners', label: <Link to="/users/store-owners">Store Owners</Link> },
                { key: '/users/delivery', label: <Link to="/users/delivery">Delivery Guys</Link> },
                { key: '/users/staff', label: <Link to="/users/staff">Staff</Link> },
                { key: '/users/roles', label: <Link to="/users/roles">Roles & Permissions</Link> },
            ]
        },
        {
            key: 'sub-orders',
            icon: <ShoppingCartOutlined />,
            label: 'Orders',
            children: [
                { key: '/orders/all', label: <Link to="/orders/all">All Orders</Link> },
                { key: '/orders/live', label: <Link to="/orders/live">Live Orders</Link> },
                { key: '/orders/scheduled', label: <Link to="/orders/scheduled">Scheduled</Link> },
                { key: '/orders/cancelled', label: <Link to="/orders/cancelled">Cancelled</Link> },
                { key: '/orders/refunds', label: <Link to="/orders/refunds">Refund Requests</Link> },
                { key: '/orders/disputed', label: <Link to="/orders/disputed">Disputed</Link> },
                { key: '/orders/cod', label: <Link to="/orders/cod">COD Orders</Link> },
                { key: '/orders/high-value', label: <Link to="/orders/high-value">High Value</Link> },
                { key: '/orders/fraud', label: <Link to="/orders/fraud">Fraud Flagged</Link> },
            ]
        },
        {
            key: 'sub-transactions',
            icon: <TransactionOutlined />,
            label: 'Transactions',
            children: [
                { key: '/transactions/payouts', label: <Link to="/transactions/payouts">Store Payouts</Link> },
                { key: '/transactions/collections', label: <Link to="/transactions/collections">Delivery Collections</Link> },
                { key: '/transactions/logs', label: <Link to="/transactions/logs">Collection Logs</Link> },
                { key: '/transactions/wallet', label: <Link to="/transactions/wallet">Wallet Transactions</Link> },
                { key: '/transactions/reports', label: <Link to="/transactions/reports">Reports</Link> },
            ]
        },
        {
            key: 'sub-promotions',
            icon: <TagOutlined />,
            label: 'Promotions',
            children: [
                { key: '/promotions/sliders', label: <Link to="/promotions/sliders">Promo Sliders</Link> },
                { key: '/promotions/category-slider', label: <Link to="/promotions/category-slider">Store Category Slider</Link> },
                { key: '/promotions/coupons', label: <Link to="/promotions/coupons">Coupons</Link> },
                { key: '/promotions/rewards', label: <Link to="/promotions/rewards">Rewards</Link> },
                { key: '/promotions/reward-claims', label: <Link to="/promotions/reward-claims">Reward Claims</Link> },
                { key: '/promotions/pages', label: <Link to="/promotions/pages">Pages</Link> },
                { key: '/promotions/notifications', label: <Link to="/promotions/notifications">Send Push Notifications</Link> },
            ]
        },
        { key: '/reports', icon: <BarChartOutlined />, label: <Link to="/reports">Reports</Link> },
        {
            key: 'sub-modules',
            icon: <AppstoreOutlined />,
            label: 'Modules',
            children: [
                { key: '/modules/list', label: <Link to="/modules/list">Modules</Link> },
                { key: '/modules/pickup-drop', label: <Link to="/modules/pickup-drop">Pickup &amp; Drop Settings</Link> },
                { key: '/modules/time-slots', label: <Link to="/modules/time-slots">Delivery Time Slots</Link> },
                { key: '/modules/radius-schedules', label: <Link to="/modules/radius-schedules">Delivery Radius Schedules</Link> },
                { key: '/modules/payout-schedules', label: <Link to="/modules/payout-schedules">Payout Schedules</Link> },
                { key: '/modules/store-types', label: <Link to="/modules/store-types">Store Types</Link> },
                { key: '/modules/utilities', label: <Link to="/modules/utilities">Utilities</Link> },
                { key: '/modules/delivery-settings', label: <Link to="/modules/delivery-settings">Custom Delivery Settings</Link> },
            ]
        },
        { key: '/settings', icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> },
        { type: 'divider' },
        { key: '/logout', icon: <LogoutOutlined />, label: 'Logout', danger: true },
    ];

    const breadcrumbs = [
        { title: 'Home' },
        { title: location.pathname === '/' ? 'Dashboard' : location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.slice(2) }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme={isDarkMode ? 'dark' : 'light'}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    boxShadow: isDarkMode ? 'none' : '2px 0 8px 0 rgba(29,35,41,.05)',
                    zIndex: 10
                }}
            >
                <div style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {collapsed ? (
                        <div style={{ fontWeight: 'bold', fontSize: 24, color: '#1890ff' }}>F</div>
                    ) : (
                        <div style={{ fontWeight: 'bold', fontSize: 24, letterSpacing: 1, color: isDarkMode ? '#fff' : '#000' }}>
                            <span style={{ color: '#1890ff' }}>Food</span>Admin
                        </div>
                    )}
                </div>
                <Menu
                    theme={isDarkMode ? 'dark' : 'light'}
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    style={{ borderRight: 0 }}
                />
            </Sider>

            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
                <Header
                    style={{
                        padding: '0 24px',
                        background: isDarkMode ? '#141414' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'sticky',
                        top: 0,
                        zIndex: 9,
                        width: '100%',
                        boxShadow: isDarkMode ? '0 1px 2px 0 rgba(0,0,0,.15)' : '0 1px 4px 0 rgba(0,21,41,.08)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                            style: { fontSize: '18px', cursor: 'pointer', color: isDarkMode ? '#fff' : '#000' }
                        })}
                        <Breadcrumb items={breadcrumbs} style={{ display: 'flex', alignItems: 'center', margin: 0 }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Input
                            placeholder="Search anything..."
                            prefix={<SearchOutlined />}
                            style={{ width: 250, borderRadius: 20, background: isDarkMode ? '#1f1f1f' : '#f5f5f5', border: 'none' }}
                        />

                        <Select
                            defaultValue="zone-1"
                            style={{ width: 120 }}
                            bordered={false}
                            suffixIcon={<GlobalOutlined />}
                            options={[
                                { value: 'zone-1', label: 'Buchi Town' },
                                { value: 'zone-2', label: 'Jonnawada' },
                                { value: 'zone-3', label: 'Sangam' },
                            ]}
                        />

                        <Button type="text" onClick={toggleTheme} icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} />

                        <Badge count={5} size="small">
                            <Button type="text" icon={<BellOutlined style={{ fontSize: '18px' }} />} />
                        </Badge>

                        <Dropdown
                            menu={{
                                items: [
                                    { key: '1', label: 'My Profile' },
                                    { key: '2', label: 'Settings' },
                                    { type: 'divider' },
                                    { key: '3', label: 'Logout' }
                                ]
                            }}
                            placement="bottomRight"
                        >
                            <Space style={{ cursor: 'pointer', paddingLeft: '8px' }}>
                                <Avatar src="https://i.pravatar.cc/150?img=11" />
                                <span style={{ color: isDarkMode ? '#fff' : '#000', fontWeight: 500 }}>Admin User</span>
                            </Space>
                        </Dropdown>
                    </div>
                </Header>

                <Content style={{ margin: '24px', overflow: 'initial' }}>
                    <Outlet />
                </Content>

            </Layout>
        </Layout>
    );
};
