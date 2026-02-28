/**
 * Filtered user list pages — each wraps AllUsers logic
 * but pre-filters by role. Keeps code DRY.
 */
import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Avatar,
    Badge, message, Dropdown, Select
} from 'antd';
import {
    SearchOutlined, PlusOutlined, DownloadOutlined,
    PoweroffOutlined, MoreOutlined, DeleteOutlined, EditOutlined,
    WalletOutlined, CheckCircleOutlined, ShopOutlined, CarOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockUsers, ROLE_META, STATUS_META } from './usersData';

const { Option } = Select;

const { Text } = Typography;

const RoleBadge = ({ role }) => {
    const m = ROLE_META[role] || { color: '#595959', bg: '#f0f0f0', border: '#d9d9d9' };
    return <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 4, fontWeight: 600, fontSize: 11 }}>{role}</Tag>;
};
const StatusBadge = ({ status }) => {
    const m = STATUS_META[status] || { color: '#595959', bg: '#f0f0f0', border: '#d9d9d9' };
    return <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 3, fontWeight: 600, fontSize: 11 }}>{status}</Tag>;
};

const FilteredUserPage = ({ roleFilter, title, icon, extraColumns = [] }) => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockUsers.filter(u => u.role === roleFilter));
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const handleToggle = id => {
        setData(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
        message.success('Status updated');
    };

    const handleLoginAs = (record) => {
        message.loading({ content: `Logging in as ${record.name}…`, key: 'login' });
        setTimeout(() => message.success({ content: `Impersonating ${record.name} — audit logged`, key: 'login', duration: 3 }), 1200);
    };

    const filtered = data.filter(u =>
        !searchText || [u.name, u.email, u.phone, String(u.id)].some(s => s.toLowerCase().includes(searchText.toLowerCase()))
    );

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const baseColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 55, sorter: (a, b) => a.id - b.id },
        {
            title: 'Name', key: 'name',
            render: (_, r) => (
                <Space>
                    <Avatar src={r.image} size={32} />
                    <Space direction="vertical" size={0}>
                        <Text style={{ color: '#1890ff', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}>{r.name}</Text>
                        {r.verified && <Text style={{ fontSize: 10, color: '#52c41a', whiteSpace: 'nowrap' }}><CheckCircleOutlined /> Verified</Text>}
                    </Space>
                </Space>
            )
        },
        { title: 'Email', dataIndex: 'email', key: 'email', render: t => <Text style={{ color: '#1890ff', fontSize: 13, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', render: t => <Text style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Role', dataIndex: 'role', key: 'role', render: role => <RoleBadge role={role} /> },
        { title: 'Wallet (₹)', dataIndex: 'wallet', key: 'wallet', render: v => <Text style={{ whiteSpace: 'nowrap' }}>₹{v?.toFixed(2)}</Text> },
        ...extraColumns,
        { title: 'Zone', dataIndex: 'zone', key: 'zone', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Created Date', dataIndex: 'createdAt', key: 'createdAt', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Status', dataIndex: 'status', key: 'status', width: 100,
            render: s => <StatusBadge status={s} />
        },
        {
            title: '', key: 'actions', width: 170, fixed: 'right',
            render: (_, record) => (
                <Space size={4}>
                    <Button size="small"
                        style={{ background: isDarkMode ? '#1f1f1f' : '#f0f0f0', borderColor: isDarkMode ? '#434343' : '#d9d9d9', color: isDarkMode ? '#d9d9d9' : '#595959', borderRadius: 4, fontWeight: 600, fontSize: 12 }}
                        onClick={() => handleLoginAs(record)}>Login</Button>
                    <Button size="small"
                        style={{ background: '#1890ff', borderColor: '#1890ff', color: '#fff', borderRadius: 4, fontWeight: 600, fontSize: 12 }}>View</Button>
                    <Dropdown trigger={['click']} menu={{
                        items: [
                            { key: '1', label: 'Edit User', icon: <EditOutlined /> },
                            { key: '2', label: record.status === 'Active' ? 'Suspend' : 'Activate', icon: <PoweroffOutlined />, onClick: () => handleToggle(record.id) },
                            { key: '3', label: 'Wallet Adjustment', icon: <WalletOutlined /> },
                            { type: 'divider' },
                            { key: '4', label: 'Delete', icon: <DeleteOutlined />, danger: true, onClick: () => { setData(prev => prev.filter(u => u.id !== record.id)); message.success('Deleted.'); } },
                        ]
                    }}>
                        <Button size="small" icon={<MoreOutlined />} style={{ borderRadius: 4 }} />
                    </Dropdown>
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</Text>
                    <Badge count={filtered.length} style={{ backgroundColor: '#1890ff' }} />
                </Space>
                <Space wrap size={8}>
                    <Button type="primary" icon={<PlusOutlined />}>Add {title.split(' ')[0]}</Button>
                    <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
                </Space>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '14px 20px', borderBottom: borderStyle }}>
                    <Input
                        placeholder={`Search ${title.toLowerCase()}...`}
                        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 280, border: 'none', background: isDarkMode ? '#1f1f1f' : '#f5f5f5', borderRadius: 6 }}
                        value={searchText} onChange={e => setSearchText(e.target.value)} allowClear
                    />
                </div>
                {selectedRowKeys.length > 0 && (
                    <div style={{ padding: '10px 20px', background: '#e6f4ff', borderBottom: borderStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ color: '#0958d9' }}>{selectedRowKeys.length} selected</Text>
                        <Space>
                            <Button size="small" type="primary" ghost onClick={() => setData(prev => prev.map(u => selectedRowKeys.includes(u.id) ? { ...u, status: 'Active' } : u))}>Activate</Button>
                            <Button size="small" danger onClick={() => setData(prev => prev.map(u => selectedRowKeys.includes(u.id) ? { ...u, status: 'Suspended' } : u))}>Suspend</Button>
                            <Button size="small" danger onClick={() => setData(prev => prev.filter(u => !selectedRowKeys.includes(u.id)))}>Delete</Button>
                        </Space>
                    </div>
                )}
                <div style={{ padding: '0 20px 20px' }}>
                    <Table rowSelection={{ selectedRowKeys, onChange: keys => setSelectedRowKeys(keys) }}
                        columns={baseColumns} dataSource={filtered}
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                        scroll={{ x: 'max-content' }} rowHoverable size="middle"
                    />
                </div>
            </Card>
        </div>
    );
};

