import React, { useState } from 'react';
import {
    Card, Table, Button, Space, Typography, Badge, Tag, Modal,
    Form, Input, Select, message, Tooltip, Switch, Row, Col, InputNumber
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
    PoweroffOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Title, Text } = Typography;

const mockSchedules = [
    {
        key: '1', id: 1,
        name: 'morning 7 AM to 10:30 AM and evening 5 PM to 10:30 PM',
        description: '7 AM to 10:30 AM and 5 PM to 10:30 PM',
        items: 0, categories: 0,
        createdAt: '5 months ago', status: true
    },
    {
        key: '2', id: 2,
        name: 'Lunch + Dinner (11:30 AM to 22:00)',
        description: 'Lunch + Dinner( 11:30 AM to 22:00)',
        items: 5, categories: 4,
        createdAt: '6 months ago', status: true
    },
    {
        key: '3', id: 3,
        name: 'Evening Tiffin\'s (5:00 pm to 10:30 pm)',
        description: 'Evening Tiffin\'s (5:00 pm to 10:30 pm)',
        items: 0, categories: 3,
        createdAt: '6 months ago', status: true
    },
    {
        key: '4', id: 4,
        name: 'Morning tiffins (7:00 to 10:30)',
        description: 'Morning tiffins (7:00 to 10:30)',
        items: 0, categories: 0,
        createdAt: '6 months ago', status: true
    },
];

// Highlight time-like words in name with colour
const HighlightedText = ({ text, isDarkMode }) => {
    const timePattern = /(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)|morning|evening|afternoon|night|Lunch|Dinner|Morning|Evening|tiffins|Tiffin)/gi;
    const parts = text.split(timePattern);
    return (
        <span>
            {parts.map((part, i) =>
                timePattern.test(part)
                    ? <span key={i} style={{ color: '#fa8c16', fontWeight: 500 }}>{part}</span>
                    : <span key={i}>{part}</span>
            )}
        </span>
    );
};

export const ItemSchedule = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockSchedules);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    const activeCount = data.filter(d => d.status).length;

    const handleToggleStatus = (id) => {
        setData(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
        message.success('Schedule status updated');
    };

    const handleDelete = (id, name) => {
        Modal.confirm({
            title: `Delete schedule "${name}"?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Delete', okType: 'danger',
            onOk: () => { setData(prev => prev.filter(d => d.id !== id)); message.success('Schedule deleted.'); }
        });
    };

    const openAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEdit = (record) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        form.validateFields().then(vals => {
            if (editingRecord) {
                setData(prev => prev.map(d => d.id === editingRecord.id ? { ...d, ...vals } : d));
                message.success('Schedule updated!');
            } else {
                const id = Math.max(...data.map(d => d.id)) + 1;
                setData(prev => [...prev, {
                    key: String(id), id,
                    ...vals,
                    items: 0, categories: 0,
                    createdAt: 'Just now', status: true
                }]);
                message.success('Schedule created!');
            }
            setIsModalOpen(false);
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Text
                    style={{ color: record.status ? '#1890ff' : '#8c8c8c', cursor: 'pointer', fontSize: 13 }}
                    onClick={() => openEdit(record)}
                >
                    <HighlightedText text={text} isDarkMode={isDarkMode} />
                </Text>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 90,
            render: (val) => (
                <Tag
                    style={{
                        border: `1px solid ${val ? '#b7eb8f' : '#ffa39e'}`,
                        color: val ? '#389e0d' : '#cf1322',
                        background: val ? '#f6ffed' : '#fff1f0',
                        borderRadius: 3, fontWeight: 600, padding: '1px 10px', fontSize: 12
                    }}
                >
                    {val ? 'Active' : 'Inactive'}
                </Tag>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: text => (
                <Text style={{ color: '#fa8c16', fontSize: 13, cursor: 'pointer' }}>
                    <HighlightedText text={text} isDarkMode={isDarkMode} />
                </Text>
            )
        },
        {
            title: 'Items',
            dataIndex: 'items',
            key: 'items',
            width: 80,
            render: v => <Text style={{ color: '#1890ff', fontWeight: 500 }}>{v}</Text>
        },
        {
            title: 'Item Categories',
            dataIndex: 'categories',
            key: 'categories',
            width: 130,
            render: v => <Text style={{ color: '#1890ff', fontWeight: 500 }}>{v}</Text>
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 130,
            render: t => <Text type="secondary" style={{ fontSize: 13 }}>{t}</Text>
        },
        {
            title: '',
            key: 'actions',
            width: 150,
            render: (_, record) => (
                <Space size={4}>
                    <Button
                        size="small"
                        style={{
                            background: '#1890ff', borderColor: '#1890ff', color: '#fff',
                            borderRadius: 4, fontWeight: 600, fontSize: 12
                        }}
                        onClick={() => message.info(`View: ${record.name}`)}
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
                            onClick={() => handleToggleStatus(record.id)}
                            style={{
                                background: record.status ? '#52c41a' : '#ff4d4f',
                                borderColor: record.status ? '#52c41a' : '#ff4d4f',
                                color: '#fff',
                                borderRadius: 4, padding: '0 8px'
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
            {/* Header exactly like Feastigo */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>TOTAL</Text>
                    <Tooltip title="Total schedules"><span style={{
                        width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: '#595959', fontWeight: 700, cursor: 'pointer'
                    }}>i</span></Tooltip>
                    <Text style={{ fontWeight: 700, fontSize: 15 }}>{data.length} Schedules</Text>
                </Space>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={openAdd}
                    style={{ fontWeight: 600 }}
                >
                    Add New Schedule
                </Button>
            </div>

            {/* Table */}
            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="middle"
                    style={{ borderRadius: 8 }}
                    rowClassName={() => 'schedule-row'}
                    rowHoverable
                />
            </Card>

            {/* Add/Edit Schedule Modal */}
            <Modal
                title={<Text strong style={{ fontSize: 16 }}>{editingRecord ? 'Edit Schedule' : 'Add New Schedule'}</Text>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
                okText={editingRecord ? 'Update' : 'Create Schedule'}
                width={560}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item
                        label="Schedule Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter a schedule name' }]}
                    >
                        <Input placeholder="e.g. Morning Breakfast (7 AM to 11 AM)" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter a description' }]}
                    >
                        <Input.TextArea rows={2} placeholder="e.g. 7 AM to 11 AM" />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Start Time" name="startTime">
                                <Input type="time" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="End Time" name="endTime">
                                <Input type="time" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Available Days" name="days">
                        <Select mode="multiple" placeholder="Select days (leave blank for all days)">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                <Select.Option key={d} value={d}>{d}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <style>{`
        .schedule-row:hover td { background: ${isDarkMode ? '#1a1a1a' : '#fafafa'} !important; }
      `}</style>
        </div>
    );
};
