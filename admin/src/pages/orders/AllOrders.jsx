import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Avatar, Tooltip,
    Select, DatePicker, Drawer, Row, Col, Modal, message, Badge,
    Divider, Steps, Descriptions, Timeline, Statistic, Form, InputNumber, Dropdown
} from 'antd';
import {
    SearchOutlined, DownloadOutlined, ReloadOutlined, PlusOutlined,
    EyeOutlined, CloseCircleOutlined, MoreOutlined, FilterOutlined,
    CheckCircleOutlined, ExclamationCircleOutlined, DollarOutlined,
    CarOutlined, ShopOutlined, UserOutlined, WalletOutlined,
    AlertOutlined, ThunderboltOutlined, HistoryOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockOrders, ORDER_STATUS_META, PAYMENT_STATUS_META } from './ordersData';

const { Text, Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// ─── Badges ──────────────────────────────────────────────────────────────────
const OrderStatusBadge = ({ status }) => {
    const m = ORDER_STATUS_META[status] || { color: '#595959', bg: '#f5f5f5', border: '#d9d9d9', label: status };
    return (
        <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 4, fontWeight: 600, fontSize: 11, padding: '0 8px', whiteSpace: 'nowrap' }}>
            {m.label}
        </Tag>
    );
};

const PayStatusBadge = ({ status }) => {
    const m = PAYMENT_STATUS_META[status] || { color: '#595959', bg: '#f5f5f5', border: '#d9d9d9' };
    return (
        <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 3, fontWeight: 600, fontSize: 11, padding: '0 8px', whiteSpace: 'nowrap' }}>
            {status}
        </Tag>
    );
};

const FraudBadge = () => (
    <Tooltip title="Fraud Flagged">
        <Tag style={{ background: '#fff1f0', border: '1px solid #ffa39e', color: '#cf1322', fontSize: 10, borderRadius: 3, padding: '0 4px' }}>
            🚨 Fraud
        </Tag>
    </Tooltip>
);

