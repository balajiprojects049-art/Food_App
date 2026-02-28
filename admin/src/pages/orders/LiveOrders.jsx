import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button, Tag, Space, Typography, Badge, Switch, message, Tooltip, Progress } from 'antd';
import { SyncOutlined, SoundOutlined, ThunderboltOutlined, AlertOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockOrders, ORDER_STATUS_META } from './ordersData';

const { Text } = Typography;

const liveStatuses = ['Placed', 'Accepted', 'Preparing', 'Ready', 'Out for Delivery'];

const secondsAgo = (placedAt) => {
    // Mock: rotate between 1-35 mins for demo
    const mins = Math.floor(Math.random() * 35) + 1;
    return mins;
};

const SLAIndicator = ({ mins }) => {
    const sla = 30;
    const pct = Math.min((mins / sla) * 100, 100);
    const color = pct < 60 ? '#52c41a' : pct < 85 ? '#fa8c16' : '#ff4d4f';
    const breached = pct >= 100;
    return (
        <Tooltip title={breached ? '⚠️ SLA Breached!' : `${mins} min elapsed / ${sla} min SLA`}>
            <div style={{ minWidth: 100 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                    <Text style={{ fontSize: 11, color: breached ? '#ff4d4f' : '#8c8c8c' }}>
                        {breached ? '🚨 BREACHED' : `${mins}m elapsed`}
                    </Text>
                </div>
                <Progress percent={pct} size={[100, 5]} showInfo={false} strokeColor={color} trailColor="#f0f0f0" />
            </div>
        </Tooltip>
    );
};

const OrderStatusBadge = ({ status }) => {
    const m = ORDER_STATUS_META[status] || { color: '#595959', bg: '#f5f5f5', border: '#d9d9d9', label: status };
    return (
        <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 4, fontWeight: 600, fontSize: 11, padding: '0 8px', whiteSpace: 'nowrap' }}>
            {m.label}
        </Tag>
    );
};

