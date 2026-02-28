import React, { useState, useCallback } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Avatar, Tooltip,
    Modal, Form, Select, Row, Col, Upload, InputNumber, Switch, Tabs,
    Dropdown, Badge, Drawer, message, Statistic, Divider
} from 'antd';
import {
    PlusOutlined, UploadOutlined, DownloadOutlined, ReloadOutlined,
    SearchOutlined, UserOutlined, DeleteOutlined, EyeOutlined,
    PoweroffOutlined, ExclamationCircleOutlined, LoginOutlined,
    FilterOutlined, SafetyOutlined, InboxOutlined, EditOutlined,
    WalletOutlined, HistoryOutlined, LockOutlined, CheckCircleOutlined,
    MenuOutlined, TeamOutlined, MoreOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockUsers, ROLE_META, STATUS_META } from './usersData';

const { Text, Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const RoleBadge = ({ role }) => {
    const m = ROLE_META[role] || { color: '#595959', bg: '#f0f0f0', border: '#d9d9d9', label: role };
    return (
        <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 4, fontWeight: 600, fontSize: 11, padding: '0 8px' }}>
            {m.label}
        </Tag>
    );
};

const StatusBadge = ({ status }) => {
    const m = STATUS_META[status] || { color: '#595959', bg: '#f0f0f0', border: '#d9d9d9' };
    return (
        <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 3, fontWeight: 600, fontSize: 11, padding: '0 8px' }}>
            {status}
        </Tag>
    );
};

