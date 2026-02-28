import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Badge, Modal,
    Form, Select, Row, Col, Upload, InputNumber, message, Avatar, Switch, Tooltip, Tabs
} from 'antd';
import {
    PlusOutlined, UploadOutlined, DownloadOutlined, ReloadOutlined,
    EditOutlined, SearchOutlined, InboxOutlined, ExclamationCircleOutlined,
    DeleteOutlined, EyeOutlined, PoweroffOutlined, AppstoreOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const mockCategories = [
    { key: '1', id: 1, name: 'Biryani', store: 'Buchi Biryani Point', image: 'https://i.pravatar.cc/40?img=1', createdBy: 'Admin', createdAt: '5 months ago', updatedAt: '2 months ago', status: true },
    { key: '2', id: 2, name: 'Soups', store: 'Buchi Biryani Point', image: 'https://i.pravatar.cc/40?img=2', createdBy: 'Admin', createdAt: '5 months ago', updatedAt: '3 months ago', status: true },
    { key: '3', id: 3, name: 'Milk Shakes', store: 'Apsara Badam Milk', image: 'https://i.pravatar.cc/40?img=3', createdBy: 'Admin', createdAt: '6 months ago', updatedAt: '4 months ago', status: true },
    { key: '4', id: 4, name: 'Thick Shakes', store: 'Apsara Badam Milk', image: 'https://i.pravatar.cc/40?img=4', createdBy: 'Admin', createdAt: '6 months ago', updatedAt: '4 months ago', status: true },
    { key: '5', id: 5, name: 'French Fries', store: 'Cool & Spicy', image: 'https://i.pravatar.cc/40?img=5', createdBy: 'Admin', createdAt: '6 months ago', updatedAt: '5 months ago', status: false },
    { key: '6', id: 6, name: 'Ice Creams', store: 'Sri Sai Ice-Cream & Juices', image: 'https://i.pravatar.cc/40?img=6', createdBy: 'Admin', createdAt: '6 months ago', updatedAt: '5 months ago', status: true },
    { key: '7', id: 7, name: 'Lassi', store: 'Lassi shop', image: 'https://i.pravatar.cc/40?img=7', createdBy: 'Store Owner', createdAt: '5 months ago', updatedAt: '2 months ago', status: true },
];

export const MenuCategories = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockCategories);
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    const handleToggle = (id) => {
        setData(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
        message.success('Status updated');
    };

    const handleDelete = (id, name) => {
        Modal.confirm({
            title: `Delete category "${name}"?`,
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
                message.success('Category updated!');
            } else {
                const id = Math.max(...data.map(d => d.id)) + 1;
                setData(prev => [...prev, { key: String(id), id, ...vals, createdBy: 'Admin', createdAt: 'Just now', updatedAt: 'Just now', status: true }]);
                message.success('Category created!');
            }
            setIsModalOpen(false);
        });
    };

    const filtered = data.filter(d =>
        d.name.toLowerCase().includes(searchText.toLowerCase()) ||
        d.store.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'ID', dataIndex: 'id', key: 'id', width: 60,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Name', dataIndex: 'name', key: 'name',
            render: (text, record) => (
                <Text
                    style={{ color: '#1890ff', cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => openEdit(record)}
                >
                    {text}
                </Text>
            )
        },
        {
            title: 'Store', dataIndex: 'store', key: 'store',
            render: t => <Text style={{ color: '#1890ff', cursor: 'pointer' }}>{t}</Text>
        },
        {
            title: 'Image', dataIndex: 'image', key: 'image',
            render: src => src
                ? <Avatar src={src} shape="square" size={36} />
                : <Avatar shape="square" size={36} icon={<AppstoreOutlined />} style={{ background: '#f0f0f0', color: '#bfbfbf' }} />
        },
        { title: 'Created By', dataIndex: 'createdBy', key: 'createdBy', render: t => <Text type="secondary">{t}</Text> },
        {
            title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', sorter: true,
            render: t => <Text type="secondary" style={{ fontSize: 13 }}>{t}</Text>
        },
        {
            title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt',
            render: t => <Text type="secondary" style={{ fontSize: 13 }}>{t}</Text>
        },
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
                    <Button size="small" style={{ background: '#1890ff', borderColor: '#1890ff', color: '#fff', borderRadius: 4, fontWeight: 600, fontSize: 12 }}
                        onClick={() => message.info(`Viewing ${record.name}`)}>View</Button>
                    <Button size="small" style={{
                        background: isDarkMode ? '#262626' : '#f0f0f0',
                        borderColor: isDarkMode ? '#434343' : '#d9d9d9',
                        color: isDarkMode ? '#d9d9d9' : '#595959',
                        borderRadius: 4, fontWeight: 600, fontSize: 12
                    }} onClick={() => openEdit(record)}>Edit</Button>
                    <Tooltip title={record.status ? 'Deactivate' : 'Activate'}>
                        <Button size="small" icon={<PoweroffOutlined />}
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

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };

    return (
        <div style={{ paddingBottom: 24 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>TOTAL</Text>
                    <Tooltip title="Total menu categories">
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700, cursor: 'pointer' }}>i</span>
                    </Tooltip>
                    <Text style={{ fontWeight: 700, fontSize: 15 }}>{data.length} Categories</Text>
                </Space>

                <Space wrap size={8}>
                    <Input
                        placeholder="Search..."
                        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 220, borderRadius: 6, background: isDarkMode ? '#1f1f1f' : '#f5f5f5', border: 'none' }}
                        value={searchText} onChange={e => setSearchText(e.target.value)} allowClear
                    />
                    <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
                    <Button icon={<UploadOutlined />}>Bulk Import</Button>
                    <Button icon={<ReloadOutlined />} onClick={() => setSearchText('')} />
                    <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Add New Category</Button>
                </Space>
            </div>

            {/* Bulk Action Bar */}
            {selectedRowKeys.length > 0 && (
                <div style={{ marginBottom: 12, padding: '10px 20px', background: '#e6f4ff', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong style={{ color: '#0958d9' }}>{selectedRowKeys.length} selected</Text>
                    <Space>
                        <Button size="small" type="primary" ghost onClick={() => { setData(prev => prev.map(d => selectedRowKeys.includes(d.id) ? { ...d, status: true } : d)); setSelectedRowKeys([]); }}>Activate All</Button>
                        <Button size="small" danger onClick={() => { setData(prev => prev.map(d => selectedRowKeys.includes(d.id) ? { ...d, status: false } : d)); setSelectedRowKeys([]); }}>Deactivate All</Button>
                        <Button size="small" danger onClick={() => { setData(prev => prev.filter(d => !selectedRowKeys.includes(d.id))); setSelectedRowKeys([]); message.success('Deleted.'); }}>Delete Selected</Button>
                    </Space>
                </div>
            )}

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <Table
                    rowSelection={{ selectedRowKeys, onChange: keys => setSelectedRowKeys(keys) }}
                    columns={columns}
                    dataSource={filtered}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                    scroll={{ x: 1000 }}
                    rowHoverable size="middle"
                />
            </Card>

            {/* Add/Edit Modal */}
            <Modal
                title={<Space><AppstoreOutlined style={{ color: '#1890ff' }} /><Text strong>{editingRecord ? 'Edit Category' : 'Add New Category'}</Text></Space>}
                open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={700}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>{editingRecord ? 'Update' : 'Create'}</Button>
                ]}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Category Name" name="name" rules={[{ required: true }]}>
                                <Input placeholder="e.g. Biryani" onChange={e => form.setFieldsValue({ slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Slug" name="slug"><Input placeholder="auto-generated" /></Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Store" name="store" rules={[{ required: true }]}>
                                <Select placeholder="Select Store">
                                    {['Buchi Biryani Point', 'Apsara Badam Milk', 'Cool & Spicy', 'Lassi shop', 'Sri Sai Ice-Cream & Juices'].map(s => <Option key={s} value={s}>{s}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Parent Category (optional)" name="parent">
                                <Select allowClear placeholder="None (root level)">
                                    {data.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={3} placeholder="Category description..." />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={8}><Form.Item label="Display Order" name="order"><InputNumber min={1} style={{ width: '100%' }} /></Form.Item></Col>
                        <Col span={8}><Form.Item label="Commission Override %" name="commission"><InputNumber min={0} max={100} style={{ width: '100%' }} /></Form.Item></Col>
                        <Col span={8}><Form.Item label="Tax Override %" name="tax"><InputNumber min={0} max={40} style={{ width: '100%' }} /></Form.Item></Col>
                    </Row>
                    <Form.Item label="Category Image">
                        <Upload.Dragger accept=".jpg,.jpeg,.png,.webp" maxCount={1} listType="picture">
                            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                            <p className="ant-upload-text">Click or drag image · Max 2MB</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
