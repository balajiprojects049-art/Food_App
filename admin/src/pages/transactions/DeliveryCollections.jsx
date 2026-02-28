import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Modal,
    Form, Select, InputNumber, message, Tooltip, Badge, Divider
} from 'antd';
import {
    SearchOutlined, DownloadOutlined, ReloadOutlined, CheckOutlined,
    HistoryOutlined, WarningOutlined, DollarOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockDeliveryCollections, mockCollectionLogs } from './transactionsData';

const { Text } = Typography;
const { Option } = Select;

// ─── Delivery Collections ─────────────────────────────────────────────────────
export const DeliveryCollections = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockDeliveryCollections);
    const [search, setSearch] = useState('');
    const [processModal, setProcessModal] = useState(null);
    const [form] = Form.useForm();

    const filtered = data.filter(d =>
        !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search)
    );

    const totalCash = data.reduce((a, d) => a + d.cashInHand, 0);
    const highExposure = data.filter(d => d.cashInHand > 3000).length;

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const handleProcess = () => {
        form.validateFields().then(vals => {
            setData(prev => prev.map(d => d.id === processModal.id ? { ...d, cashInHand: Math.max(0, d.cashInHand - vals.amount), lastSettled: 'Just now' } : d));
            message.success(`₹${vals.amount} collected from ${processModal.name}`);
            setProcessModal(null);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Delivery Guy Name', key: 'name',
            render: (_, r) => (
                <Space>
                    <Space direction="vertical" size={0}>
                        <Text style={{ color: '#1890ff', fontWeight: 500, whiteSpace: 'nowrap', cursor: 'pointer' }}>{r.name}</Text>
                        {r.cashInHand > 3000 && <Tag color="error" style={{ fontSize: 10, padding: '0 4px' }}>⚠️ High Exposure</Tag>}
                    </Space>
                </Space>
            )
        },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', render: t => <Text style={{ color: '#1890ff', whiteSpace: 'nowrap', fontSize: 13 }}>{t}</Text> },
        {
            title: 'Cash in Hand', dataIndex: 'cashInHand', key: 'cashInHand', sorter: (a, b) => a.cashInHand - b.cashInHand,
            render: v => <Text strong style={{ color: v > 0 ? '#cf1322' : '#8c8c8c', fontSize: 14, whiteSpace: 'nowrap' }}>₹{v.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
        },
        { title: 'Total Collected', dataIndex: 'totalCollected', key: 'totalCollected', render: v => <Text style={{ color: '#237804', whiteSpace: 'nowrap' }}>₹{v.toLocaleString()}</Text> },
        { title: 'Pending', dataIndex: 'pendingCollection', key: 'pendingCollection', render: v => <Text style={{ color: v > 0 ? '#d46b08' : '#237804', whiteSpace: 'nowrap', fontWeight: 600 }}>₹{v.toFixed(2)}</Text> },
        { title: 'Last Settlement', dataIndex: 'lastSettled', key: 'lastSettled', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: '', key: 'actions', width: 170,
            render: (_, r) => (
                <Space size={6}>
                    <Button size="small" type="primary" style={{ borderRadius: 4, fontSize: 12 }} onClick={() => { setProcessModal(r); form.setFieldsValue({ amount: r.cashInHand }); }}>Process</Button>
                    <Button size="small" style={{ borderRadius: 4, fontSize: 12, background: isDarkMode ? '#1f1f1f' : '#f0f0f0', borderColor: isDarkMode ? '#434343' : '#d9d9d9', color: isDarkMode ? '#d9d9d9' : '#595959' }} icon={<HistoryOutlined />}>View Logs</Button>
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            {/* KPI Strip */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {[
                    { label: 'Total Partners', value: data.length, color: '#1890ff', bg: '#e6f4ff', border: '#91caff' },
                    { label: 'Total Cash in Hand', value: `₹${totalCash.toFixed(2)}`, color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
                    { label: 'High Exposure (>₹3k)', value: highExposure, color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
                    { label: 'Settled Today', value: data.filter(d => d.cashInHand === 0).length, color: '#237804', bg: '#f6ffed', border: '#b7eb8f' },
                    { label: 'Pending Collection', value: data.filter(d => d.cashInHand > 0).length, color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
                ].map(s => (
                    <div key={s.label} style={{ flex: 1, minWidth: 0, background: isDarkMode ? '#1f1f1f' : s.bg, border: `1px solid ${isDarkMode ? '#303030' : s.border}`, borderRadius: 8, padding: '10px 16px' }}>
                        <Text style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 500 }}>{s.label}</Text>
                        <div style={{ fontSize: typeof s.value === 'string' ? 16 : 22, fontWeight: 700, color: s.color, lineHeight: 1.3 }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>DELIVERY COLLECTION</Text>
                    <Badge count={filtered.length} style={{ backgroundColor: '#1890ff' }} />
                </Space>
                <Space>
                    <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
                    <Button icon={<ReloadOutlined />} onClick={() => setSearch('')} />
                </Space>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '14px 20px', borderBottom: borderStyle }}>
                    <Input placeholder="Search with anything..." prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 280, border: 'none', background: isDarkMode ? '#1f1f1f' : '#f5f5f5', borderRadius: 6 }}
                        value={search} onChange={e => setSearch(e.target.value)} allowClear />
                </div>
                <div style={{ padding: '0 20px 20px' }}>
                    <Table columns={columns} dataSource={filtered}
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                        scroll={{ x: 'max-content' }} rowHoverable size="middle" />
                </div>
            </Card>

            {/* Process Modal */}
            <Modal title={<Space><DollarOutlined style={{ color: '#52c41a' }} /><Text strong>Collect Cash — {processModal?.name}</Text></Space>}
                open={!!processModal} onCancel={() => { setProcessModal(null); form.resetFields(); }} width={480}
                footer={[
                    <Button key="cancel" onClick={() => { setProcessModal(null); form.resetFields(); }}>Cancel</Button>,
                    <Button key="process" type="primary" icon={<CheckOutlined />} onClick={handleProcess}>Confirm Collection</Button>
                ]}>
                {processModal && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', marginBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
                            <Text type="secondary">Cash in Hand</Text>
                            <Text strong style={{ color: '#cf1322', fontSize: 16 }}>₹{processModal.cashInHand.toFixed(2)}</Text>
                        </div>
                        <Form form={form} layout="vertical">
                            <Form.Item label="Amount to Collect (₹)" name="amount" rules={[{ required: true }]}>
                                <InputNumber min={0} max={processModal.cashInHand} style={{ width: '100%' }} prefix="₹" />
                            </Form.Item>
                            <Form.Item label="Payment Mode" name="mode" rules={[{ required: true }]}>
                                <Select placeholder="Select mode">
                                    <Option value="cash">Cash</Option>
                                    <Option value="upi">UPI / PhonePe</Option>
                                    <Option value="bank">Bank Transfer</Option>
                                    <Option value="wallet">Deduct from Wallet</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Remarks" name="remarks">
                                <Input.TextArea rows={2} placeholder="Optional remarks..." />
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Modal>
        </div>
    );
};

// ─── Delivery Collection Logs ─────────────────────────────────────────────────
export const DeliveryCollectionLogs = () => {
    const { isDarkMode } = useTheme();
    const [data] = useState(mockCollectionLogs);
    const [search, setSearch] = useState('');

    const filtered = data.filter(d =>
        !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search) || d.msg.toLowerCase().includes(search.toLowerCase())
    );

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const modeColor = { 'Hand Cash': '#d46b08', 'PhonePe': '#722ed1', 'Wallet': '#096dd9' };

    const columns = [
        { title: 'Delivery Name', dataIndex: 'name', key: 'name', render: t => <Text style={{ color: '#1890ff', whiteSpace: 'nowrap', fontWeight: 500 }}>{t}</Text> },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', render: t => <Text style={{ color: '#1890ff', whiteSpace: 'nowrap', fontSize: 13 }}>{t}</Text> },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', sorter: (a, b) => a.amount - b.amount, render: v => <Text strong style={{ color: '#237804', whiteSpace: 'nowrap' }}>₹{v.toLocaleString()}</Text> },
        {
            title: 'Mode', dataIndex: 'mode', key: 'mode',
            render: m => <Tag style={{ whiteSpace: 'nowrap', borderRadius: 3, fontSize: 11, fontWeight: 600, color: modeColor[m] || '#595959', background: '#fafafa', border: '1px solid #d9d9d9' }}>{m}</Tag>
        },
        { title: 'Message', dataIndex: 'msg', key: 'msg', render: t => <Text style={{ color: '#389e0d', fontSize: 13 }}>{t}</Text> },
        { title: 'Date', dataIndex: 'date', key: 'date', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Collected By', dataIndex: 'collectedBy', key: 'collectedBy', render: t => <Text style={{ whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: s => <Tag style={{
                whiteSpace: 'nowrap', borderRadius: 3, fontWeight: 600, fontSize: 11,
                color: s === 'Completed' ? '#237804' : '#cf1322',
                background: s === 'Completed' ? '#f6ffed' : '#fff1f0',
                border: `1px solid ${s === 'Completed' ? '#73d13d' : '#ffa39e'}`
            }}>{s}</Tag>
        },
        {
            title: '', key: 'actions', width: 120,
            render: (_, r) => (
                <Space size={4}>
                    <Button size="small" type="primary" style={{ borderRadius: 4, fontSize: 12 }}>View Details</Button>
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>DELIVERY COLLECTION LOGS</Text>
                    <Badge count={filtered.length} style={{ backgroundColor: '#1890ff' }} />
                </Space>
                <Space>
                    <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
                    <Button icon={<ReloadOutlined />} onClick={() => setSearch('')} />
                </Space>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '14px 20px', borderBottom: borderStyle, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Input placeholder="Search with anything..." prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 280, border: 'none', background: isDarkMode ? '#1f1f1f' : '#f5f5f5', borderRadius: 6 }}
                        value={search} onChange={e => setSearch(e.target.value)} allowClear />
                    <Select defaultValue="All" style={{ width: 150 }}>
                        <Option value="All">All Modes</Option>
                        <Option value="Hand Cash">Hand Cash</Option>
                        <Option value="PhonePe">PhonePe</Option>
                        <Option value="Wallet">Wallet</Option>
                    </Select>
                </div>
                <div style={{ padding: '0 20px 20px' }}>
                    <Table columns={columns} dataSource={filtered}
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                        scroll={{ x: 'max-content' }} rowHoverable size="middle" />
                </div>
            </Card>
        </div>
    );
};
