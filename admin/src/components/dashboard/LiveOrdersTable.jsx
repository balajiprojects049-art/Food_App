import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Typography, Space } from 'antd';
import { EyeOutlined, SyncOutlined } from '@ant-design/icons';
// import { io } from 'socket.io-client';
import { useTheme } from '../../context/ThemeContext';

const { Title } = Typography;

// Mock initial data
const initialData = [
    { key: '1', orderId: '#ORD-9021', customer: 'John Doe', store: 'Buchi Biryani Point', partner: 'Alex Smith', status: 'Placed', amount: 45.00, time: '2 min ago' },
    { key: '2', orderId: '#ORD-9022', customer: 'Sarah Jane', store: 'Sri Kanaka Durga Idli', partner: 'Mike Johnson', status: 'Preparing', amount: 28.50, time: '12 min ago' },
    { key: '3', orderId: '#ORD-9023', customer: 'Chris Lee', store: 'Reddy Meals', partner: 'David Ray', status: 'On the Way', amount: 110.00, time: '25 min ago' },
    { key: '4', orderId: '#ORD-9024', customer: 'Marta Gomez', store: 'Jonnawada Fast Food', partner: 'Lisa Wong', status: 'Delivered', amount: 35.20, time: '40 min ago' },
    { key: '5', orderId: '#ORD-9025', customer: 'Tom Hardy', store: 'Buchi Sweets Bakery', partner: '-', status: 'Cancelled', amount: 15.00, time: '5 min ago' },
];

export const LiveOrdersTable = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Socket.io mock implementation
        // const socket = io('http://localhost:4000');
        // socket.on('newOrder', (order) => {
        //   setData(prev => [order, ...prev.slice(0, 9)]);
        // });

        // Auto refresh every 10 seconds mock
        const interval = setInterval(() => {
            setLoading(true);
            setTimeout(() => {
                setData(prev => {
                    const newOrder = {
                        key: Math.random().toString(),
                        orderId: `#ORD-${Math.floor(Math.random() * 1000) + 9000}`,
                        customer: 'New Customer',
                        store: 'Kovur Spice Palace',
                        partner: '-',
                        status: 'Placed',
                        amount: Math.floor(Math.random() * 100) + 10,
                        time: 'Just now'
                    };
                    return [newOrder, ...prev.slice(0, 4)];
                });
                setLoading(false);
            }, 500);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return 'blue';
            case 'Preparing': return 'orange';
            case 'On the Way': return 'purple';
            case 'Delivered': return 'green';
            case 'Cancelled': return 'red';
            default: return 'default';
        }
    };

    const columns = [
        { title: 'Order ID', dataIndex: 'orderId', key: 'orderId', render: text => <b>{text}</b> },
        { title: 'Customer Name', dataIndex: 'customer', key: 'customer' },
        { title: 'Store Name', dataIndex: 'store', key: 'store' },
        { title: 'Delivery Partner', dataIndex: 'partner', key: 'partner' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => <Tag color={getStatusColor(status)} style={{ borderRadius: 12, padding: '0 12px' }}>{status}</Tag>
        },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: amt => `₹${amt.toFixed(2)}` },
        { title: 'Time Elapsed', dataIndex: 'time', key: 'time', render: time => <span style={{ color: '#8c8c8c' }}>{time}</span> },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Button type="text" icon={<EyeOutlined />} style={{ color: '#1890ff' }}>View</Button>
            ),
        },
    ];

    return (
        <Card
            title={
                <Space>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#52c41a', boxShadow: '0 0 8px #52c41a' }}></div>
                    <Title level={5} style={{ margin: 0 }}>Live Orders</Title>
                </Space>
            }
            extra={<Tag icon={<SyncOutlined spin={loading} />} color="processing">Auto-updating</Tag>}
            style={{
                marginBottom: 24,
                borderRadius: 12,
                border: 'none',
                boxShadow: isDarkMode ? '0 1px 2px -2px rgba(0,0,0,0.4)' : '0 1px 2px -2px rgba(0,0,0,0.05), 0 3px 6px 0 rgba(0,0,0,0.03)'
            }}
        >
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                loading={loading}
                size="middle"
            />
        </Card>
    );
};
