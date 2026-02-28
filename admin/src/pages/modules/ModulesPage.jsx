import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Typography, Switch, Modal, Form, Input, Select, message, Tooltip, Badge, Divider, Row, Col, InputNumber } from 'antd';
import { SettingOutlined, CloseOutlined, CheckOutlined, PlusOutlined, SortAscendingOutlined, EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockModules, mockStoreTypes } from './modulesData';

const { Text } = Typography;
const { Option } = Select;

// ─── Modules Page ──────────────────────────────────────────────────────────────
export const ModulesPage = () => {
    const { isDarkMode } = useTheme();
    const [modules, setModules] = useState(mockModules);

    const toggleModule = (key) => {
        setModules(prev => prev.map(m => m.key === key ? { ...m, status: m.status === 'Enabled' ? 'Disabled' : 'Enabled' } : m));
        message.success('Module status updated');
    };

    const cardBg = {
        borderRadius: 8, border: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0',
        boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: 12,
    };

    const columns = [
        {
            title: 'Name', dataIndex: 'name', key: 'name',
            render: t => <Text strong style={{ fontSize: 14, whiteSpace: 'nowrap' }}>{t}</Text>
        },
        {
            title: 'Description', dataIndex: 'description', key: 'description',
            render: t => <Text style={{ color: '#096dd9', fontSize: 13 }}>{t}</Text>
        },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: s => (
                <Tag style={{
                    whiteSpace: 'nowrap', borderRadius: 3, fontWeight: 600, fontSize: 11, padding: '0 10px',
                    color: s === 'Enabled' ? '#237804' : '#8c8c8c',
                    background: s === 'Enabled' ? '#f6ffed' : '#f5f5f5',
                    border: `1px solid ${s === 'Enabled' ? '#73d13d' : '#d9d9d9'}`
                }}>{s}</Tag>
            )
        },
        {
            title: '', key: 'actions', width: 200,
            render: (_, r) => (
                <Space size={8}>
                    <Button size="small" icon={<SettingOutlined />} style={{ borderRadius: 4, fontSize: 12 }}>Settings</Button>
                    <Button size="small"
                        icon={r.status === 'Enabled' ? <CloseOutlined /> : <CheckOutlined />}
                        style={{ borderRadius: 4, fontSize: 12, background: r.status === 'Enabled' ? '#cf1322' : '#237804', borderColor: r.status === 'Enabled' ? '#cf1322' : '#237804', color: '#fff' }}
                        onClick={() => toggleModule(r.key)}>
                        {r.status === 'Enabled' ? 'Disable' : 'Enable'}
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <Text style={{ fontWeight: 700, fontSize: 16, display: 'block', marginBottom: 20 }}>Modules</Text>
            <Card style={{ ...cardBg, marginBottom: 0 }} bodyStyle={{ padding: '0 20px 20px' }}>
                <Table columns={columns} dataSource={modules} pagination={false} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
            </Card>
        </div>
    );
};

// ─── Store Types ───────────────────────────────────────────────────────────────
export const StoreTypes = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockStoreTypes);
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const storeUIColors = { Restaurant: '#1890ff', Meat: '#cf1322', Grocery: '#52c41a', Pickups: '#fa8c16' };

    const handleSave = () => {
        form.validateFields().then(vals => {
            setData(prev => [...prev, { ...vals, key: String(Date.now()), id: prev.length + 1, image: null, status: 'Enabled', createdAt: 'Just now' }]);
            message.success('Store type created!');
            setModalOpen(false);
            form.resetFields();
        });
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', render: t => <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Description', dataIndex: 'description', key: 'description', render: t => <Text style={{ fontSize: 13 }}>{t}</Text> },
        {
            title: 'Store UI', dataIndex: 'storeUI', key: 'storeUI',
            render: t => {
                const c = storeUIColors[t] || '#595959';
                return <Tag style={{ whiteSpace: 'nowrap', borderRadius: 3, fontWeight: 600, fontSize: 11, color: c, background: `${c}18`, border: `1px solid ${c}44` }}>{t}</Tag>;
            }
        },
        {
            title: 'Image', key: 'image',
            render: (_, r) => (
                <div style={{ width: 48, height: 48, borderRadius: 6, background: isDarkMode ? '#262626' : '#f5f5f5', border: `1px solid ${isDarkMode ? '#434343' : '#e8e8e8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    {r.name === 'Restaurants' ? '🍽️' : r.name === 'Meat Stores' ? '🥩' : r.name === 'Grocery' ? '🛒' : r.name === 'Pickups' ? '🚴' : '🏪'}
                </div>
            )
        },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: s => <Tag style={{ whiteSpace: 'nowrap', borderRadius: 3, fontWeight: 600, fontSize: 11, color: s === 'Enabled' ? '#237804' : '#8c8c8c', background: s === 'Enabled' ? '#f6ffed' : '#f5f5f5', border: `1px solid ${s === 'Enabled' ? '#73d13d' : '#d9d9d9'}` }}>{s}</Tag>
        },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: '', key: 'actions', width: 120,
            render: (_, r) => (
                <Space size={4}>
                    <Button size="small" style={{ borderRadius: 4, fontSize: 12 }}>View</Button>
                    <Button size="small" danger ghost style={{ borderRadius: 4, fontSize: 12 }} icon={<DeleteOutlined />} />
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16 }}>Total</Text>
                    <Tooltip><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700 }}>i</span></Tooltip>
                    <Text strong style={{ fontSize: 16 }}>{data.length} Store Types</Text>
                </Space>
                <Space>
                    <Button icon={<SortAscendingOutlined />}>Sort Store Types</Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setModalOpen(true); }}>Add New Store Type</Button>
                </Space>
            </div>
            <Card style={cardBg} bodyStyle={{ padding: '20px' }}>
                <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
            </Card>

            <Modal title={<Text strong>Add New Store Type</Text>} open={modalOpen} onCancel={() => { setModalOpen(false); form.resetFields(); }} width={480}
                footer={[
                    <Button key="cancel" onClick={() => { setModalOpen(false); form.resetFields(); }}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>SAVE</Button>
                ]}>
                <Form form={form} layout="vertical" style={{ marginTop: 12 }}>
                    <Form.Item label="Name:" name="name" rules={[{ required: true }]}>
                        <Input placeholder="Store Type Name" />
                    </Form.Item>
                    <Form.Item label="Description:" name="description">
                        <Input placeholder="Store Type Description" />
                    </Form.Item>
                    <Form.Item label="Store UI" name="storeUI" initialValue="Restaurant">
                        <Select>
                            <Option value="Restaurant">Restaurant</Option>
                            <Option value="Meat">Meat</Option>
                            <Option value="Grocery">Grocery</Option>
                            <Option value="Pickups">Pickups</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Zone" name="zone" initialValue="Buchireddypalem">
                        <Select>
                            <Option value="Buchireddypalem">Buchireddypalem</Option>
                            <Option value="Jonnawada">Jonnawada</Option>
                            <Option value="Sangam">Sangam</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
