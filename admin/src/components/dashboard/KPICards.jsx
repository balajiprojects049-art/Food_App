import React from 'react';
import { Row, Col, Card, Typography, Statistic, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { ShoppingCart, IndianRupee, Store, Users, FileClock, XOctagon, Undo2, AlertOctagon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const { Text } = Typography;

export const KPICards = () => {
    const { isDarkMode } = useTheme();

    const kpis = [
        { title: 'Total Orders', value: 3245, growth: 12.5, type: 'up', icon: <ShoppingCart size={24} color="#1890ff" />, bg: '#e6f7ff' },
        { title: 'Total Revenue', value: '₹84,230', growth: 8.2, type: 'up', icon: <IndianRupee size={24} color="#52c41a" />, bg: '#f6ffed' },
        { title: 'Active Stores', value: 145, growth: 2.4, type: 'up', icon: <Store size={24} color="#722ed1" />, bg: '#f9f0ff' },
        { title: 'Active Delivery', value: 89, growth: -4.1, type: 'down', icon: <Users size={24} color="#fa8c16" />, bg: '#fff2e8' },
        { title: 'Pending Approval', value: 24, growth: 0.0, type: 'neutral', icon: <FileClock size={24} color="#faad14" />, bg: '#fffbe6' },
        { title: 'Cancelled Orders', value: 12, growth: 1.2, type: 'up', icon: <XOctagon size={24} color="#f5222d" />, bg: '#fff1f0' },
        { title: 'Refund Requests', value: 5, growth: -2.0, type: 'down', icon: <Undo2 size={24} color="#eb2f96" />, bg: '#fff0f6' },
        { title: 'Failed Payments', value: 8, growth: 4.5, type: 'up', icon: <AlertOctagon size={24} color="#ff4d4f" />, bg: '#fff1f0' },
    ];

    return (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {kpis.map((kpi, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <Card
                        hoverable
                        style={{
                            borderRadius: 12,
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            border: 'none',
                            boxShadow: isDarkMode ? '0 1px 2px -2px rgba(0,0,0,0.4)' : '0 1px 2px -2px rgba(0,0,0,0.05), 0 3px 6px 0 rgba(0,0,0,0.03)'
                        }}
                        styles={{ body: { padding: '20px 24px' } }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 12,
                                    background: isDarkMode ? '#1f1f1f' : kpi.bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {kpi.icon}
                            </div>
                            <Space direction="vertical" align="end" size={0}>
                                {kpi.type === 'up' && <Text type="success"><ArrowUpOutlined /> {kpi.growth}%</Text>}
                                {kpi.type === 'down' && <Text type="danger"><ArrowDownOutlined /> {Math.abs(kpi.growth)}%</Text>}
                                {kpi.type === 'neutral' && <Text type="secondary">0.0%</Text>}
                            </Space>
                        </div>

                        <Space direction="vertical" size={4} style={{ width: '100%' }}>
                            <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>{kpi.title}</Text>
                            <div style={{ fontSize: 24, fontWeight: 700, color: isDarkMode ? '#fff' : '#141414' }}>
                                {kpi.value}
                            </div>
                        </Space>

                        {/* Faux Sparkline - Could be replaced with true recharts TinyLineChart */}
                        <div style={{ marginTop: 16, height: 4, width: '100%', background: isDarkMode ? '#303030' : '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: '60%',
                                background: kpi.type === 'up' ? '#52c41a' : kpi.type === 'down' ? '#ff4d4f' : '#faad14',
                                borderRadius: 4
                            }}></div>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};