// ─── Order Detail Drawer ──────────────────────────────────────────────────────
const OrderDetailDrawer = ({ order, open, onClose, isDarkMode, onStatusChange }) => {
    if (!order) return null;
    const sm = ORDER_STATUS_META[order.status] || {};
    const timelineItems = [
        { color: '#1890ff', children: <><Text strong>Order Placed</Text><br /><Text type="secondary">{order.placedAt}</Text></> },
        { color: '#52c41a', children: <><Text strong>Store Accepted</Text><br /><Text type="secondary">+2 mins</Text></> },
        { color: '#fa8c16', children: <><Text strong>Preparing</Text><br /><Text type="secondary">+8 mins</Text></> },
        { color: '#722ed1', children: <><Text strong>Picked Up</Text><br /><Text type="secondary">+18 mins</Text></> },
        { color: '#237804', children: <><Text strong>Delivered</Text><br /><Text type="secondary">{order.eta}</Text></> },
    ];
    return (
        <Drawer
            title={<Space><Text strong style={{ fontSize: 16 }}>{order.id}</Text><OrderStatusBadge status={order.status} /></Space>}
            open={open} onClose={onClose} width={680}
            extra={<Space>
                <Button danger size="small" icon={<CloseCircleOutlined />}>Cancel Order</Button>
                <Button type="primary" size="small" icon={<DollarOutlined />}>Refund</Button>
            </Space>}
        >
            {/* Status Stepper */}
            <Card size="small" style={{ marginBottom: 16, background: isDarkMode ? '#1f1f1f' : '#fafafa', border: 'none' }}>
                <Steps size="small" current={['Placed', 'Accepted', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered'].indexOf(order.status)}
                    items={['Placed', 'Accepted', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered'].map(s => ({ title: s }))}
                />
            </Card>

            <Row gutter={16} style={{ marginBottom: 16 }}>
                {[
                    { label: 'Order Amount', value: `₹${order.amount}`, color: '#1890ff' },
                    { label: 'Delivery Fee', value: `₹${order.deliveryFee}`, color: '#595959' },
                    { label: 'Tax', value: `₹${order.tax}`, color: '#fa8c16' },
                    { label: 'Commission', value: `₹${order.commission}`, color: '#722ed1' },
                ].map(s => (
                    <Col span={6} key={s.label}>
                        <Card size="small" style={{ textAlign: 'center', background: isDarkMode ? '#1f1f1f' : '#fafafa', border: 'none' }}>
                            <Text type="secondary" style={{ fontSize: 11 }}>{s.label}</Text>
                            <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Card size="small" title={<Text strong><UserOutlined /> Customer</Text>} style={{ marginBottom: 12 }} bodyStyle={{ padding: '8px 12px' }}>
                        <Descriptions column={1} size="small" labelStyle={{ fontWeight: 500 }}>
                            <Descriptions.Item label="Name">{order.customer}</Descriptions.Item>
                            <Descriptions.Item label="Phone"><Text style={{ color: '#1890ff' }}>{order.phone}</Text></Descriptions.Item>
                            <Descriptions.Item label="Zone">{order.zone}</Descriptions.Item>
                            <Descriptions.Item label="Past Orders"><Text style={{ color: '#1890ff' }}>12 orders</Text></Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card size="small" title={<Text strong><ShopOutlined /> Store</Text>} style={{ marginBottom: 12 }} bodyStyle={{ padding: '8px 12px' }}>
                        <Descriptions column={1} size="small" labelStyle={{ fontWeight: 500 }}>
                            <Descriptions.Item label="Store">{order.store}</Descriptions.Item>
                            <Descriptions.Item label="Commission">{Math.round(order.commission / order.amount * 100)}%</Descriptions.Item>
                            <Descriptions.Item label="SLA"><Tag color="success">On Time</Tag></Descriptions.Item>
                            <Descriptions.Item label="Rating">⭐ 4.5</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>

            <Card size="small" title={<Text strong><CarOutlined /> Delivery Info</Text>} style={{ marginBottom: 12 }} bodyStyle={{ padding: '8px 12px' }}>
                <Descriptions column={2} size="small" labelStyle={{ fontWeight: 500 }}>
                    <Descriptions.Item label="Partner">{order.partner !== '—' ? order.partner : <Text type="secondary">Unassigned</Text>}</Descriptions.Item>
                    <Descriptions.Item label="ETA">{order.eta}</Descriptions.Item>
                    <Descriptions.Item label="Vehicle">Motorbike</Descriptions.Item>
                    <Descriptions.Item label="Accept Rate">92%</Descriptions.Item>
                </Descriptions>
                {order.partner === '—' && (
                    <Button size="small" type="dashed" style={{ marginTop: 8 }}>🚴 Assign Delivery Partner</Button>
                )}
            </Card>

            <Card size="small" title={<Text strong>🧾 Items Ordered ({order.items})</Text>} style={{ marginBottom: 12 }} bodyStyle={{ padding: '8px 12px' }}>
                {Array.from({ length: order.items }).map((_, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: i < order.items - 1 ? '1px solid #f0f0f0' : 'none', padding: '6px 0' }}>
                        <Text>{['Chicken Biryani', 'Mango Shake', 'French Fries', 'Butter Chicken', 'Ice Cream', 'Veg Biryani', 'Garlic Bread', 'Lassi'][i % 8]}</Text>
                        <Text strong>₹{[180, 80, 60, 220, 50, 120, 40, 65][i % 8]}</Text>
                    </div>
                ))}
            </Card>

            <Card size="small" title={<Text strong>📋 Event Timeline</Text>} bodyStyle={{ padding: '8px 12px' }}>
                <Timeline items={timelineItems} style={{ marginTop: 8 }} />
            </Card>

            <Divider />
            <Space wrap>
                <Button danger icon={<CloseCircleOutlined />}>Cancel Order</Button>
                <Button icon={<DollarOutlined />}>Refund Order</Button>
                <Button icon={<CheckCircleOutlined />} type="primary">Mark Delivered</Button>
                <Button icon={<AlertOutlined />}>Escalate</Button>
                <Button icon={<ThunderboltOutlined />}>Force Complete</Button>
            </Space>
        </Drawer>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const OrdersTable = ({ title, filterFn, showAnalytics = false }) => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockOrders);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [payFilter, setPayFilter] = useState('All');
    const [payModeFilter, setPayModeFilter] = useState('All');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [drawerOrder, setDrawerOrder] = useState(null);

    const base = typeof filterFn === 'function' ? data.filter(filterFn) : data;
    const filtered = base.filter(o => {
        const s = search.toLowerCase();
        const matchSearch = !s || o.id.toLowerCase().includes(s) || o.customer.toLowerCase().includes(s) || o.phone.includes(s);
        const matchStatus = statusFilter === 'All' || o.status === statusFilter;
        const matchPay = payFilter === 'All' || o.payStatus === payFilter;
        const matchMode = payModeFilter === 'All' || o.payMode === payModeFilter;
        return matchSearch && matchStatus && matchPay && matchMode;
    });

    const totalRevenue = filtered.reduce((a, o) => a + o.amount, 0);
    const totalOrders = filtered.length;
    const cancelRate = Math.round(filtered.filter(o => o.status === 'Cancelled').length / Math.max(totalOrders, 1) * 100);

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const columns = [
        {
            title: 'Order ID', dataIndex: 'id', key: 'id', width: 100,
            render: (id, r) => (
                <Space direction="vertical" size={2}>
                    <Text style={{ color: '#1890ff', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }} onClick={() => setDrawerOrder(r)}>{id}</Text>
                    {r.fraud && <FraudBadge />}
                </Space>
            )
        },
        {
            title: 'Customer', key: 'customer',
            render: (_, r) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{r.customer}</Text>
                    <Text style={{ color: '#1890ff', fontSize: 12, whiteSpace: 'nowrap' }}>{r.phone}</Text>
                </Space>
            )
        },
        { title: 'Store', dataIndex: 'store', key: 'store', render: t => <Text style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Partner', dataIndex: 'partner', key: 'partner', render: t => <Text style={{ fontSize: 13, whiteSpace: 'nowrap', color: t === '—' ? '#bfbfbf' : 'inherit' }}>{t}</Text> },
        {
            title: 'Amount', key: 'amount',
            render: (_, r) => (
                <Space direction="vertical" size={0}>
                    <Text strong style={{ color: '#389e0d', whiteSpace: 'nowrap' }}>₹{r.amount}</Text>
                    <Text type="secondary" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>+₹{r.deliveryFee} del</Text>
                </Space>
            )
        },
        {
            title: 'Pay Mode', dataIndex: 'payMode', key: 'payMode',
            render: m => (
                <Tag style={{
                    whiteSpace: 'nowrap', borderRadius: 3, fontSize: 11, fontWeight: 600,
                    color: m === 'COD' ? '#d46b08' : m === 'Wallet' ? '#722ed1' : '#096dd9',
                    background: m === 'COD' ? '#fff7e6' : m === 'Wallet' ? '#f9f0ff' : '#e6f4ff',
                    border: `1px solid ${m === 'COD' ? '#ffd591' : m === 'Wallet' ? '#d3adf7' : '#91caff'}`,
                }}>{m}</Tag>
            )
        },
        { title: 'Pay Status', dataIndex: 'payStatus', key: 'payStatus', render: s => <PayStatusBadge status={s} /> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => <OrderStatusBadge status={s} /> },
        {
            title: 'Type', dataIndex: 'type', key: 'type',
            render: t => <Tag style={{ fontSize: 11, whiteSpace: 'nowrap', borderRadius: 3 }} color={t === 'Scheduled' ? 'purple' : 'default'}>{t}</Tag>
        },
        { title: 'Placed At', dataIndex: 'placedAt', key: 'placedAt', sorter: true, render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'ETA', dataIndex: 'eta', key: 'eta', render: t => <Text style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Zone', dataIndex: 'zone', key: 'zone', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: '', key: 'actions', width: 160,
            render: (_, record) => (
                <Space size={4}>
                    <Button size="small" style={{ background: '#1890ff', borderColor: '#1890ff', color: '#fff', borderRadius: 4, fontWeight: 600, fontSize: 12 }}
                        onClick={() => setDrawerOrder(record)}>View</Button>
                    <Button size="small" style={{ background: isDarkMode ? '#262626' : '#f0f0f0', borderColor: isDarkMode ? '#434343' : '#d9d9d9', color: isDarkMode ? '#d9d9d9' : '#595959', borderRadius: 4, fontWeight: 600, fontSize: 12 }}>
                        Assign
                    </Button>
                    <Dropdown trigger={['click']} menu={{
                        items: [
                            { key: '1', label: 'Update Status', icon: <CheckCircleOutlined /> },
                            { key: '2', label: 'Cancel Order', icon: <CloseCircleOutlined />, danger: true },
                            { key: '3', label: 'Refund Order', icon: <DollarOutlined /> },
                            { key: '4', label: 'Escalate', icon: <AlertOutlined /> },
                            { key: '5', label: 'View Customer', icon: <UserOutlined /> },
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
            {/* Analytics Strip */}
            {showAnalytics && (
                <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                    {[
                        { label: 'Total Orders', value: totalOrders, color: '#1890ff', bg: '#e6f4ff', border: '#91caff' },
                        { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, color: '#389e0d', bg: '#f6ffed', border: '#b7eb8f' },
                        { label: 'Cancel Rate', value: `${cancelRate}%`, color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
                        { label: 'Fraud Orders', value: filtered.filter(o => o.fraud).length, color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
                        { label: 'COD Orders', value: filtered.filter(o => o.cod).length, color: '#531dab', bg: '#f9f0ff', border: '#d3adf7' },
                    ].map(s => (
                        <div key={s.label} style={{ flex: 1, minWidth: 0, background: isDarkMode ? '#1f1f1f' : s.bg, border: `1px solid ${isDarkMode ? '#303030' : s.border}`, borderRadius: 8, padding: '10px 16px' }}>
                            <Text style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 500 }}>{s.label}</Text>
                            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</Text>
                    <Tooltip title="Total orders">
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700, cursor: 'pointer' }}>i</span>
                    </Tooltip>
                    <Badge count={filtered.length} style={{ backgroundColor: '#1890ff' }} />
                </Space>
                <Space wrap size={8}>
                    <Button type="primary" icon={<PlusOutlined />}>Create Manual Order</Button>
                    <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
                    <Button icon={<ReloadOutlined />} onClick={() => { setSearch(''); setStatusFilter('All'); setPayFilter('All'); setPayModeFilter('All'); }} />
                </Space>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                {/* Filter Row */}
                <div style={{ padding: '14px 20px', display: 'flex', flexWrap: 'wrap', gap: 10, borderBottom: borderStyle, alignItems: 'center' }}>
                    <Input placeholder="Search Order ID, Customer, Phone..." prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 280, border: 'none', background: isDarkMode ? '#1f1f1f' : '#f5f5f5', borderRadius: 6 }}
                        value={search} onChange={e => setSearch(e.target.value)} allowClear />
                    <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 170 }}>
                        <Option value="All">All Status</Option>
                        {Object.keys(ORDER_STATUS_META).map(s => <Option key={s} value={s}>{s}</Option>)}
                    </Select>
                    <Select value={payFilter} onChange={setPayFilter} style={{ width: 140 }}>
                        <Option value="All">Pay Status</Option>
                        <Option value="Paid">Paid</Option>
                        <Option value="Pending">Pending</Option>
                        <Option value="Failed">Failed</Option>
                        <Option value="Refunded">Refunded</Option>
                    </Select>
                    <Select value={payModeFilter} onChange={setPayModeFilter} style={{ width: 130 }}>
                        <Option value="All">Pay Mode</Option>
                        <Option value="Online">Online</Option>
                        <Option value="COD">COD</Option>
                        <Option value="Wallet">Wallet</Option>
                    </Select>
                    <RangePicker style={{ borderRadius: 6 }} />
                </div>

                {/* Bulk Bar */}
                {selectedRowKeys.length > 0 && (
                    <div style={{ padding: '10px 20px', background: '#e6f4ff', borderBottom: borderStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ color: '#0958d9' }}>{selectedRowKeys.length} order(s) selected</Text>
                        <Space>
                            <Button size="small" type="primary" ghost>Bulk Assign Delivery</Button>
                            <Button size="small">Bulk Status Update</Button>
                            <Button size="small" danger>Bulk Cancel</Button>
                            <Button size="small" icon={<DollarOutlined />}>Bulk Refund</Button>
                            <Button size="small" icon={<DownloadOutlined />}>Bulk Export</Button>
                        </Space>
                    </div>
                )}

                <div style={{ padding: '0 20px 20px' }}>
                    <Table
                        rowSelection={{ selectedRowKeys, onChange: keys => setSelectedRowKeys(keys) }}
                        columns={columns} dataSource={filtered}
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                        scroll={{ x: 'max-content' }} rowHoverable size="middle"
                    />
                </div>
            </Card>

            <OrderDetailDrawer order={drawerOrder} open={!!drawerOrder} onClose={() => setDrawerOrder(null)} isDarkMode={isDarkMode} />
        </div>
    );
};

// ─── Exported Pages ────────────────────────────────────────────────────────────
export const AllOrders = () => <OrdersTable title="All Orders" showAnalytics />;
export const CancelledOrders = () => <OrdersTable title="Cancelled Orders" filterFn={o => o.status === 'Cancelled'} />;
export const RefundRequests = () => <OrdersTable title="Refund Requests" filterFn={o => o.payStatus === 'Refunded' || o.status === 'Refunded'} />;
export const DisputedOrders = () => <OrdersTable title="Disputed Orders" filterFn={o => o.status === 'Disputed'} />;
export const CODOrders = () => <OrdersTable title="COD Orders" filterFn={o => o.cod} />;
export const HighValueOrders = () => <OrdersTable title="High Value Orders" filterFn={o => o.amount >= 500} />;
export const FraudFlaggedOrders = () => <OrdersTable title="Fraud Flagged Orders" filterFn={o => o.fraud} />;
export const ScheduledOrders = () => <OrdersTable title="Scheduled Orders" filterFn={o => o.scheduled} />;
