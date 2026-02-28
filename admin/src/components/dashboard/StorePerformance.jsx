import React from 'react';
import { Card, Table, Progress, Rate, Typography, Avatar } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Title } = Typography;

const data = [
    { key: '1', store: 'Buchi Biryani Point', revenue: '₹12,450', orders: 450, rating: 4.8, sla: 98 },
    { key: '2', store: 'Jonnawada Fast Food', revenue: '₹9,800', orders: 380, rating: 4.5, sla: 95 },
    { key: '3', store: 'Kovur Meals & Co.', revenue: '₹8,200', orders: 290, rating: 4.9, sla: 99 },
    { key: '4', store: 'Sri Kanaka Durga Idli', revenue: '₹7,500', orders: 310, rating: 4.2, sla: 88 },
    { key: '5', store: 'Buchi Sweets Bakery', revenue: '₹5,400', orders: 200, rating: 4.0, sla: 85 },
];

export const StorePerformance = () => {
    const { isDarkMode } = useTheme();

    const columns = [
        {
            title: 'Store Name',
            dataIndex: 'store',
            key: 'store',
            render: (text) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}>{text[0]}</Avatar>
                    <b>{text}</b>
                </div>
            )
        },
        { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
        { title: 'Orders', dataIndex: 'orders', key: 'orders' },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: val => <Rate disabled defaultValue={val} style={{ fontSize: 12 }} />
        },
        {
            title: 'SLA %',
            dataIndex: 'sla',
            key: 'sla',
            render: val => (
                <Progress
                    percent={val}
                    size="small"
                    status={val > 90 ? 'success' : val > 80 ? 'active' : 'exception'}
                    strokeColor={val > 90 ? '#52c41a' : val > 80 ? '#faad14' : '#ff4d4f'}
                />
            )
        }
    ];

    return (
        <Card
            title={<Title level={5} style={{ margin: 0 }}><TrophyOutlined style={{ color: '#faad14', marginRight: 8 }} /> Top 5 Stores</Title>}
            style={{
                height: '100%',
                borderRadius: 12,
                border: 'none',
                boxShadow: isDarkMode ? '0 1px 2px -2px rgba(0,0,0,0.4)' : '0 1px 2px -2px rgba(0,0,0,0.05), 0 3px 6px 0 rgba(0,0,0,0.03)'
            }}
        >
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                size="small"
            />
        </Card>
    );
};
