import React from 'react';
import { Card, Row, Col, Progress, Typography, Space } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Title, Text } = Typography;

export const DeliveryPerformance = () => {
    const { isDarkMode } = useTheme();

    return (
        <Card
            title={<Title level={5} style={{ margin: 0 }}><RocketOutlined style={{ color: '#1890ff', marginRight: 8 }} /> Delivery Performance</Title>}
            style={{
                height: '100%',
                borderRadius: 12,
                border: 'none',
                boxShadow: isDarkMode ? '0 1px 2px -2px rgba(0,0,0,0.4)' : '0 1px 2px -2px rgba(0,0,0,0.05), 0 3px 6px 0 rgba(0,0,0,0.03)'
            }}
        >
            <Row gutter={[16, 24]} align="middle" justify="center">
                <Col span={12} style={{ textAlign: 'center' }}>
                    <Progress type="dashboard" percent={92} size={100} strokeColor="#52c41a" />
                    <div style={{ marginTop: 8 }}><Text strong>On-Time Delivery %</Text></div>
                </Col>

                <Col span={12} style={{ textAlign: 'center' }}>
                    <Progress type="dashboard" percent={98} size={100} strokeColor="#1890ff" format={val => `${val}%`} />
                    <div style={{ marginTop: 8 }}><Text strong>Completion Rate</Text></div>
                </Col>

                <Col span={12} style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 100, height: 100, borderRadius: '50%', margin: '0 auto',
                        border: `6px solid ${isDarkMode ? '#333' : '#f0f0f0'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                    }}>
                        <Title level={3} style={{ margin: 0, color: '#faad14' }}>24</Title>
                        <Text type="secondary" style={{ fontSize: 12 }}>mins</Text>
                    </div>
                    <div style={{ marginTop: 8 }}><Text strong>Avg Delivery Time</Text></div>
                </Col>

                <Col span={12} style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 100, height: 100, borderRadius: '50%', margin: '0 auto',
                        border: `6px solid ${isDarkMode ? '#333' : '#f0f0f0'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                    }}>
                        <Title level={3} style={{ margin: 0, color: '#eb2f96' }}>89</Title>
                        <Text type="secondary" style={{ fontSize: 12 }}>agents</Text>
                    </div>
                    <div style={{ marginTop: 8 }}><Text strong>Active Deliveries</Text></div>
                </Col>
            </Row>
        </Card>
    );
};
