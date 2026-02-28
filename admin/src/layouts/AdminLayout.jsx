import React, { useState } from 'react';
import { Layout, Menu, Input, Select, Badge, Avatar, Dropdown, Space, Button, Breadcrumb } from 'antd';
import {
    DashboardOutlined,
    ShopOutlined,
    MenuOutlined,
    UserOutlined,
    CarOutlined,
    ShoppingCartOutlined,
    TransactionOutlined,
    TagOutlined,
    BarChartOutlined,
    SettingOutlined,
    LogoutOutlined,
    BellOutlined,
    SearchOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    GlobalOutlined,
    SunOutlined,
    MoonOutlined
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
        { key: '/users', icon: <UserOutlined />, label: <Link to="/users">Users</Link> },
        { key: '/partners', icon: <CarOutlined />, label: <Link to="/partners">Delivery Partners</Link> },
        { key: '/orders', icon: <ShoppingCartOutlined />, label: <Link to="/orders">Orders</Link> },
        { key: '/transactions', icon: <TransactionOutlined />, label: <Link to="/transactions">Transactions</Link> },
        { key: '/promotions', icon: <TagOutlined />, label: <Link to="/promotions">Promotions</Link> },
        { key: '/reports', icon: <BarChartOutlined />, label: <Link to="/reports">Reports</Link> },
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
