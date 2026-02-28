import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Select,
    DatePicker, Modal, Form, InputNumber, message, Tooltip, Badge, Dropdown
} from 'antd';
import {
    SearchOutlined, DownloadOutlined, ReloadOutlined, CheckOutlined,
    CloseOutlined, EyeOutlined, MoreOutlined, BankOutlined, DollarOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockPayouts } from './transactionsData';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const StatusTag = ({ s }) => {
    const map = {
        Pending: { color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
        Completed: { color: '#237804', bg: '#f6ffed', border: '#73d13d' },
        Failed: { color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
    };
    const m = map[s] || { color: '#595959', bg: '#f5f5f5', border: '#d9d9d9' };
    return <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 3, fontWeight: 600, fontSize: 11, padding: '0 8px', whiteSpace: 'nowrap' }}>{s}</Tag>;
};

export const StorePayouts = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockPayouts);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [processModal, setProcessModal] = useState(null);
    const [form] = Form.useForm();

    const filtered = data.filter(d => {
        const s = search.toLowerCase();
        return (statusFilter === 'All' || d.status === statusFilter) &&
            (!s || d.store.toLowerCase().includes(s) || d.id.toLowerCase().includes(s));
    });

    const totalNet = filtered.reduce((a, d) => a + d.net, 0);
    const pendingAmt = filtered.filter(d => d.status === 'Pending').reduce((a, d) => a + d.net, 0);

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const handleApprove = (id) => {
        setData(prev => prev.map(d => d.id === id ? { ...d, status: 'Completed', mode: 'Bank Transfer', txnId: `TXN-${Math.floor(Math.random() * 9000000 + 1000000)}`, msg: 'Approved by admin' } : d));
        message.success('Payout approved and processed!');
        setProcessModal(null);
    };

    const columns = [
        { title: 'Store', dataIndex: 'store', key: 'store', render: t => <Text style={{ color: '#1890ff', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 500 }}>{t}</Text> },
        { title: 'Gross Revenue', dataIndex: 'gross', key: 'gross', sorter: (a, b) => a.gross - b.gross, render: v => <Text style={{ whiteSpace: 'nowrap' }}>₹{v.toLocaleString()}</Text> },
        { title: 'Commission', dataIndex: 'commission', key: 'commission', render: v => <Text style={{ color: '#cf1322', whiteSpace: 'nowrap' }}>-₹{v.toLocaleString()}</Text> },
        { title: 'Tax', dataIndex: 'tax', key: 'tax', render: v => <Text style={{ color: '#cf1322', whiteSpace: 'nowrap' }}>-₹{v}</Text> },
        { title: 'Platform Fee', dataIndex: 'platform', key: 'platform', render: v => <Text style={{ color: '#cf1322', whiteSpace: 'nowrap' }}>-₹{v}</Text> },
        { title: 'Refund Adj.', dataIndex: 'refunds', key: 'refunds', render: v => <Text style={{ color: v > 0 ? '#cf1322' : '#8c8c8c', whiteSpace: 'nowrap' }}>{v > 0 ? `-₹${v}` : '—'}</Text> },
        { title: 'Net Payable', dataIndex: 'net', key: 'net', sorter: (a, b) => a.net - b.net, render: v => <Text strong style={{ color: '#237804', whiteSpace: 'nowrap' }}>₹{v.toLocaleString()}</Text> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => <StatusTag s={s} /> },
        { title: 'Mode', dataIndex: 'mode', key: 'mode', render: t => <Text style={{ whiteSpace: 'nowrap', color: t === '—' ? '#bfbfbf' : 'inherit', fontSize: 13 }}>{t}</Text> },
        { title: 'Transaction ID', dataIndex: 'txnId', key: 'txnId', render: t => <Text style={{ color: t !== '—' ? '#1890ff' : '#bfbfbf', fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Message', dataIndex: 'msg', key: 'msg', render: t => <Text style={{ color: t !== '—' ? '#389e0d' : '#bfbfbf', fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: '', key: 'actions', width: 150,
            render: (_, r) => (
                <Space size={4}>
                    {r.status === 'Pending' ? (
                        <Button size="small" type="primary" style={{ borderRadius: 4, fontSize: 12 }} onClick={() => setProcessModal(r)}>Process</Button>
                    ) : (
                        <Button size="small" style={{ borderRadius: 4, fontSize: 12 }}>View</Button>
                    )}
                    <Dropdown trigger={['click']} menu={{
                        items: [
                            { key: '1', label: 'View Details', icon: <EyeOutlined /> },
                            { key: '2', label: 'Approve', icon: <CheckOutlined />, onClick: () => handleApprove(r.id), disabled: r.status !== 'Pending' },
                            { key: '3', label: 'Reject', icon: <CloseOutlined />, danger: true, disabled: r.status !== 'Pending' },
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
            {/* KPI Strip */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {[
                    { label: 'Total Stores', value: data.length, color: '#1890ff', bg: '#e6f4ff', border: '#91caff' },
                    { label: 'Total Net Payable', value: `₹${totalNet.toLocaleString()}`, color: '#237804', bg: '#f6ffed', border: '#b7eb8f' },
                    { label: 'Pending Payout', value: `₹${pendingAmt.toLocaleString()}`, color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
                    { label: 'Pending Stores', value: data.filter(d => d.status === 'Pending').length, color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
                    { label: 'Failed', value: data.filter(d => d.status === 'Failed').length, color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
                ].map(s => (
                    <div key={s.label} style={{ flex: 1, minWidth: 0, background: isDarkMode ? '#1f1f1f' : s.bg, border: `1px solid ${isDarkMode ? '#303030' : s.border}`, borderRadius: 8, padding: '10px 16px' }}>
                        <Text style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 500 }}>{s.label}</Text>
                        <div style={{ fontSize: s.value.toString().length > 8 ? 16 : 22, fontWeight: 700, color: s.color, lineHeight: 1.3 }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>STORE PAYOUTS</Text>
                    <Tooltip><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700, cursor: 'pointer' }}>i</span></Tooltip>
                    <Badge count={filtered.length} style={{ backgroundColor: '#1890ff' }} />
                </Space>
                <Space wrap size={8}>
                    {selectedRowKeys.length > 0 && <>
                        <Button type="primary" ghost size="small" icon={<CheckOutlined />}>Bulk Approve</Button>
                        <Button danger size="small" icon={<CloseOutlined />}>Bulk Reject</Button>
                    </>}
                    <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
                    <Button icon={<ReloadOutlined />} onClick={() => { setSearch(''); setStatusFilter('All'); }} />
                </Space>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '14px 20px', display: 'flex', flexWrap: 'wrap', gap: 10, borderBottom: borderStyle, alignItems: 'center' }}>
                    <Input placeholder="Search store, payout ID..." prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 260, border: 'none', background: isDarkMode ? '#1f1f1f' : '#f5f5f5', borderRadius: 6 }}
                        value={search} onChange={e => setSearch(e.target.value)} allowClear />
                    <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 150 }}>
                        <Option value="All">All Status</Option>
                        <Option value="Pending">Pending</Option>
                        <Option value="Completed">Completed</Option>
                        <Option value="Failed">Failed</Option>
                    </Select>
                    <Select defaultValue="All" style={{ width: 180 }}>
                        <Option value="All">All Restaurants</Option>
                        {[...new Set(data.map(d => d.store))].map(s => <Option key={s} value={s}>{s}</Option>)}
                    </Select>
                    <RangePicker style={{ borderRadius: 6 }} />
                </div>

                {selectedRowKeys.length > 0 && (
                    <div style={{ padding: '10px 20px', background: '#e6f4ff', borderBottom: borderStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ color: '#0958d9' }}>{selectedRowKeys.length} payout(s) selected</Text>
                        <Space>
                            <Button size="small" type="primary" ghost icon={<CheckOutlined />}>Bulk Approve</Button>
                            <Button size="small" danger icon={<CloseOutlined />}>Bulk Reject</Button>
                            <Button size="small" icon={<DownloadOutlined />}>Export Selected</Button>
                        </Space>
                    </div>
                )}

                <div style={{ padding: '0 20px 20px' }}>
                    <Table rowSelection={{ selectedRowKeys, onChange: k => setSelectedRowKeys(k) }}
                        columns={columns} dataSource={filtered}
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50'], showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                        scroll={{ x: 'max-content' }} rowHoverable size="middle" />
                </div>
            </Card>

            {/* Process Payout Modal */}
            <Modal title={<Space><BankOutlined style={{ color: '#1890ff' }} /><Text strong>Process Payout — {processModal?.store}</Text></Space>}
                open={!!processModal} onCancel={() => setProcessModal(null)} width={500}
                footer={[
                    <Button key="cancel" onClick={() => setProcessModal(null)}>Cancel</Button>,
                    <Button key="approve" type="primary" icon={<CheckOutlined />} onClick={() => handleApprove(processModal?.id)}>Approve & Process</Button>
                ]}>
                {processModal && (
                    <div style={{ padding: '8px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <Text type="secondary">Net Payable Amount</Text><Text strong style={{ color: '#237804', fontSize: 16 }}>₹{processModal.net.toLocaleString()}</Text>
                        </div>
                        <Form layout="vertical" style={{ marginTop: 16 }}>
                            <Form.Item label="Transaction Mode" required>
                                <Select placeholder="Select mode">
                                    <Option value="bank">Bank Transfer (NEFT/IMPS)</Option>
                                    <Option value="upi">UPI</Option>
                                    <Option value="cash">Hand Cash</Option>
                                    <Option value="cheque">Cheque</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Remarks / Message">
                                <Input.TextArea rows={2} placeholder="Optional remarks..." />
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Modal>
        </div>
    );
};
