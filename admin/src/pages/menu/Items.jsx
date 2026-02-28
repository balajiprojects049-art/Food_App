import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Modal, Form,
    Select, Row, Col, Upload, InputNumber, message, Avatar, Switch,
    Rate, Tooltip, Tabs
} from 'antd';
import {
    PlusOutlined, UploadOutlined, DownloadOutlined, ReloadOutlined,
    EditOutlined, SearchOutlined, DeleteOutlined, PoweroffOutlined,
    CopyOutlined, InboxOutlined, DollarOutlined, AppstoreOutlined,
    ClockCircleOutlined, FireOutlined, PictureOutlined, CalendarOutlined,
    SettingOutlined, MoreOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Text } = Typography;
const { Option } = Select;

const mockItems = [
    { key: '1', id: 1, name: 'Chicken Biryani', image: 'https://i.pravatar.cc/40?img=20', store: 'Buchi Biryani Point', category: 'Biryani', subCategory: 'Non-Veg Biryani', basePrice: 180, discount: 10, finalPrice: 162, stock: 50, isVeg: false, popular: true, rating: 4.7, prepTime: '20 mins', createdAt: '5 months ago', status: true },
    { key: '2', id: 2, name: 'Veg Biryani', image: 'https://i.pravatar.cc/40?img=21', store: 'Buchi Biryani Point', category: 'Biryani', subCategory: 'Veg Biryani', basePrice: 120, discount: 5, finalPrice: 114, stock: 30, isVeg: true, popular: false, rating: 4.2, prepTime: '15 mins', createdAt: '5 months ago', status: true },
    { key: '3', id: 3, name: 'Mango Shake', image: 'https://i.pravatar.cc/40?img=22', store: 'Apsara Badam Milk', category: 'Milk Shakes', subCategory: 'Fruit Shakes', basePrice: 80, discount: 0, finalPrice: 80, stock: 25, isVeg: true, popular: true, rating: 4.9, prepTime: '5 mins', createdAt: '6 months ago', status: true },
    { key: '4', id: 4, name: 'French Fries', image: 'https://i.pravatar.cc/40?img=23', store: 'Cool & Spicy', category: 'French Fries', subCategory: 'Regular', basePrice: 60, discount: 0, finalPrice: 60, stock: 0, isVeg: true, popular: false, rating: 3.8, prepTime: '10 mins', createdAt: '6 months ago', status: false },
    { key: '5', id: 5, name: 'Butter Chicken', image: 'https://i.pravatar.cc/40?img=24', store: 'Reddy Meals', category: 'Curries', subCategory: 'Non-Veg Curries', basePrice: 220, discount: 15, finalPrice: 187, stock: 10, isVeg: false, popular: true, rating: 4.5, prepTime: '25 mins', createdAt: '5 months ago', status: true },
    { key: '6', id: 6, name: 'Vanilla Ice Cream', image: 'https://i.pravatar.cc/40?img=25', store: 'Sri Sai Ice-Cream', category: 'Ice Creams', subCategory: 'Scoops', basePrice: 50, discount: 0, finalPrice: 50, stock: 40, isVeg: true, popular: false, rating: 4.1, prepTime: '2 mins', createdAt: '6 months ago', status: true },
];

const StatusTag = ({ val }) => (
    <Tag style={{ border: `1px solid ${val ? '#b7eb8f' : '#ffa39e'}`, color: val ? '#389e0d' : '#cf1322', background: val ? '#f6ffed' : '#fff1f0', borderRadius: 3, fontWeight: 600, padding: '1px 10px', fontSize: 12 }}>
        {val ? 'Active' : 'Inactive'}
    </Tag>
);

