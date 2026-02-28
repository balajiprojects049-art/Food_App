import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Typography, Modal, Form, Input, InputNumber, Select, message, Divider, Alert } from 'antd';
import {
    PlusOutlined, EditOutlined, ToolOutlined, UserOutlined, ShopOutlined,
    SyncOutlined, EyeOutlined, CheckCircleOutlined, WarningOutlined, EnvironmentOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockDeliveryLocations } from './modulesData';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// ─── Utilities ────────────────────────────────────────────────────────────────
export const Utilities = () => {
    const { isDarkMode } = useTheme();
    const [otpModal, setOtpModal] = useState(false);
    const [otp, setOtp] = useState(null);

    const cardBg = {
        borderRadius: 8, border: isDarkMode ? '1px solid #303030' : '1px solid #e8e8e8',
        boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: 16,
    };

    const utilities = [
        {
            icon: <SyncOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
            title: 'Fix Duplicate Orders IDs',
            desc: 'Some orders may end up having duplicate IDs. Run this utility to fix those duplicate order IDs.',
            action: 'Fix Duplicate Order IDs',
            actionColor: '#1890ff',
            onClick: () => message.success('Duplicate order IDs fixed successfully!')
        },
        {
            icon: <EyeOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
            title: 'View Users OTP',
            desc: 'View OTP for any registered user by their phone number. For admin use only.',
            action: 'View OTP',
            actionColor: '#722ed1',
            onClick: () => { setOtp(Math.floor(100000 + Math.random() * 900000)); setOtpModal(true); }
        },
        {
            icon: <CheckCircleOutlined style={{ fontSize: 24, color: '#237804' }} />,
            title: 'Enable All Stores',
            desc: 'Force enable all stores in the platform immediately.',
            action: 'Enable All',
            actionColor: '#237804',
            onClick: () => message.success('All stores have been enabled!')
        },
        {
            icon: <WarningOutlined style={{ fontSize: 24, color: '#cf1322' }} />,
            title: 'Disable All Stores',
            desc: 'Force disable all stores in the platform immediately. Use with caution.',
            action: 'Disable All',
            actionColor: '#cf1322',
            isDanger: true,
            onClick: () => {
                Modal.confirm({
                    title: 'Are you sure?',
                    content: 'This will forcibly close ALL stores for all customers. This action is irreversible until you enable them again.',
                    okText: 'Yes, Disable All',
                    okButtonProps: { danger: true },
                    onOk: () => message.warning('All stores have been disabled!')
                });
            }
        },
        {
            icon: <ToolOutlined style={{ fontSize: 24, color: '#d46b08' }} />,
            title: 'Restore Items',
            desc: 'Restore any deleted items back to their original store and category.',
            action: 'Restore Items',
            actionColor: '#d46b08',
            onClick: () => message.info('No items to restore.')
        },
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <Text style={{ fontWeight: 700, fontSize: 16, display: 'block', marginBottom: 20 }}>UTILITIES</Text>
            <Alert
                message="Admin Only Tools"
                description="These utilities are powerful admin tools. Use them carefully as they may affect all users and stores."
                type="warning" showIcon
                style={{ marginBottom: 20, borderRadius: 8 }}
            />
            {utilities.map((u, i) => (
                <Card key={i} style={cardBg} bodyStyle={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Space size={16}>
                            <div style={{ width: 52, height: 52, borderRadius: 10, background: isDarkMode ? '#1f1f1f' : `${u.actionColor}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {u.icon}
                            </div>
                            <div>
                                <Text strong style={{ fontSize: 14, display: 'block' }}>{u.title}</Text>
                                <Text type="secondary" style={{ fontSize: 12 }}>{u.desc}</Text>
                            </div>
                        </Space>
                        <Button
                            type={u.isDanger ? 'primary' : 'default'}
                            danger={u.isDanger}
                            style={{ borderRadius: 6, minWidth: 130, borderColor: u.isDanger ? undefined : u.actionColor, color: u.isDanger ? undefined : u.actionColor }}
                            onClick={u.onClick}
                        >
                            {u.action}
                        </Button>
                    </div>
                </Card>
            ))}

            <Modal title="View User OTP" open={otpModal} onCancel={() => setOtpModal(false)} footer={null}>
                <Form layout="vertical" style={{ marginTop: 12 }}>
                    <Form.Item label="Phone Number">
                        <Input placeholder="Enter user phone number..." prefix="+91" />
                    </Form.Item>
                    {otp && (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Current OTP</Text>
                            <Text style={{ fontSize: 42, fontWeight: 900, letterSpacing: 8, color: '#722ed1', fontFamily: 'monospace' }}>{otp}</Text>
                        </div>
                    )}
                    <Button type="primary" block onClick={() => setOtp(Math.floor(100000 + Math.random() * 900000))}>Fetch OTP</Button>
                </Form>
            </Modal>
        </div>
    );
};

// ─── Custom Delivery Settings ──────────────────────────────────────────────────
export const CustomDeliverySettings = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockDeliveryLocations);
    const [modalOpen, setModalOpen] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const [form] = Form.useForm();

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const openAdd = () => { setEditRecord(null); form.resetFields(); setModalOpen(true); };
    const openEdit = (r) => { setEditRecord(r); form.setFieldsValue(r); setModalOpen(true); };

    const handleSave = () => {
        form.validateFields().then(vals => {
            if (editRecord) {
                setData(prev => prev.map(d => d.key === editRecord.key ? { ...d, ...vals } : d));
                message.success('Location updated!');
            } else {
                setData(prev => [...prev, { ...vals, key: String(Date.now()), id: prev.length + 1 }]);
                message.success('Delivery location added!');
            }
            setModalOpen(false);
            form.resetFields();
        });
    };

    const columns = [
        {
            title: 'Name', dataIndex: 'name', key: 'name',
            render: t => (
                <Space>
                    <EnvironmentOutlined style={{ color: '#1890ff' }} />
                    <Text style={{ fontWeight: 600, color: '#1890ff', whiteSpace: 'nowrap' }}>{t}</Text>
                </Space>
            )
        },
        { title: 'Description', dataIndex: 'description', key: 'description', render: t => <Text style={{ fontSize: 13 }}>{t}</Text> },
        {
            title: 'Delivery Charge', dataIndex: 'deliveryCharge', key: 'deliveryCharge',
            render: v => <Text strong style={{ color: '#cf1322', whiteSpace: 'nowrap' }}>₹ {v}.00</Text>
        },
        {
            title: 'Commission', dataIndex: 'commission', key: 'commission',
            render: v => <Tag style={{ borderRadius: 3, fontWeight: 600, fontSize: 11, color: '#531dab', background: '#f9f0ff', border: '1px solid #d3adf7', whiteSpace: 'nowrap' }}>{v}%</Tag>
        },
        {
            title: 'Free Delivery Threshold', dataIndex: 'freeDeliveryThreshold', key: 'freeDeliveryThreshold',
            render: v => <Text style={{ color: '#237804', fontWeight: 600, whiteSpace: 'nowrap' }}>₹ {v}.00</Text>
        },
        {
            title: 'Actions', key: 'actions', width: 130,
            render: (_, r) => (
                <Space size={4}>
                    <Button size="small" style={{ borderRadius: 4, fontSize: 12 }} icon={<EditOutlined />} onClick={() => openEdit(r)}>Edit</Button>
                    <Button size="small" style={{ borderRadius: 4, fontSize: 11, background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9', whiteSpace: 'nowrap' }}>Assign to Store</Button>
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>CUSTOM DELIVERY SETTINGS</Text>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Add New Location</Button>
            </div>
            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '12px 20px', borderBottom: borderStyle }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>💡 Set custom delivery charges and commission rates per zone/location. Assign locations to specific stores.</Text>
                </div>
                <div style={{ padding: '0 20px 20px' }}>
                    <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
                </div>
            </Card>

            <Modal title={<Text strong>{editRecord ? 'Edit Location' : 'Add New Location'}</Text>} open={modalOpen} onCancel={() => { setModalOpen(false); form.resetFields(); }} width={500}
                footer={[
                    <Button key="cancel" onClick={() => { setModalOpen(false); form.resetFields(); }}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>{editRecord ? 'Update' : 'SAVE'}</Button>
                ]}>
                <Form form={form} layout="vertical" style={{ marginTop: 12 }}>
                    <Form.Item label="Location Name:" name="name" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Buchireddypalem" />
                    </Form.Item>
                    <Form.Item label="Description:" name="description">
                        <Input placeholder="Zone description" />
                    </Form.Item>
                    <Form.Item label="Delivery Charge (₹):" name="deliveryCharge" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="e.g. 20" />
                    </Form.Item>
                    <Form.Item label="Commission (%):" name="commission" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={0} max={100} placeholder="e.g. 15" />
                    </Form.Item>
                    <Form.Item label="Free Delivery Threshold (₹):" name="freeDeliveryThreshold">
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="e.g. 199" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
