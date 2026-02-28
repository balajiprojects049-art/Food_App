import React, { useState } from 'react';
import { Card, Button, Switch, Tag, Space, Typography, message, Tooltip } from 'antd';
import { PoweroffOutlined, EditOutlined, PlusOutlined, PictureOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockSliders, mockCategories } from './promotionsData';

const { Text } = Typography;

// ─── Promo Sliders ─────────────────────────────────────────────────────────────
export const PromoSliders = () => {
    const { isDarkMode } = useTheme();
    const [sliders, setSliders] = useState(mockSliders);

    const toggle = (id) => {
        setSliders(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
        message.success('Slider status updated');
    };

    const cardStyle = {
        borderRadius: 10,
        border: isDarkMode ? '1px solid #303030' : '1px solid #e8e8e8',
        boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: 20,
    };

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>PROMO SLIDERS</Text>
                <Button type="primary" icon={<PlusOutlined />}>Add New Slider</Button>
            </div>

            {sliders.map(slider => (
                <Card key={slider.id} style={cardStyle} bodyStyle={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                        <Space size={12}>
                            <div style={{ width: 48, height: 48, borderRadius: 8, background: isDarkMode ? '#262626' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PictureOutlined style={{ fontSize: 22, color: '#8c8c8c' }} />
                            </div>
                            <div>
                                <Text strong style={{ fontSize: 15 }}>{slider.position}</Text>
                                <div style={{ display: 'flex', gap: 16, marginTop: 3 }}>
                                    <Text type="secondary" style={{ fontSize: 12 }}>{slider.slides} Slides</Text>
                                    <Text type="secondary" style={{ fontSize: 12 }}>Last Modified: {slider.lastModified}</Text>
                                </div>
                            </div>
                        </Space>
                        <Space size={8}>
                            <Tooltip title={slider.enabled ? 'Disable' : 'Enable'}>
                                <Button icon={<PoweroffOutlined />} size="small"
                                    style={{ borderRadius: 6, background: slider.enabled ? '#fff1f0' : '#f6ffed', borderColor: slider.enabled ? '#ffa39e' : '#b7eb8f', color: slider.enabled ? '#cf1322' : '#237804' }}
                                    onClick={() => toggle(slider.id)} />
                            </Tooltip>
                            <Button icon={<EditOutlined />} size="small" style={{ borderRadius: 6 }}>Edit</Button>
                        </Space>
                    </div>

                    {/* Slide Preview */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        {slider.images.map((color, i) => (
                            <div key={i} style={{ width: 88, height: 54, borderRadius: 6, background: `linear-gradient(135deg, ${color}99, ${color})`, border: `1px solid ${color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700 }}>
                                Slide {i + 1}
                            </div>
                        ))}
                        <div style={{ width: 88, height: 54, borderRadius: 6, border: `2px dashed ${isDarkMode ? '#434343' : '#d9d9d9'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8c8c8c' }}>
                            <PlusOutlined />
                        </div>
                    </div>
                    {!slider.enabled && <Tag color="error" style={{ marginTop: 10 }}>Disabled</Tag>}
                </Card>
            ))}
        </div>
    );
};

// ─── Store Category Slider ─────────────────────────────────────────────────────
export const StoreCategorySlider = () => {
    const { isDarkMode } = useTheme();
    const [cats, setCats] = useState(mockCategories);
    const [sliderOn, setSliderOn] = useState(true);
    const [labelOn, setLabelOn] = useState(true);

    const cardStyle = {
        borderRadius: 10,
        border: isDarkMode ? '1px solid #303030' : '1px solid #e8e8e8',
        boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: 16,
    };

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>STORE CATEGORY SLIDER</Text>
                <Space>
                    <Button>Manage All Categories</Button>
                    <Button type="primary" icon={<PlusOutlined />}>Add New Store Category</Button>
                </Space>
            </div>

            <Card style={cardStyle} bodyStyle={{ padding: 20 }}>
                <Space size={32}>
                    <Space><Switch checked={sliderOn} onChange={setSliderOn} /><Text>Enable Store Category Slider</Text></Space>
                    <Space><Switch checked={labelOn} onChange={setLabelOn} /><Text>Show Label</Text></Space>
                </Space>
            </Card>

            <Card style={cardStyle} bodyStyle={{ padding: 20 }}>
                <Text strong style={{ display: 'block', marginBottom: 16 }}>Store Categories</Text>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                    {cats.map(cat => (
                        <div key={cat.key} onClick={() => setCats(prev => prev.map(c => c.key === cat.key ? { ...c, enabled: !c.enabled } : c))}
                            style={{
                                padding: '8px 16px', borderRadius: 20, cursor: 'pointer', userSelect: 'none',
                                background: cat.enabled ? (isDarkMode ? '#162312' : '#f6ffed') : (isDarkMode ? '#1f1f1f' : '#fafafa'),
                                border: `1px solid ${cat.enabled ? '#52c41a' : (isDarkMode ? '#434343' : '#d9d9d9')}`,
                                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
                            }}>
                            <span style={{ fontSize: 16 }}>{cat.icon}</span>
                            <Text style={{ fontSize: 13, color: cat.enabled ? '#237804' : '#8c8c8c', fontWeight: cat.enabled ? 600 : 400 }}>{cat.name}</Text>
                            {!cat.enabled && <Tag style={{ marginLeft: 2, fontSize: 10, padding: '0 4px', borderRadius: 3 }}>Hidden</Tag>}
                        </div>
                    ))}
                </div>
                <Space wrap>
                    <Button type="primary">Save Settings</Button>
                    <Button>Manage Restaurant Categories</Button>
                    <Button>Manage Meat Stores Categories</Button>
                </Space>
            </Card>
        </div>
    );
};
