import React, { useState } from 'react';
import {
    Card, Table, Button, Space, Typography, Tag, Modal,
    Form, Input, Select, message, Tooltip, InputNumber, Switch
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined,
    ExclamationCircleOutlined, PoweroffOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Text } = Typography;

const mockAttribs = [
    { key: '1', id: 1, name: 'Extra Cheese', price: 20, required: false, maxSel: 1, createdAt: '5 months ago', status: true },
    { key: '2', id: 2, name: 'Extra Spicy', price: 0, required: false, maxSel: 1, createdAt: '5 months ago', status: true },
    { key: '3', id: 3, name: 'Combo Drink', price: 50, required: false, maxSel: 3, createdAt: '6 months ago', status: true },
    { key: '4', id: 4, name: 'Extra Gravy', price: 15, required: false, maxSel: 1, createdAt: '6 months ago', status: false },
    { key: '5', id: 5, name: 'Garlic Bread', price: 30, required: false, maxSel: 2, createdAt: '5 months ago', status: true },
];

export const ItemAttributes = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockAttribs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    const handleToggle = (id) => {
        setData(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
        message.success('Attribute status updated');
    };

    const handleDelete = (id, name) => {
        Modal.confirm({
            title: `Delete attribute "${name}"?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Delete', okType: 'danger',
            onOk: () => { setData(prev => prev.filter(d => d.id !== id)); message.success('Deleted.'); }
        });
    };

    const openEdit = (record) => { setEditingRecord(record); form.setFieldsValue(record); setIsModalOpen(true); };
    const openAdd = () => { setEditingRecord(null); form.resetFields(); setIsModalOpen(true); };
    const handleSave = () => {
        form.validateFields().then(vals => {
            if (editingRecord) {
                setData(prev => prev.map(d => d.id === editingRecord.id ? { ...d, ...vals } : d));
                message.success('Attribute updated!');
            } else {
                const id = Math.max(...data.map(d => d.id)) + 1;
                setData(prev => [...prev, { key: String(id), id, ...vals, createdAt: 'Just now', status: true }]);
                message.success('Attribute created!');
            }
            setIsModalOpen(false);
        });
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 60, sorter: (a, b) => a.id - b.id },
        {
            title: 'Name', dataIndex: 'name', key: 'name',
            render: (t, record) => (
                <Text
                    style={{ color: '#1890ff', cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => openEdit(record)}
                >
                    {t}
                </Text>
            )
        },
        {
            title: 'Additional Price', dataIndex: 'price', key: 'price',
            render: v => <Text>₹{v}</Text>
        },
        {
            title: 'Required?', dataIndex: 'required', key: 'required',
            render: v => (
                <Tag style={{
                    border: `1px solid ${v ? '#ffa39e' : '#b7eb8f'}`,
                    color: v ? '#cf1322' : '#389e0d',
                    background: v ? '#fff1f0' : '#f6ffed',
                    borderRadius: 3, fontWeight: 600, padding: '1px 10px', fontSize: 12
                }}>
                    {v ? 'Required' : 'Optional'}
                </Tag>
            )
        },
        { title: 'Max Selections', dataIndex: 'maxSel', key: 'maxSel', render: v => <Text>{v}</Text> },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: t => <Text type="secondary" style={{ fontSize: 13 }}>{t}</Text> },
        {
            title: 'Status', dataIndex: 'status', key: 'status', width: 95,
            render: val => (
                <Tag style={{
                    border: `1px solid ${val ? '#b7eb8f' : '#ffa39e'}`,
                    color: val ? '#389e0d' : '#cf1322',
                    background: val ? '#f6ffed' : '#fff1f0',
                    borderRadius: 3, fontWeight: 600, padding: '1px 10px', fontSize: 12
                }}>
                    {val ? 'Active' : 'Inactive'}
                </Tag>
            )
        },
        {
            title: '', key: 'actions', width: 155,
            render: (_, record) => (
                <Space size={4}>
                    <Button
                        size="small"
                        style={{ background: '#1890ff', borderColor: '#1890ff', color: '#fff', borderRadius: 4, fontWeight: 600, fontSize: 12 }}
                        onClick={() => message.info(`Viewing ${record.name}`)}
                    >
                        View
                    </Button>
                    <Button
                        size="small"
                        style={{
                            background: isDarkMode ? '#262626' : '#f0f0f0',
                            borderColor: isDarkMode ? '#434343' : '#d9d9d9',
                            color: isDarkMode ? '#d9d9d9' : '#595959',
                            borderRadius: 4, fontWeight: 600, fontSize: 12
                        }}
                        onClick={() => openEdit(record)}
                    >
                        Edit
                    </Button>
                    <Tooltip title={record.status ? 'Deactivate' : 'Activate'}>
                        <Button
                            size="small"
                            icon={<PoweroffOutlined />}
                            onClick={() => handleToggle(record.id)}
                            style={{
                                background: record.status ? '#52c41a' : '#ff4d4f',
                                borderColor: record.status ? '#52c41a' : '#ff4d4f',
                                color: '#fff', borderRadius: 4, padding: '0 8px'
                            }}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ];

    const cardBg = {
        borderRadius: 8, border: 'none',
        boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)'
    };

    return (
        <div style={{ paddingBottom: 24 }}>
            {/* Feastigo-style Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>TOTAL</Text>
                    <Tooltip title="Total item attributes">
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700, cursor: 'pointer' }}>i</span>
                    </Tooltip>
                    <Text style={{ fontWeight: 700, fontSize: 15 }}>{data.length} Attributes</Text>
                </Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Add New Attribute</Button>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                    rowHoverable size="middle"
                />
            </Card>

            {/* Add/Edit Modal */}
            <Modal
                title={<Text strong style={{ fontSize: 16 }}>{editingRecord ? 'Edit Attribute' : 'Add New Attribute'}</Text>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
                okText={editingRecord ? 'Update' : 'Create'}
                width={480}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item label="Attribute Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
                        <Input placeholder="e.g. Extra Cheese" />
                    </Form.Item>
                    <Form.Item label="Additional Price (₹)" name="price">
                        <InputNumber min={0} style={{ width: '100%' }} placeholder="0 for free add-on" />
                    </Form.Item>
                    <Form.Item label="Required or Optional?" name="required">
                        <Select>
                            <Select.Option value={false}>Optional</Select.Option>
                            <Select.Option value={true}>Required</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Max Selections" name="maxSel">
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
