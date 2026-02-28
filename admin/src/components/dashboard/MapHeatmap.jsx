import React, { useState } from 'react';
import { Card, Typography, Radio, Badge } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Title, Text } = Typography;

export const MapHeatmap = () => {
    const { isDarkMode } = useTheme();
    const [zone, setZone] = useState('all');

    return (
        <Card
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={5} style={{ margin: 0 }}><GlobalOutlined style={{ color: '#13c2c2', marginRight: 8 }} /> Live Operations Map</Title>
                    <Radio.Group value={zone} onChange={e => setZone(e.target.value)} size="small" buttonStyle="solid">
                        <Radio.Button value="all">Buchi Mandal</Radio.Button>
                        <Radio.Button value="north">Buchi Town</Radio.Button>
                        <Radio.Button value="south">Villages</Radio.Button>
                    </Radio.Group>
                </div>
            }
            style={{
                height: '100%',
                borderRadius: 12,
                border: 'none',
                boxShadow: isDarkMode ? '0 1px 2px -2px rgba(0,0,0,0.4)' : '0 1px 2px -2px rgba(0,0,0,0.05), 0 3px 6px 0 rgba(0,0,0,0.03)',
                overflow: 'hidden'
            }}
            bodyStyle={{ padding: 0, height: 400, position: 'relative' }}
        >
            <div style={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 10,
                background: isDarkMode ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <Title level={5} style={{ margin: 0, fontSize: 13 }}>Map Legends</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 13 }}>
                    <Badge color="red" /> <Text style={{ fontSize: 12 }}>High Density (Hot)</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 13 }}>
                    <Badge color="yellow" /> <Text style={{ fontSize: 12 }}>Mid Density</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 13 }}>
                    <Badge color="green" /> <Text style={{ fontSize: 12 }}>Low Density</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 13, marginTop: 4 }}>
                    <div style={{ width: 12, height: 12, background: '#1890ff', borderRadius: '50%', border: '2px solid white', boxShadow: '0 0 4px rgba(0,0,0,0.3)' }} /> <Text style={{ fontSize: 12 }}>Active Drivers: 89</Text>
                </div>
            </div>

            <iframe
                title="Delivery Map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: isDarkMode ? 'invert(90%) hue-rotate(180deg) contrast(80%)' : 'none' }}
                loading="lazy"
                src="https://maps.google.com/maps?q=Buchi+Reddypalem,+Andhra+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
            ></iframe>
        </Card>
    );
};
