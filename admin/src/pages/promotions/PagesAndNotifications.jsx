import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Modal,
    Form, Select, message, Tabs, Badge, Divider, Upload
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined, GlobalOutlined,
    BellOutlined, SendOutlined, UserOutlined, ShopOutlined, CarOutlined, UploadOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockPages } from './promotionsData';

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

// ─── Pages ────────────────────────────────────────────────────────────────────
export const Pages = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockPages);
    const [modalOpen, setModalOpen] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const [form] = Form.useForm();

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };

    const openAdd = () => { setEditRecord(null); form.resetFields(); setModalOpen(true); };
    const openEdit = (r) => { setEditRecord(r); form.setFieldsValue({ name: r.name, slug: r.slug }); setModalOpen(true); };

    const handleSave = () => {
        form.validateFields().then(vals => {
            if (editRecord) {
                setData(prev => prev.map(d => d.key === editRecord.key ? { ...d, ...vals, updated: 'Just now' } : d));
                message.success('Page updated!');
            } else {
                setData(prev => [...prev, { ...vals, key: String(Date.now()), id: prev.length + 1, created: 'Just now', updated: 'Just now' }]);
                message.success('Page created!');
            }
            setModalOpen(false);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Name', dataIndex: 'name', key: 'name',
            render: (t, r) => (
                <Space>
                    <GlobalOutlined style={{ color: '#1890ff' }} />
                    <Text style={{ color: '#1890ff', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>{t}</Text>
                </Space>
            )
        },
        {
            title: 'Slug', dataIndex: 'slug', key: 'slug',
            render: t => <Text style={{ fontFamily: 'monospace', color: '#8c8c8c', fontSize: 12, whiteSpace: 'nowrap' }}>/{t}</Text>
        },
        { title: 'Created', dataIndex: 'created', key: 'created', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Updated', dataIndex: 'updated', key: 'updated', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Actions', key: 'actions', width: 120,
            render: (_, r) => (
                <Space size={4}>
                    <Button type="primary" size="small" style={{ borderRadius: 4, fontSize: 12 }} icon={<EditOutlined />} onClick={() => openEdit(r)}>Edit</Button>
                    <Button size="small" danger ghost style={{ borderRadius: 4, fontSize: 12 }} icon={<DeleteOutlined />} />
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>PAGES</Text>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Add a New Page</Button>
            </div>
            <Card style={cardBg} bodyStyle={{ padding: '20px' }}>
                <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
            </Card>

            <Modal title={<Text strong>{editRecord ? 'Edit Page' : 'Add New Page'}</Text>}
                open={modalOpen} onCancel={() => { setModalOpen(false); form.resetFields(); }} width={520}
                footer={[
                    <Button key="cancel" onClick={() => { setModalOpen(false); form.resetFields(); }}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>{editRecord ? 'Update' : 'Create'}</Button>
                ]}>
                <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
                    <Form.Item label="Page Name" name="name" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Privacy Policy" />
                    </Form.Item>
                    <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
                        <Input placeholder="e.g. privacy-policy" addonBefore="/" />
                    </Form.Item>
                    <Form.Item label="Content" name="content">
                        <TextArea rows={6} placeholder="Page HTML content..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// ─── Send Push Notifications ──────────────────────────────────────────────────
export const SendNotifications = () => {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('all');
    const [form] = Form.useForm();

    const cardBg = {
        borderRadius: 10,
        border: isDarkMode ? '1px solid #303030' : '1px solid #e8e8e8',
        boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
    };

    const handleSend = () => {
        form.validateFields().then(() => {
            message.success('Notification sent successfully! 🔔');
            form.resetFields();
        });
    };

    const stats = [
        { label: 'REGISTERED CUSTOMERS', value: 5660, color: '#1890ff', bg: '#e6f4ff', border: '#91caff' },
        { label: 'SUBSCRIBERS', value: 4605, color: '#237804', bg: '#f6ffed', border: '#b7eb8f' },
        { label: 'APP USERS', value: 3229, color: '#531dab', bg: '#f9f0ff', border: '#d3adf7' },
    ];

    const tabItems = [
        { key: 'all', label: <Space><UserOutlined />To All</Space>, title: 'SEND PUSH NOTIFICATION & ALERT TO ALL USERS' },
        { key: 'selected', label: <Space><ShopOutlined />To Selected</Space>, title: 'SEND TO SELECTED USERS' },
        { key: 'nonreg', label: <Space><CarOutlined />To Non-Registered App Users</Space>, title: 'SEND TO NON-REGISTERED APP USERS' },
    ];

    const activeItem = tabItems.find(t => t.key === activeTab);

    return (
        <div style={{ paddingBottom: 24 }}>
            <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>SEND PUSH NOTIFICATIONS</Text>

            {/* Stat Cards */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                {stats.map(s => (
                    <div key={s.label} style={{ flex: 1, background: isDarkMode ? '#1f1f1f' : s.bg, border: `1px solid ${isDarkMode ? '#303030' : s.border}`, borderRadius: 8, padding: '20px 24px' }}>
                        <div style={{ fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value.toLocaleString()}</div>
                        <Text style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 600, textTransform: 'uppercase', marginTop: 6, display: 'block', letterSpacing: 0.5 }}>{s.label}</Text>
                    </div>
                ))}
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                {/* Tab Navigation */}
                <div style={{ display: 'flex', borderBottom: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0' }}>
                    {tabItems.map(tab => (
                        <div key={tab.key} onClick={() => setActiveTab(tab.key)}
                            style={{
                                padding: '14px 24px', cursor: 'pointer', fontWeight: activeTab === tab.key ? 600 : 400,
                                color: activeTab === tab.key ? '#1890ff' : isDarkMode ? '#8c8c8c' : '#595959',
                                borderBottom: activeTab === tab.key ? '2px solid #1890ff' : '2px solid transparent',
                                transition: 'all 0.2s', fontSize: 14, whiteSpace: 'nowrap',
                            }}>
                            {tab.label}
                        </div>
                    ))}
                </div>

                <div style={{ padding: 28 }}>
                    <Text strong style={{ fontSize: 13, color: '#8c8c8c', display: 'block', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 0.5 }}>{activeItem?.title}</Text>

                    <Form form={form} layout="vertical">
                        {/* Notification Image Upload */}
                        <Form.Item label="Notification Image:">
                            <div style={{ border: `2px dashed ${isDarkMode ? '#434343' : '#d9d9d9'}`, borderRadius: 8, padding: 40, textAlign: 'center', color: '#8c8c8c', cursor: 'pointer', background: isDarkMode ? '#141414' : '#fafafa' }}>
                                <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
                                <div style={{ fontSize: 13 }}>Drop files here to upload</div>
                                <Text type="secondary" style={{ fontSize: 11 }}>Image size: 1600x1100</Text>
                            </div>
                        </Form.Item>

                        {activeTab === 'selected' && (
                            <Form.Item label="Select Users" name="users" rules={[{ required: true }]}>
                                <Select mode="multiple" placeholder="Search and select users...">
                                    <Option value="1">Sk Sana — Customer</Option>
                                    <Option value="2">Harshitha — Customer</Option>
                                    <Option value="3">Mallikarjun — Delivery</Option>
                                </Select>
                            </Form.Item>
                        )}

                        <Form.Item label={<Text strong>*Notification Title:</Text>} name="title" rules={[{ required: true, message: 'Title required' }]}>
                            <Input placeholder="Notification Title" size="large" />
                        </Form.Item>
                        <Form.Item label={<Text strong>*Message:</Text>} name="message" rules={[{ required: true, message: 'Message required' }]}>
                            <Input placeholder="Notification Message" size="large" />
                        </Form.Item>
                        <Form.Item label="URL:" name="url">
                            <Input placeholder="This link will be opened when the notification is clicked" />
                        </Form.Item>
                        <Form.Item label="Zone:" name="zone" initialValue="all">
                            <Select>
                                <Option value="all">All Zones</Option>
                                <Option value="buchi">Buchireddypalem</Option>
                                <Option value="jonnawada">Jonnawada</Option>
                                <Option value="sangam">Sangam</Option>
                            </Select>
                        </Form.Item>

                        <div style={{ textAlign: 'right' }}>
                            <Button type="primary" size="large" icon={<SendOutlined />} onClick={handleSend}
                                style={{ borderRadius: 6, background: '#1890ff', paddingLeft: 28, paddingRight: 28 }}>
                                SEND
                            </Button>
                        </div>
                    </Form>
                </div>
            </Card>
        </div>
    );
};
