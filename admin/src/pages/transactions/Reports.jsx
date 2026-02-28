import React, { useState } from 'react';
import { Card, Table, Button, Select, Space, Typography, Row, Col, Tooltip } from 'antd';
import { SearchOutlined, DownloadOutlined, BarChartOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockTopItems } from './transactionsData';

const { Text, Title } = Typography;
const { Option } = Select;

// ─── Simple SVG Donut Chart ───────────────────────────────────────────────────
const DonutChart = ({ items }) => {
    const colors = ['#1890ff', '#52c41a', '#722ed1', '#fa8c16', '#13c2c2', '#f5222d', '#faad14', '#2f54eb', '#eb2f96', '#a0d911'];
    const total = items.reduce((a, i) => a + i.count, 0);
    let cumulative = 0;

    const segments = items.map((item, idx) => {
        const pct = item.count / total;
        const start = cumulative;
        cumulative += pct;
        return { ...item, pct, start, color: colors[idx % colors.length] };
    });

    const polarToCartesian = (cx, cy, r, angle) => {
        const rad = (angle - 90) * Math.PI / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };

    const arcPath = (cx, cy, r, startAngle, endAngle) => {
        const s = polarToCartesian(cx, cy, r, startAngle);
        const e = polarToCartesian(cx, cy, r, endAngle);
        const large = endAngle - startAngle > 180 ? 1 : 0;
        return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
    };

    const cx = 160, cy = 160, R = 120, r = 65;

    return (
        <div>
            <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 4, textAlign: 'center' }}>Overview Of Most Sold Items</Text>
            <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 12, textAlign: 'center' }}>Of all orders till 2026-02-28</Text>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <svg width={320} height={320} viewBox="0 0 320 320">
                    {segments.map((seg, i) => {
                        const startAngle = seg.start * 360;
                        const endAngle = (seg.start + seg.pct) * 360;
                        const mid = (startAngle + endAngle) / 2;
                        const labelPos = polarToCartesian(cx, cy, R + 30, mid);
                        return (
                            <g key={i}>
                                {/* Filled segment */}
                                <path
                                    d={`${arcPath(cx, cy, R, startAngle, endAngle)} L ${cx} ${cy}`}
                                    fill={seg.color} opacity={0.85} stroke="#fff" strokeWidth={2}
                                />
                                {/* Donut hole */}
                                <circle cx={cx} cy={cy} r={r} fill={`var(--donut-hole, #fff)`} />
                                {/* Label line + text for bigger segments */}
                                {seg.pct > 0.06 && (
                                    <>
                                        <line
                                            x1={polarToCartesian(cx, cy, R, mid).x}
                                            y1={polarToCartesian(cx, cy, R, mid).y}
                                            x2={labelPos.x} y2={labelPos.y}
                                            stroke={seg.color} strokeWidth={1}
                                        />
                                        <text x={labelPos.x} y={labelPos.y}
                                            fontSize={9} fill={seg.color} textAnchor="middle" dominantBaseline="central" fontWeight={600}>
                                            {seg.name.length > 10 ? seg.name.substring(0, 9) + '…' : seg.name}
                                        </text>
                                    </>
                                )}
                            </g>
                        );
                    })}
                    {/* Center text */}
                    <text x={cx} y={cy - 8} textAnchor="middle" fontSize={13} fontWeight={700} fill="#262626">Top 10</text>
                    <text x={cx} y={cy + 10} textAnchor="middle" fontSize={11} fill="#8c8c8c">Items</text>
                </svg>
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'center', marginTop: 8 }}>
                {segments.map((s, i) => (
                    <Space key={i} size={4}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                        <Text style={{ fontSize: 11 }}>{s.name}</Text>
                    </Space>
                ))}
            </div>
        </div>
    );
};

