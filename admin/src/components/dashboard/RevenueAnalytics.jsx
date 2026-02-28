import React, { useState } from 'react';
import { Card, Select, DatePicker, Row, Col, Button, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const { Title } = Typography;
const { RangePicker } = DatePicker;

// Mock Data
const revenueData = [
    { name: 'Mon', revenue: 4000, orders: 240 },
    { name: 'Tue', revenue: 3000, orders: 198 },
    { name: 'Wed', revenue: 5000, orders: 300 },
    { name: 'Thu', revenue: 4500, orders: 270 },
    { name: 'Fri', revenue: 6000, orders: 450 },
    { name: 'Sat', revenue: 8000, orders: 550 },
    { name: 'Sun', revenue: 7500, orders: 520 },
];

export const RevenueAnalytics = () => {
    const { isDarkMode } = useTheme();
    const [dateRange, setDateRange] = useState('7d');

    const chartCardStyle = {
        borderRadius: 12,
        border: 'none',
        boxShadow: isDarkMode ? '0 1px 2px -2px rgba(0,0,0,0.4)' : '0 1px 2px -2px rgba(0,0,0,0.05), 0 3px 6px 0 rgba(0,0,0,0.03)',
        marginBottom: 24,
    };

    return (
        <Card style={chartCardStyle} styles={{ body: { padding: '24px' } }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
                <Title level={5} style={{ margin: 0 }}>Revenue & Orders Analytics</Title>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Select
                        value={dateRange}
                        onChange={setDateRange}
                        style={{ width: 120 }}
                        options={[
                            { value: '7d', label: 'Last 7 Days' },
                            { value: '30d', label: 'Last 30 Days' },
                            { value: '90d', label: 'Last 90 Days' },
                        ]}
                    />
                    <RangePicker style={{ width: 250 }} />
                    <Button icon={<DownloadOutlined />}>Export CSV</Button>
                </div>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <div style={{ height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#333' : '#e8e8e8'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke={isDarkMode ? '#888' : '#888'} />
                                <YAxis tickFormatter={(val) => `₹${val / 1000}k`} axisLine={false} tickLine={false} stroke={isDarkMode ? '#888' : '#888'} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: isDarkMode ? '#1f1f1f' : '#fff', borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    formatter={(value) => [`₹${value}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#1890ff" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Col>

                <Col xs={24} lg={8}>
                    <div style={{ height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#333' : '#e8e8e8'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke={isDarkMode ? '#888' : '#888'} />
                                <YAxis axisLine={false} tickLine={false} stroke={isDarkMode ? '#888' : '#888'} />
                                <RechartsTooltip
                                    cursor={{ fill: isDarkMode ? '#333' : '#f5f5f5' }}
                                    contentStyle={{ backgroundColor: isDarkMode ? '#1f1f1f' : '#fff', borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="orders" fill="#fa8c16" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};