export const LiveOrders = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(
        mockOrders.filter(o => liveStatuses.includes(o.status)).map(o => ({ ...o, elapsed: secondsAgo(o.placedAt) }))
    );
    const [soundOn, setSoundOn] = useState(false);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [countdown, setCountdown] = useState(5);
    const intervalRef = useRef(null);
    const countdownRef = useRef(null);

    const refresh = () => {
        // Simulate real-time update: tick elapsed time, occasionally change status
        setData(prev => prev.map(o => {
            const newElapsed = (o.elapsed || 0) + 1;
            return { ...o, elapsed: newElapsed };
        }));
        setLastRefresh(new Date());
        setCountdown(5);
        if (soundOn) message.info({ content: '🔔 Orders updated', duration: 1 });
    };

    useEffect(() => {
        intervalRef.current = setInterval(refresh, 5000);
        countdownRef.current = setInterval(() => setCountdown(c => Math.max(c - 1, 0)), 1000);
        return () => { clearInterval(intervalRef.current); clearInterval(countdownRef.current); };
    }, [soundOn]);

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const placedCount = data.filter(o => o.status === 'Placed').length;
    const preparingCount = data.filter(o => o.status === 'Preparing').length;
    const outCount = data.filter(o => o.status === 'Out for Delivery').length;
    const slaBreached = data.filter(o => (o.elapsed || 0) >= 30).length;

    const columns = [
        {
            title: 'Order ID', dataIndex: 'id', key: 'id',
            render: (id, r) => (
                <Space direction="vertical" size={2}>
                    <Text style={{ color: '#1890ff', fontWeight: 600, whiteSpace: 'nowrap' }}>{id}</Text>
                    {(r.elapsed || 0) >= 30 && <Tag color="error" style={{ fontSize: 10, padding: '0 4px' }}>🚨 SLA Breach</Tag>}
                </Space>
            )
        },
        { title: 'Customer', dataIndex: 'customer', key: 'customer', render: t => <Text style={{ whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', render: t => <Text style={{ color: '#1890ff', whiteSpace: 'nowrap', fontSize: 13 }}>{t}</Text> },
        { title: 'Store', dataIndex: 'store', key: 'store', render: t => <Text style={{ whiteSpace: 'nowrap', fontSize: 13 }}>{t}</Text> },
        { title: 'Partner', dataIndex: 'partner', key: 'partner', render: t => <Text style={{ whiteSpace: 'nowrap', color: t === '—' ? '#ff4d4f' : 'inherit' }}>{t === '—' ? '⚠️ Unassigned' : t}</Text> },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: v => <Text strong style={{ color: '#389e0d', whiteSpace: 'nowrap' }}>₹{v}</Text> },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: s => <Space><SyncOutlined spin style={{ color: '#1890ff', fontSize: 11 }} /><OrderStatusBadge status={s} /></Space>
        },
        {
            title: 'SLA / Timer', key: 'sla',
            render: (_, r) => <SLAIndicator mins={r.elapsed || 0} />
        },
        { title: 'ETA', dataIndex: 'eta', key: 'eta', render: t => <Text style={{ whiteSpace: 'nowrap', fontSize: 12 }}>{t}</Text> },
        {
            title: '', key: 'actions', width: 160,
            render: (_, record) => (
                <Space size={4}>
                    <Button size="small" type="primary" style={{ borderRadius: 4, fontSize: 12 }}>View</Button>
                    <Button size="small" icon={<ThunderboltOutlined />} style={{ borderRadius: 4, background: '#fff7e6', borderColor: '#ffd591', color: '#d46b08', fontSize: 12 }}>Assign</Button>
                    <Button size="small" icon={<AlertOutlined />} danger style={{ borderRadius: 4, fontSize: 12 }} />
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            {/* Strip */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {[
                    { label: 'Live Orders', value: data.length, color: '#1890ff', bg: '#e6f4ff', border: '#91caff' },
                    { label: 'Placed (Waiting)', value: placedCount, color: '#096dd9', bg: '#e6f4ff', border: '#69b1ff' },
                    { label: 'Preparing', value: preparingCount, color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
                    { label: 'Out for Delivery', value: outCount, color: '#531dab', bg: '#f9f0ff', border: '#d3adf7' },
                    { label: 'SLA Breached', value: slaBreached, color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
                ].map(s => (
                    <div key={s.label} style={{ flex: 1, minWidth: 0, background: isDarkMode ? '#1f1f1f' : s.bg, border: `1px solid ${isDarkMode ? '#303030' : s.border}`, borderRadius: 8, padding: '10px 16px' }}>
                        <Text style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 500 }}>{s.label}</Text>
                        <div style={{ fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <Space size={8} align="center">
                    <SyncOutlined spin style={{ color: '#52c41a', fontSize: 16 }} />
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>LIVE ORDERS</Text>
                    <Badge dot status="processing" />
                    <Text type="secondary" style={{ fontSize: 12 }}>Auto-refresh in {countdown}s</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>Last: {lastRefresh.toLocaleTimeString()}</Text>
                </Space>
                <Space>
                    <Space size={4}>
                        <SoundOutlined style={{ color: soundOn ? '#52c41a' : '#bfbfbf' }} />
                        <Switch size="small" checked={soundOn} onChange={setSoundOn} />
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Sound Alerts</Text>
                    </Space>
                    <Button icon={<SyncOutlined />} onClick={refresh}>Refresh Now</Button>
                </Space>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '0 20px 20px' }}>
                    <Table
                        columns={columns} dataSource={data}
                        pagination={false}
                        scroll={{ x: 'max-content' }} rowHoverable size="middle"
                        rowClassName={(r) => (r.elapsed || 0) >= 30 ? 'sla-breach-row' : ''}
                    />
                </div>
            </Card>
        </div>
    );
};