// ─── Reports Page ─────────────────────────────────────────────────────────────
export const Reports = () => {
    const { isDarkMode } = useTheme();
    const [items] = useState(mockTopItems);
    const [storeFilter, setStoreFilter] = useState('All');
    const [period, setPeriod] = useState('This Week');

    const filtered = storeFilter === 'All' ? items : items.filter(i => i.store === storeFilter);

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const topColumns = [
        { title: 'Item Name', dataIndex: 'name', key: 'name', render: t => <Text style={{ color: '#1890ff', fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Sales Count', dataIndex: 'count', key: 'count', sorter: (a, b) => a.count - b.count, render: v => <Text strong>{v.toLocaleString()}</Text> },
        { title: 'Net Revenue', dataIndex: 'revenue', key: 'revenue', sorter: (a, b) => a.revenue - b.revenue, render: v => <Text strong style={{ color: '#237804' }}>₹ {v.toLocaleString()}</Text> },
        { title: 'Store', dataIndex: 'store', key: 'store', render: t => <Text type="secondary" style={{ fontSize: 12 }}>{t}</Text> },
    ];

    // Summary cards data
    const summaryCards = [
        { label: 'Total Revenue Today', value: '₹1,24,580', color: '#237804', bg: '#f6ffed', border: '#b7eb8f' },
        { label: 'Commission Earned', value: '₹18,687', color: '#531dab', bg: '#f9f0ff', border: '#d3adf7' },
        { label: 'Pending Payout', value: '₹62,830', color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
        { label: 'COD Pending', value: '₹8,680', color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
        { label: 'Refund Today', value: '₹3,420', color: '#006d75', bg: '#e6fffb', border: '#5cdbd3' },
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            {/* KPI Summary Strip */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {summaryCards.map(s => (
                    <div key={s.label} style={{ flex: 1, minWidth: 0, background: isDarkMode ? '#1f1f1f' : s.bg, border: `1px solid ${isDarkMode ? '#303030' : s.border}`, borderRadius: 8, padding: '10px 16px' }}>
                        <Text style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 500 }}>{s.label}</Text>
                        <div style={{ fontSize: 18, fontWeight: 700, color: s.color, lineHeight: 1.3 }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Most Sold Items Section */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <Space size={6} align="center">
                    <BarChartOutlined style={{ color: '#1890ff', fontSize: 18 }} />
                    <Text style={{ fontWeight: 700, fontSize: 16 }}>Most Sold Items</Text>
                </Space>
                <Space>
                    <Select value={storeFilter} onChange={setStoreFilter} style={{ width: 180 }} placeholder="Select Store">
                        <Option value="All">All Stores</Option>
                        {[...new Set(items.map(i => i.store))].map(s => <Option key={s} value={s}>{s}</Option>)}
                    </Select>
                    <Select value={period} onChange={setPeriod} style={{ width: 140 }}>
                        <Option value="Today">Today</Option>
                        <Option value="This Week">This Week</Option>
                        <Option value="This Month">This Month</Option>
                    </Select>
                    <Button icon={<SearchOutlined />} type="primary" />
                </Space>
            </div>

            <Row gutter={20}>
                <Col xs={24} lg={12}>
                    <Card style={{ ...cardBg, marginBottom: 16 }} bodyStyle={{ padding: 16 }}>
                        <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>Top 10 Most Sold Items</Text>
                        <Table columns={topColumns} dataSource={filtered}
                            pagination={false} size="small" rowHoverable
                            scroll={{ x: 'max-content' }} />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card style={{ ...cardBg, marginBottom: 16 }} bodyStyle={{ padding: 20 }}>
                        <DonutChart items={filtered} />
                    </Card>
                </Col>
            </Row>

            {/* Bar Chart — Revenue by Zone */}
            <Card style={{ ...cardBg, marginBottom: 16 }} bodyStyle={{ padding: 20 }}>
                <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>Revenue by Zone</Text>
                {[
                    { zone: 'Buchi Town', revenue: 68400, color: '#1890ff' },
                    { zone: 'Jonnawada', revenue: 32100, color: '#52c41a' },
                    { zone: 'Sangam', revenue: 24080, color: '#fa8c16' },
                ].map(z => {
                    const max = 68400;
                    const pct = (z.revenue / max) * 100;
                    return (
                        <div key={z.zone} style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <Text style={{ fontSize: 13 }}>{z.zone}</Text>
                                <Text strong style={{ color: z.color }}>₹{z.revenue.toLocaleString()}</Text>
                            </div>
                            <div style={{ height: 10, background: isDarkMode ? '#303030' : '#f0f0f0', borderRadius: 5, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${pct}%`, background: z.color, borderRadius: 5, transition: 'width 0.6s ease' }} />
                            </div>
                        </div>
                    );
                })}
            </Card>

            {/* Payment Mode Split */}
            <Row gutter={16}>
                <Col xs={24} lg={12}>
                    <Card style={cardBg} bodyStyle={{ padding: 20 }}>
                        <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>Payment Mode Split</Text>
                        {[
                            { mode: 'Online', pct: 62, color: '#1890ff', amount: '₹77,040' },
                            { mode: 'COD', pct: 28, color: '#fa8c16', amount: '₹34,782' },
                            { mode: 'Wallet', pct: 10, color: '#722ed1', amount: '₹12,458' },
                        ].map(p => (
                            <div key={p.mode} style={{ marginBottom: 14 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <Space size={6}><div style={{ width: 10, height: 10, borderRadius: 2, background: p.color }} /><Text>{p.mode}</Text></Space>
                                    <Space size={8}><Text type="secondary">{p.pct}%</Text><Text strong style={{ color: p.color }}>{p.amount}</Text></Space>
                                </div>
                                <div style={{ height: 8, background: isDarkMode ? '#303030' : '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 4 }} />
                                </div>
                            </div>
                        ))}
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card style={cardBg} bodyStyle={{ padding: 20 }}>
                        <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>Order Status Distribution</Text>
                        {[
                            { label: 'Delivered', pct: 71, color: '#52c41a' },
                            { label: 'Cancelled', pct: 12, color: '#f5222d' },
                            { label: 'Refunded', pct: 8, color: '#13c2c2' },
                            { label: 'Disputed', pct: 9, color: '#eb2f96' },
                        ].map(p => (
                            <div key={p.label} style={{ marginBottom: 14 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <Space size={6}><div style={{ width: 10, height: 10, borderRadius: 2, background: p.color }} /><Text>{p.label}</Text></Space>
                                    <Text strong style={{ color: p.color }}>{p.pct}%</Text>
                                </div>
                                <div style={{ height: 8, background: isDarkMode ? '#303030' : '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 4 }} />
                                </div>
                            </div>
                        ))}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