export const Customers = () => (
    <FilteredUserPage roleFilter="Customer" title="Customers" icon={<TeamOutlined />}
        extraColumns={[{ title: 'Orders', dataIndex: 'orders', key: 'orders', render: v => <Text style={{ color: '#1890ff' }}>{v}</Text> }]}
    />
);

export const StoreOwners = () => (
    <FilteredUserPage roleFilter="Store Owner" title="Store Owners" icon={<ShopOutlined />}
        extraColumns={[{ title: 'LTV (₹)', dataIndex: 'ltv', key: 'ltv', render: v => <Text style={{ color: '#52c41a', fontWeight: 500 }}>₹{v?.toLocaleString()}</Text> }]}
    />
);

export const DeliveryGuys = () => (
    <FilteredUserPage roleFilter="Delivery Guy" title="Delivery Guys" icon={<CarOutlined />}
        extraColumns={[
            { title: 'Rating', dataIndex: 'rating', key: 'rating', render: v => v ? <Text style={{ color: '#faad14' }}>⭐ {v}</Text> : '—' },
            { title: 'Deliveries', dataIndex: 'orders', key: 'orders', render: v => <Text style={{ color: '#1890ff' }}>{v}</Text> },
        ]}
    />
);

export const Staff = () => (
    <FilteredUserPage roleFilter="Staff" title="Staff Members" icon={<TeamOutlined />} />
);