export const AllUsers = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockUsers);
    const [searchText, setSearchText] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    const handleToggleStatus = (id) => {
        setData(prev => prev.map(u =>
            u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
        ));
        message.success('User status updated');
    };

    const handleDelete = (ids) => {
        Modal.confirm({
            title: `Delete ${ids.length} user(s)?`,
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Delete', okType: 'danger',
            onOk: () => { setData(prev => prev.filter(u => !ids.includes(u.id))); setSelectedRowKeys([]); message.success('Deleted.'); }
        });
    };

    const openEdit = (record) => { setEditingRecord(record); form.setFieldsValue(record); setIsModalOpen(true); };
    const openAdd = () => { setEditingRecord(null); form.resetFields(); setIsModalOpen(true); };

    const handleSave = () => {
        form.validateFields().then(vals => {
            if (editingRecord) {
                setData(prev => prev.map(u => u.id === editingRecord.id ? { ...u, ...vals } : u));
                message.success('User updated!');
            } else {
                const id = Math.max(...data.map(u => u.id)) + 1;
                setData(prev => [...prev, { key: String(id), id, ...vals, wallet: 0, orders: 0, ltv: 0, rating: null, status: 'Active', verified: false, createdAt: 'Just now', lastLogin: 'Never', image: `https://i.pravatar.cc/40?img=${id}` }]);
                message.success('User created!');
            }
            setIsModalOpen(false);
        });
    };

    const handleLoginAs = (record) => {
        message.loading({ content: `Logging in as ${record.name}…`, key: 'login' });
        setTimeout(() => message.success({ content: `Impersonating ${record.name} — audit log recorded`, key: 'login', duration: 3 }), 1200);
    };

    const filtered = data.filter(u => {
        const matchSearch = !searchText || [u.name, u.email, u.phone, String(u.id)].some(s => s.toLowerCase().includes(searchText.toLowerCase()));
        const matchRole = roleFilter === 'All' || u.role === roleFilter;
        const matchStatus = statusFilter === 'All' || u.status === statusFilter;
        return matchSearch && matchRole && matchStatus;
    });

    const activeCount = data.filter(u => u.status === 'Active').length;
    const suspendedCount = data.filter(u => u.status === 'Suspended').length;
    const blockedCount = data.filter(u => u.status === 'Blocked').length;
    const pendingCount = data.filter(u => u.status === 'Pending').length;

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 55, sorter: (a, b) => a.id - b.id },
        {
            title: 'Name', key: 'name',
            render: (_, r) => (
                <Space>
                    <Avatar src={r.image} size={32} />
                    <Space direction="vertical" size={0}>
                        <Text style={{ color: '#1890ff', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }} onClick={() => openEdit(r)}>{r.name}</Text>
                        {r.verified && <Text style={{ fontSize: 10, color: '#52c41a', whiteSpace: 'nowrap' }}><CheckCircleOutlined /> Verified</Text>}
                    </Space>
                </Space>
            )
        },
        { title: 'Email', dataIndex: 'email', key: 'email', render: t => <Text style={{ color: '#1890ff', fontSize: 13, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', render: t => <Text style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Role', dataIndex: 'role', key: 'role', render: role => <RoleBadge role={role} /> },
        {
            title: 'Wallet', dataIndex: 'wallet', key: 'wallet',
            sorter: (a, b) => a.wallet - b.wallet,
            render: v => <Text style={{ fontWeight: 500 }}>₹{v.toFixed(2)}</Text>
        },
        {
            title: 'Orders', dataIndex: 'orders', key: 'orders',
            sorter: (a, b) => a.orders - b.orders,
            render: v => <Text style={{ color: '#1890ff' }}>{v}</Text>
        },
        { title: 'Zone', dataIndex: 'zone', key: 'zone', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Created Date', dataIndex: 'createdAt', key: 'createdAt', sorter: true, render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Status', dataIndex: 'status', key: 'status', width: 100,
            render: status => <StatusBadge status={status} />
        },
        {
            title: '', key: 'actions', width: 170,
            render: (_, record) => (
                <Space size={4}>
                    <Tooltip title="Login as this user (impersonate)">
                        <Button size="small"
                            style={{ background: isDarkMode ? '#1f1f1f' : '#f0f0f0', borderColor: isDarkMode ? '#434343' : '#d9d9d9', color: isDarkMode ? '#d9d9d9' : '#595959', borderRadius: 4, fontWeight: 600, fontSize: 12 }}
                            onClick={() => handleLoginAs(record)}>Login</Button>
                    </Tooltip>
                    <Button size="small"
                        style={{ background: '#1890ff', borderColor: '#1890ff', color: '#fff', borderRadius: 4, fontWeight: 600, fontSize: 12 }}
                        onClick={() => openEdit(record)}>View</Button>
                    <Dropdown trigger={['click']} menu={{
                        items: [
                            { key: '1', label: 'Edit User', icon: <EditOutlined />, onClick: () => openEdit(record) },
                            { key: '2', label: record.status === 'Active' ? 'Suspend' : 'Activate', icon: <PoweroffOutlined />, onClick: () => handleToggleStatus(record.id) },
                            { key: '3', label: 'Wallet Adjustment', icon: <WalletOutlined /> },
                            { key: '4', label: 'View Activity Log', icon: <HistoryOutlined /> },
                            { type: 'divider' },
                            { key: '5', label: 'Delete User', icon: <DeleteOutlined />, danger: true, onClick: () => handleDelete([record.id]) },
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
            {/* Stats Row — 5 Cards Single Line */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {[
                    { label: 'Total Users', value: data.length, color: '#1890ff', bg: '#e6f4ff', border: '#91caff' },
                    { label: 'Active', value: activeCount, color: '#389e0d', bg: '#f6ffed', border: '#b7eb8f' },
                    { label: 'Suspended', value: suspendedCount, color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
                    { label: 'Pending', value: pendingCount, color: '#096dd9', bg: '#e6f4ff', border: '#91caff' },
                    { label: 'Blocked', value: blockedCount, color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
                ].map(s => (
                    <div key={s.label} style={{
                        flex: 1, minWidth: 0,
                        background: isDarkMode ? '#1f1f1f' : s.bg,
                        border: `1px solid ${isDarkMode ? '#303030' : s.border}`,
                        borderRadius: 8,
                        padding: '10px 16px',
                        display: 'flex', flexDirection: 'column', gap: 2,
                    }}>
                        <Text style={{ fontSize: 11, color: isDarkMode ? '#8c8c8c' : '#8c8c8c', fontWeight: 500 }}>{s.label}</Text>
                        <span style={{ fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</span>
                    </div>
                ))}
            </div>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>All Users</Text>
                    <Tooltip title="Total registered users">
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700, cursor: 'pointer' }}>i</span>
                    </Tooltip>
                    <Badge count={filtered.length} style={{ backgroundColor: '#1890ff' }} />
                </Space>

                <Space wrap size={8}>
                    <Button icon={<UserOutlined />} onClick={() => message.info('Guest order flow')}>Order for Guest</Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Add New User</Button>
                    <Button icon={<SafetyOutlined />} href="/users/roles">Manage Roles & Permissions</Button>
                    <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
                    <Button icon={<ReloadOutlined />} onClick={() => { setSearchText(''); setRoleFilter('All'); setStatusFilter('All'); }} />
                </Space>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                {/* Filters */}
                <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: borderStyle, flexWrap: 'wrap', gap: 12 }}>
                    <Input
                        placeholder="Search with anything..."
                        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 260, border: 'none', background: isDarkMode ? '#1f1f1f' : '#f5f5f5', borderRadius: 6 }}
                        value={searchText} onChange={e => setSearchText(e.target.value)} allowClear
                    />
                    <Space wrap size={8}>
                        <Select value={roleFilter} onChange={setRoleFilter} style={{ width: 150 }}>
                            <Option value="All">All Roles</Option>
                            {Object.keys(ROLE_META).map(r => <Option key={r} value={r}>{r}</Option>)}
                        </Select>
                        <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 140 }}>
                            <Option value="All">All Status</Option>
                            <Option value="Active">Active</Option>
                            <Option value="Suspended">Suspended</Option>
                            <Option value="Blocked">Blocked</Option>
                            <Option value="Pending">Pending</Option>
                        </Select>
                        <Select defaultValue="10" style={{ width: 70 }}>
                            {['10', '25', '50', '100'].map(v => <Option key={v} value={v}>{v}</Option>)}
                        </Select>
                        <Button icon={<DownloadOutlined />}>Export as CSV</Button>
                    </Space>
                </div>

                {/* Bulk Bar */}
                {selectedRowKeys.length > 0 && (
                    <div style={{ padding: '10px 20px', background: '#e6f4ff', borderBottom: borderStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ color: '#0958d9' }}>{selectedRowKeys.length} user(s) selected</Text>
                        <Space>
                            <Button size="small" type="primary" ghost onClick={() => { setData(prev => prev.map(u => selectedRowKeys.includes(u.id) ? { ...u, status: 'Active' } : u)); setSelectedRowKeys([]); message.success('Bulk Activated'); }}>Bulk Activate</Button>
                            <Button size="small" style={{ color: '#d46b08', borderColor: '#ffd591' }} onClick={() => { setData(prev => prev.map(u => selectedRowKeys.includes(u.id) ? { ...u, status: 'Suspended' } : u)); setSelectedRowKeys([]); message.success('Bulk Suspended'); }}>Bulk Suspend</Button>
                            <Button size="small">Bulk Zone Update</Button>
                            <Button size="small">Bulk Role Update</Button>
                            <Button size="small" danger onClick={() => handleDelete(selectedRowKeys)}>Bulk Delete</Button>
                        </Space>
                    </div>
                )}

                <div style={{ padding: '0 20px 20px' }}>
                    <Table
                        rowSelection={{ selectedRowKeys, onChange: keys => setSelectedRowKeys(keys) }}
                        columns={columns}
                        dataSource={filtered}
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                        scroll={{ x: 'max-content' }}
                        rowHoverable size="middle"
                    />
                </div>
            </Card>

            {/* Add / Edit User Modal */}
            <Modal
                title={<Space><UserOutlined style={{ color: '#1890ff' }} /><Text strong style={{ fontSize: 16 }}>{editingRecord ? `Edit: ${editingRecord?.name}` : 'Add New User'}</Text></Space>}
                open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={1000}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>{editingRecord ? 'Update User' : 'Create User'}</Button>
                ]}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
                    <Tabs defaultActiveKey="1" tabPosition="left" size="small">

                        {/* Tab 1: Basic Info */}
                        <TabPane tab={<span><UserOutlined /> Basic Info</span>} key="1">
                            <Row gutter={16}>
                                <Col span={12}><Form.Item label="Full Name" name="name" rules={[{ required: true }]}><Input /></Form.Item></Col>
                                <Col span={12}><Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item></Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={8}><Form.Item label="Phone" name="phone" rules={[{ required: true }]}><Input placeholder="+91..." /></Form.Item></Col>
                                <Col span={8}><Form.Item label="Role" name="role" rules={[{ required: true }]}><Select>{Object.keys(ROLE_META).map(r => <Option key={r} value={r}>{r}</Option>)}</Select></Form.Item></Col>
                                <Col span={8}><Form.Item label="Zone" name="zone"><Select><Option value="Buchi Town">Buchi Town</Option><Option value="Jonnawada">Jonnawada</Option><Option value="Sangam">Sangam</Option><Option value="All Zones">All Zones</Option></Select></Form.Item></Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}><Form.Item label="Password" name="password" extra="Leave blank to auto-generate"><Input.Password placeholder="Auto-generate if empty" /></Form.Item></Col>
                                <Col span={12}><Form.Item label="Status" name="status"><Select><Option value="Active">Active</Option><Option value="Suspended">Suspended</Option><Option value="Blocked">Blocked</Option><Option value="Pending">Pending</Option></Select></Form.Item></Col>
                            </Row>
                            <Form.Item label="Full Address" name="address"><Input.TextArea rows={2} /></Form.Item>
                            <Form.Item label="Profile Photo">
                                <Upload.Dragger accept=".jpg,.jpeg,.png" maxCount={1} listType="picture">
                                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                    <p className="ant-upload-text">Click or drag photo · Max 2MB</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </TabPane>

                        {/* Tab 2: Wallet */}
                        <TabPane tab={<span><WalletOutlined /> Wallet & Finance</span>} key="2">
                            <Row gutter={16}>
                                <Col span={8}><Form.Item label="Current Balance (₹)" name="wallet"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
                                <Col span={8}><Form.Item label="Refund Limit (₹)" name="refundLimit"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
                                <Col span={8}><Form.Item label="Cashback Eligible" name="cashback" valuePropName="checked"><Switch checkedChildren="Yes" unCheckedChildren="No" /></Form.Item></Col>
                            </Row>
                            <Form.Item label="Manual Adjustment Amount (₹)" name="adjustAmount"><InputNumber style={{ width: '100%' }} /></Form.Item>
                            <Form.Item label="Adjustment Reason" name="adjustReason"><Input.TextArea rows={2} placeholder="e.g. Refund for Order #1234" /></Form.Item>
                            <Divider>Recent Transactions</Divider>
                            <Table size="small" pagination={false}
                                dataSource={[
                                    { key: '1', date: '2025-02-28', type: 'Credit', amount: 50, reason: 'Cashback on Order #201' },
                                    { key: '2', date: '2025-02-27', type: 'Debit', amount: 120, reason: 'Order #198 payment' },
                                ]}
                                columns={[
                                    { title: 'Date', dataIndex: 'date', key: 'date' },
                                    { title: 'Type', dataIndex: 'type', key: 'type', render: t => <Tag color={t === 'Credit' ? 'success' : 'error'}>{t}</Tag> },
                                    { title: 'Amount (₹)', dataIndex: 'amount', key: 'amount' },
                                    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
                                ]}
                            />
                        </TabPane>

                        {/* Tab 3: Roles & Permissions */}
                        <TabPane tab={<span><LockOutlined /> Roles & Permissions</span>} key="3">
                            <Form.Item label="Assigned Role" name="role"><Select>{Object.keys(ROLE_META).map(r => <Option key={r} value={r}>{r}</Option>)}</Select></Form.Item>
                            <Form.Item label="Restrict by Zone" name="zoneRestrict"><Select mode="multiple" placeholder="Select allowed zones"><Option value="Buchi Town">Buchi Town</Option><Option value="Jonnawada">Jonnawada</Option><Option value="Sangam">Sangam</Option></Select></Form.Item>
                            <Form.Item label="Custom Module Access">
                                <Row gutter={[8, 8]}>
                                    {['Dashboard', 'Stores', 'Menu', 'Users', 'Orders', 'Transactions', 'Reports', 'Settings'].map(mod => (
                                        <Col span={12} key={mod}>
                                            <Space>
                                                <Switch size="small" defaultChecked />
                                                <Text>{mod}</Text>
                                            </Space>
                                        </Col>
                                    ))}
                                </Row>
                            </Form.Item>
                        </TabPane>

                        {/* Tab 4: Verification */}
                        <TabPane tab={<span><CheckCircleOutlined /> Verification</span>} key="4">
                            <Row gutter={16}>
                                <Col span={12}><Form.Item label="Email Verified" name="emailVerified" valuePropName="checked"><Switch checkedChildren="Verified" unCheckedChildren="Unverified" /></Form.Item></Col>
                                <Col span={12}><Form.Item label="Phone Verified" name="phoneVerified" valuePropName="checked"><Switch checkedChildren="Verified" unCheckedChildren="Unverified" /></Form.Item></Col>
                            </Row>
                            <Form.Item label="ID Proof Upload">
                                <Upload.Dragger accept=".jpg,.jpeg,.png,.pdf" maxCount={1}>
                                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                    <p className="ant-upload-text">Aadhaar / PAN Card</p>
                                </Upload.Dragger>
                            </Form.Item>
                            <Form.Item label="Address Proof Upload">
                                <Upload.Dragger accept=".jpg,.jpeg,.png,.pdf" maxCount={1}>
                                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                    <p className="ant-upload-text">Voter ID / Utility Bill</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </TabPane>

                        {/* Tab 5: Activity Log */}
                        <TabPane tab={<span><HistoryOutlined /> Activity Log</span>} key="5">
                            <Table size="small" pagination={{ pageSize: 5 }}
                                dataSource={[
                                    { key: '1', time: '2025-02-28 10:14 AM', action: 'Login', ip: '192.168.1.1', device: 'Chrome / Android' },
                                    { key: '2', time: '2025-02-27 08:30 AM', action: 'Order Placed', ip: '192.168.1.1', device: 'App / iOS' },
                                    { key: '3', time: '2025-02-26 06:15 PM', action: 'Wallet Topped', ip: '203.0.113.5', device: 'Chrome / Windows' },
                                    { key: '4', time: '2025-02-25 03:45 PM', action: 'Profile Edit', ip: '192.168.1.1', device: 'App / Android' },
                                ]}
                                columns={[
                                    { title: 'Time', dataIndex: 'time', key: 'time' },
                                    { title: 'Action', dataIndex: 'action', key: 'action', render: t => <Tag>{t}</Tag> },
                                    { title: 'IP Address', dataIndex: 'ip', key: 'ip', render: t => <Text type="secondary">{t}</Text> },
                                    { title: 'Device', dataIndex: 'device', key: 'device', render: t => <Text type="secondary">{t}</Text> },
                                ]}
                            />
                        </TabPane>

                    </Tabs>
                </Form>
            </Modal>
        </div>
    );
};