export const Items = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockItems);
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    const calcFinal = () => {
        const base = form.getFieldValue('basePrice') || 0;
        const disc = form.getFieldValue('discount') || 0;
        const tax = form.getFieldValue('tax') || 0;
        const discPrice = base - (base * disc / 100);
        form.setFieldsValue({ discountPrice: Math.round(discPrice), finalPrice: Math.round(discPrice + discPrice * tax / 100) });
    };

    const handleToggle = id => { setData(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d)); message.success('Status updated'); };
    const openEdit = r => { setEditingRecord(r); form.setFieldsValue(r); setIsModalOpen(true); };
    const openAdd = () => { setEditingRecord(null); form.resetFields(); setIsModalOpen(true); };
    const handleSave = () => {
        form.validateFields().then(vals => {
            if (editingRecord) { setData(prev => prev.map(d => d.id === editingRecord.id ? { ...d, ...vals } : d)); message.success('Updated!'); }
            else { const id = Math.max(...data.map(d => d.id)) + 1; setData(prev => [...prev, { key: String(id), id, ...vals, rating: 0, createdAt: 'Just now', status: true }]); message.success('Created!'); }
            setIsModalOpen(false);
        });
    };

    const filtered = data.filter(d =>
        d.name.toLowerCase().includes(searchText.toLowerCase()) ||
        d.store.toLowerCase().includes(searchText.toLowerCase()) ||
        d.category.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 55, sorter: (a, b) => a.id - b.id },
        { title: 'Image', dataIndex: 'image', key: 'image', width: 65, render: src => <Avatar src={src} shape="square" size={36} /> },
        {
            title: 'Name', dataIndex: 'name', key: 'name',
            render: (name, r) => (
                <Space direction="vertical" size={2}>
                    <Space size={4}>
                        <Text style={{ color: '#1890ff', cursor: 'pointer', fontWeight: 500 }} onClick={() => openEdit(r)}>{name}</Text>
                        {r.popular && <Tag color="error" style={{ fontSize: 10, padding: '0 4px', border: 'none', borderRadius: 3 }}>🔥 Popular</Tag>}
                    </Space>
                    <Tag color={r.isVeg ? '#52c41a' : '#ff4d4f'} style={{ fontSize: 10, borderRadius: 2, margin: 0 }}>{r.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</Tag>
                </Space>
            )
        },
        { title: 'Store', dataIndex: 'store', key: 'store', render: t => <Text style={{ color: '#1890ff', fontSize: 13 }}>{t}</Text> },
        { title: 'Category', dataIndex: 'category', key: 'category', render: t => <Tag>{t}</Tag> },
        {
            title: 'Pricing', key: 'pricing', render: (_, r) => (
                <Space direction="vertical" size={0}>
                    {r.discount > 0 && <Text delete type="secondary" style={{ fontSize: 11 }}>₹{r.basePrice}</Text>}
                    <Text strong style={{ color: '#52c41a', fontSize: 14 }}>₹{r.finalPrice}</Text>
                    {r.discount > 0 && <Tag color="orange" style={{ fontSize: 10, padding: '0 4px', margin: 0 }}>{r.discount}% OFF</Tag>}
                </Space>
            )
        },
        { title: 'Stock', dataIndex: 'stock', key: 'stock', render: qty => <Tag color={qty === 0 ? '#ff4d4f' : qty < 10 ? 'warning' : 'success'}>{qty === 0 ? 'Out of Stock' : `${qty} left`}</Tag> },
        { title: 'Rating', dataIndex: 'rating', key: 'rating', render: v => <Space size={4}><Rate disabled value={Math.round(v)} count={5} style={{ fontSize: 11 }} /><Text style={{ fontSize: 12 }}>{v}</Text></Space> },
        { title: 'Prep', dataIndex: 'prepTime', key: 'prepTime', render: t => <Text type="secondary" style={{ fontSize: 12 }}><ClockCircleOutlined /> {t}</Text> },
        { title: 'Created', dataIndex: 'createdAt', key: 'createdAt', render: t => <Text type="secondary" style={{ fontSize: 13 }}>{t}</Text> },
        { title: 'Status', dataIndex: 'status', key: 'status', width: 95, render: val => <StatusTag val={val} /> },
        {
            title: '', key: 'actions', width: 155,
            render: (_, record) => (
                <Space size={4}>
                    <Button size="small" style={{ background: '#1890ff', borderColor: '#1890ff', color: '#fff', borderRadius: 4, fontWeight: 600, fontSize: 12 }} onClick={() => message.info(`Viewing ${record.name}`)}>View</Button>
                    <Button size="small" style={{ background: isDarkMode ? '#262626' : '#f0f0f0', borderColor: isDarkMode ? '#434343' : '#d9d9d9', color: isDarkMode ? '#d9d9d9' : '#595959', borderRadius: 4, fontWeight: 600, fontSize: 12 }} onClick={() => openEdit(record)}>Edit</Button>
                    <Tooltip title={record.status ? 'Deactivate' : 'Activate'}>
                        <Button size="small" icon={<PoweroffOutlined />} onClick={() => handleToggle(record.id)}
                            style={{ background: record.status ? '#52c41a' : '#ff4d4f', borderColor: record.status ? '#52c41a' : '#ff4d4f', color: '#fff', borderRadius: 4, padding: '0 8px' }} />
                    </Tooltip>
                </Space>
            )
        }
    ];

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const tabItems = [
        {
            key: '1', label: 'Basic Info', icon: <AppstoreOutlined />,
            children: (
                <>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="Item Name" name="name" rules={[{ required: true }]}><Input onChange={e => form.setFieldsValue({ slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} /></Form.Item></Col>
                        <Col span={12}><Form.Item label="Slug" name="slug"><Input /></Form.Item></Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}><Form.Item label="Store" name="store" rules={[{ required: true }]}><Select placeholder="Select Store">{['Buchi Biryani Point', 'Apsara Badam Milk', 'Cool & Spicy', 'Reddy Meals'].map(s => <Option key={s} value={s}>{s}</Option>)}</Select></Form.Item></Col>
                        <Col span={8}><Form.Item label="Category" name="category" rules={[{ required: true }]}><Select placeholder="Category">{['Biryani', 'Milk Shakes', 'French Fries', 'Ice Creams', 'Curries'].map(c => <Option key={c} value={c}>{c}</Option>)}</Select></Form.Item></Col>
                        <Col span={8}><Form.Item label="Type" name="isVeg"><Select><Option value={true}>🟢 Vegetarian</Option><Option value={false}>🔴 Non-Vegetarian</Option></Select></Form.Item></Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}><Form.Item label="Prep Time (mins)" name="prepTime"><InputNumber min={1} max={120} style={{ width: '100%' }} /></Form.Item></Col>
                        <Col span={16}><Form.Item label="Tags" name="tags"><Select mode="tags" placeholder="Bestseller, Spicy..." /></Form.Item></Col>
                    </Row>
                    <Form.Item label="Description" name="description"><Input.TextArea rows={3} /></Form.Item>
                </>
            )
        },
        {
            key: '2', label: 'Pricing', icon: <DollarOutlined />,
            children: (
                <>
                    <Row gutter={16}>
                        <Col span={8}><Form.Item label="Base Price (₹)" name="basePrice" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} onChange={calcFinal} /></Form.Item></Col>
                        <Col span={8}><Form.Item label="Discount (%)" name="discount"><InputNumber min={0} max={100} style={{ width: '100%' }} onChange={calcFinal} /></Form.Item></Col>
                        <Col span={8}><Form.Item label="Tax/GST (%)" name="tax"><InputNumber min={0} max={40} style={{ width: '100%' }} onChange={calcFinal} /></Form.Item></Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="Discounted Price (₹)" name="discountPrice"><InputNumber style={{ width: '100%' }} disabled /></Form.Item></Col>
                        <Col span={12}><Form.Item label="Final Price (₹) — Auto Calculated" name="finalPrice"><InputNumber style={{ width: '100%', background: '#f6ffed' }} disabled /></Form.Item></Col>
                    </Row>
                    <Form.Item label="Surge Pricing Eligible" name="surgeEligible" valuePropName="checked"><Switch checkedChildren="Yes" unCheckedChildren="No" /></Form.Item>
                </>
            )
        },
        {
            key: '3', label: 'Variants', icon: <SettingOutlined />,
            children: (
                <Form.List name="variants" initialValue={[{}]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...rest }) => (
                                <Card key={key} size="small" style={{ marginBottom: 12, background: isDarkMode ? '#1f1f1f' : '#fafafa' }}>
                                    <Row gutter={12}>
                                        <Col span={5}><Form.Item {...rest} name={[name, 'label']} label="Name"><Input placeholder="Half" /></Form.Item></Col>
                                        <Col span={4}><Form.Item {...rest} name={[name, 'price']} label="Price (₹)"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
                                        <Col span={4}><Form.Item {...rest} name={[name, 'discount']} label="Discount %"><InputNumber min={0} max={100} style={{ width: '100%' }} /></Form.Item></Col>
                                        <Col span={4}><Form.Item {...rest} name={[name, 'stock']} label="Stock"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
                                        <Col span={4}><Form.Item {...rest} name={[name, 'sku']} label="SKU"><Input placeholder="CHK-HALF" /></Form.Item></Col>
                                        <Col span={3} style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 24 }}><Button danger size="small" onClick={() => remove(name)}>Remove</Button></Col>
                                    </Row>
                                </Card>
                            ))}
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Variant</Button>
                        </>
                    )}
                </Form.List>
            )
        },
        {
            key: '4', label: 'Add-ons',
            children: (
                <Form.List name="addons" initialValue={[{}]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...rest }) => (
                                <Card key={key} size="small" style={{ marginBottom: 12, background: isDarkMode ? '#1f1f1f' : '#fafafa' }}>
                                    <Row gutter={12}>
                                        <Col span={6}><Form.Item {...rest} name={[name, 'label']} label="Name"><Input placeholder="Extra Cheese" /></Form.Item></Col>
                                        <Col span={4}><Form.Item {...rest} name={[name, 'price']} label="Price (₹)"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
                                        <Col span={4}><Form.Item {...rest} name={[name, 'required']} label="Required?"><Select><Option value={false}>Optional</Option><Option value={true}>Required</Option></Select></Form.Item></Col>
                                        <Col span={4}><Form.Item {...rest} name={[name, 'maxSel']} label="Max Select"><InputNumber min={1} style={{ width: '100%' }} /></Form.Item></Col>
                                        <Col span={3} style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 24 }}><Button danger size="small" onClick={() => remove(name)}>Remove</Button></Col>
                                    </Row>
                                </Card>
                            ))}
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Add-on</Button>
                        </>
                    )}
                </Form.List>
            )
        },
        {
            key: '5', label: 'Inventory',
            children: (
                <>
                    <Row gutter={16}>
                        <Col span={8}><Form.Item label="Stock Quantity" name="stock"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
                        <Col span={8}><Form.Item label="Low Stock Threshold" name="lowStockThreshold"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item></Col>
                        <Col span={8}><Form.Item label="Supplier (optional)" name="supplier"><Input placeholder="e.g. Local Farm" /></Form.Item></Col>
                    </Row>
                    <Form.Item label="Auto-disable when stock = 0" name="autoDisable" valuePropName="checked"><Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked /></Form.Item>
                </>
            )
        },
        {
            key: '6', label: 'Schedule', icon: <CalendarOutlined />,
            children: (
                <>
                    <Form.Item label="Available Days" name="days">
                        <Select mode="multiple" placeholder="Select days">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <Option key={d} value={d}>{d}</Option>)}
                        </Select>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="Start Time" name="startTime"><Input type="time" /></Form.Item></Col>
                        <Col span={12}><Form.Item label="End Time" name="endTime"><Input type="time" /></Form.Item></Col>
                    </Row>
                </>
            )
        },
        {
            key: '7', label: 'Media', icon: <PictureOutlined />,
            children: (
                <Upload.Dragger accept=".jpg,.jpeg,.png,.webp" multiple listType="picture-card" style={{ marginBottom: 16 }}>
                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                    <p className="ant-upload-text">Click or drag item images here</p>
                    <p className="ant-upload-hint">Multiple images · Max 5MB each · JPG / PNG / WEBP</p>
                </Upload.Dragger>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>TOTAL</Text>
                    <Tooltip title="Total items"><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700, cursor: 'pointer' }}>i</span></Tooltip>
                    <Text style={{ fontWeight: 700, fontSize: 15 }}>{data.length} Items</Text>
                </Space>
                <Space wrap size={8}>
                    <Input placeholder="Search items..." prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 220, borderRadius: 6, background: isDarkMode ? '#1f1f1f' : '#f5f5f5', border: 'none' }}
                        value={searchText} onChange={e => setSearchText(e.target.value)} allowClear />
                    <Select defaultValue="All" style={{ width: 130 }}><Option value="All">All Status</Option><Option value="Active">Active</Option><Option value="Inactive">Inactive</Option></Select>
                    <Select defaultValue="All" style={{ width: 130 }}><Option value="All">All Types</Option><Option value="Veg">🟢 Veg Only</Option><Option value="NonVeg">🔴 Non-Veg</Option></Select>
                    <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export</Button>
                    <Button icon={<UploadOutlined />}>Bulk Upload</Button>
                    <Button icon={<ReloadOutlined />} onClick={() => setSearchText('')} />
                    <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Add New Item</Button>
                </Space>
            </div>

            {selectedRowKeys.length > 0 && (
                <div style={{ marginBottom: 12, padding: '10px 20px', background: '#e6f4ff', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong style={{ color: '#0958d9' }}>{selectedRowKeys.length} item(s) selected</Text>
                    <Space>
                        <Button size="small" type="primary" ghost>Bulk Activate</Button>
                        <Button size="small" danger>Bulk Deactivate</Button>
                        <Button size="small">Bulk Price Update</Button>
                        <Button size="small" danger onClick={() => { setData(prev => prev.filter(d => !selectedRowKeys.includes(d.id))); setSelectedRowKeys([]); }}>Delete All</Button>
                    </Space>
                </div>
            )}

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <Table
                    rowSelection={{ selectedRowKeys, onChange: keys => setSelectedRowKeys(keys) }}
                    columns={columns} dataSource={filtered}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }}
                    scroll={{ x: 1400 }} rowHoverable size="middle"
                />
            </Card>

            <Modal
                title={<Space><AppstoreOutlined style={{ color: '#1890ff' }} /><Text strong style={{ fontSize: 16 }}>{editingRecord ? 'Edit Item' : 'Add New Item'}</Text></Space>}
                open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={1000}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>Cancel</Button>,
                    <Button key="ok" type="primary" onClick={handleSave}>{editingRecord ? 'Update' : 'Create'} Item</Button>
                ]}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
                    <Tabs defaultActiveKey="1" tabPosition="left" size="small" items={tabItems} />
                </Form>
            </Modal>
        </div>
    );
};
