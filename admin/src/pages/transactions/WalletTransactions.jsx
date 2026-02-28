import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Select, Tooltip, Badge
} from 'antd';
import {
    SearchOutlined, DownloadOutlined, ReloadOutlined, EyeOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockWalletTxns } from './transactionsData';

const { Text } = Typography;
const { Option } = Select;

const TYPE_META = {
    Deposit: { color: '#237804', bg: '#f6ffed', border: '#73d13d' },
    Withdrawal: { color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
    Refund: { color: '#006d75', bg: '#e6fffb', border: '#5cdbd3' },
    Commission: { color: '#531dab', bg: '#f9f0ff', border: '#d3adf7' },
    Penalty: { color: '#820014', bg: '#fff0f6', border: '#ffadd2' },
};

export const WalletTransactions = () => {
    const { isDarkMode } = useTheme();
    const [data] = useState(mockWalletTxns);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [roleFilter, setRoleFilter] = useState('All');

    const filtered = data.filter(d => {
        const s = search.toLowerCase();
        const matchS = !s || d.txnId.toLowerCase().includes(s) || d.user.toLowerCase().includes(s) || d.desc.toLowerCase().includes(s);
        const matchT = typeFilter === 'All' || d.type === typeFilter;
        const matchR = roleFilter === 'All' || d.role === roleFilter;
        return matchS && matchT && matchR;
    });

    const totalDeposit = data.filter(d => d.type === 'Deposit').reduce((a, d) => a + d.amount, 0);
    const totalRefund = data.filter(d => d.type === 'Refund').reduce((a, d) => a + d.amount, 0);

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const columns = [
        {
            title: 'Transaction ID', dataIndex: 'txnId', key: 'txnId',
            render: t => <Text style={{ color: '#1890ff', fontSize: 12, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{t}</Text>
        },
        {
            title: 'User', key: 'user',
            render: (_, r) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{r.user}</Text>
                    <Text type="secondary" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{r.role}</Text>
                </Space>
            )
        },
        {
            title: 'Type', dataIndex: 'type', key: 'type',
            render: t => {
                const m = TYPE_META[t] || { color: '#595959', bg: '#f5f5f5', border: '#d9d9d9' };
                return <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 3, fontWeight: 600, fontSize: 11, padding: '0 8px', whiteSpace: 'nowrap' }}>{t}</Tag>;
            }
        },
        {
            title: 'Amount', dataIndex: 'amount', key: 'amount', sorter: (a, b) => a.amount - b.amount,
            render: (v, r) => (
                <Text strong style={{ color: r.type === 'Withdrawal' || r.type === 'Penalty' ? '#cf1322' : '#237804', whiteSpace: 'nowrap' }}>
                    {r.type === 'Withdrawal' || r.type === 'Penalty' ? '-' : '+'}₹{v.toFixed(2)}
                </Text>
            )
        },
        { title: 'Description', dataIndex: 'desc', key: 'desc', render: t => <Text style={{ fontSize: 13, color: '#389e0d' }}>{t}</Text> },
        { title: 'Linked Order', dataIndex: 'orderId', key: 'orderId', render: t => <Text style={{ color: '#1890ff', whiteSpace: 'nowrap', fontSize: 12 }}>{t}</Text> },
        { title: 'Date', dataIndex: 'date', key: 'date', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: s => <Tag style={{ background: '#f6ffed', border: '1px solid #73d13d', color: '#237804', borderRadius: 3, fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap' }}>{s}</Tag>
        },
        {
            title: '', key: 'actions', width: 80,
            render: () => <Button size="small" type="primary" style={{ borderRadius: 4, fontSize: 12 }} icon={<EyeOutlined />}>View</Button>
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            {/* KPI Strip */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {[
                    { label: 'Total Transactions', value: data.length, color: '#1890ff', bg: '#e6f4ff', border: '#91caff' },
                    { label: 'Total Deposits', value: `₹${totalDeposit}`, color: '#237804', bg: '#f6ffed', border: '#b7eb8f' },
                    { label: 'Total Refunds', value: `₹${totalRefund}`, color: '#006d75', bg: '#e6fffb', border: '#5cdbd3' },
                    { label: 'Commissions', value: data.filter(d => d.type === 'Commission').length, color: '#531dab', bg: '#f9f0ff', border: '#d3adf7' },
                    { label: 'Penalties', value: data.filter(d => d.type === 'Penalty').length, color: '#820014', bg: '#fff0f6', border: '#ffadd2' },
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
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>WALLET TRANSACTIONS</Text>
                    <Tooltip><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700, cursor: 'pointer' }}>i</span></Tooltip>
                    <Badge count={filtered.length} style={{ backgroundColor: '#1890ff' }} />
                </Space>
                <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '14px 20px', display: 'flex', flexWrap: 'wrap', gap: 10, borderBottom: borderStyle, alignItems: 'center' }}>
                    <Input placeholder="Search with transaction id..." prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 340, border: 'none', background: isDarkMode ? '#1f1f1f' : '#f5f5f5', borderRadius: 6 }}
                        value={search} onChange={e => setSearch(e.target.value)} allowClear />
                    <Select value={typeFilter} onChange={setTypeFilter} style={{ width: 150 }}>
                        <Option value="All">All Types</Option>
                        {Object.keys(TYPE_META).map(t => <Option key={t} value={t}>{t}</Option>)}
                    </Select>
                    <Select value={roleFilter} onChange={setRoleFilter} style={{ width: 140 }}>
                        <Option value="All">All Roles</Option>
                        <Option value="Customer">Customer</Option>
                        <Option value="Delivery">Delivery</Option>
                        <Option value="Store">Store</Option>
                    </Select>
                    <Button icon={<ReloadOutlined />} onClick={() => { setSearch(''); setTypeFilter('All'); setRoleFilter('All'); }} />
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
