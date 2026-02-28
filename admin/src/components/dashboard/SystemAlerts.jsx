import React from 'react';
import { Card, Alert, Typography } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Title } = Typography;

export const SystemAlerts = () => {
    const { isDarkMode } = useTheme();

    const alerts = [
        { type: 'error', message: 'Payment gateway Stripe API failure (2 mins ago)', showIcon: true },
        { type: 'warning', message: 'High cancellation rate in Jonnawada Zone (+12%)', showIcon: true },
        { type: 'error', message: 'Server database lag detected (>2000ms response)', showIcon: true },
        { type: 'info', message: 'New update automatically deployed successfully', showIcon: true },
        { type: 'success', message: 'All external systems operational', showIcon: true }
    ];

    return (
        <Card
            title={<Title level={5} style={{ margin: 0 }}><AlertOutlined style={{ color: '#ff4d4f', marginRight: 8 }} /> System Alerts</Title>}
            style={{
                height: '100%',
                borderRadius: 12,
                border: 'none',
                boxShadow: isDarkMode ? '0 1px 2px -2px rgba(0,0,0,0.4)' : '0 1px 2px -2px rgba(0,0,0,0.05), 0 3px 6px 0 rgba(0,0,0,0.03)'
            }}
            bodyStyle={{ padding: '16px' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {alerts.map((alert, idx) => (
                    <Alert
                        key={idx}
                        type={alert.type}
                        message={alert.message}
                        showIcon={alert.showIcon}
                        style={{ borderRadius: 8, padding: '8px 12px' }}
                    />
                ))}
            </div>
        </Card>
    );
};
