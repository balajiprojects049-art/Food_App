import React, { useState, useRef } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Badge, Dropdown, Menu,
    Modal, Tabs, Form, Select, Row, Col, Switch, InputNumber, Upload, TimePicker,
    Popconfirm, Drawer, Slider, message, Avatar, Checkbox, Divider
} from 'antd';
import {
    SearchOutlined, PlusOutlined, UploadOutlined, DownloadOutlined, ReloadOutlined,
    EditOutlined, MoreOutlined, SwapOutlined, TeamOutlined, FilterOutlined,
    ExclamationCircleOutlined, SettingOutlined, ShopOutlined, RightOutlined,
    InboxOutlined, DollarOutlined, ClockCircleOutlined, SafetyCertificateOutlined,
    MenuOutlined
} from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

// Custom styled action button reflecting Feastigo UI
const CustomActionBtn = ({ icon, text, count, onClick, active }) => {
    const { isDarkMode } = useTheme();

    const btnStyle = {
        display: 'flex',
        alignItems: 'center',
        border: active ? '1px solid #1890ff' : (isDarkMode ? '1px solid #434343' : '1px solid #d9d9d9'),
        borderRadius: 4,
        background: isDarkMode ? '#141414' : '#fff',
        cursor: 'pointer',
        height: 32,
        overflow: 'hidden',
        transition: 'all 0.3s ease'
    };

    const content = (
        <div onClick={onClick} style={btnStyle}>
            <div style={{
                padding: '0 10px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                background: isDarkMode ? '#262626' : '#f0f0f0',
                borderRight: isDarkMode ? '1px solid #434343' : '1px solid #d9d9d9',
                color: isDarkMode ? '#a6a6a6' : '#595959'
            }}>
                {icon}
            </div>
            <div style={{ padding: '0 12px', fontSize: 13, color: isDarkMode ? '#e6e6e6' : '#262626', fontWeight: 500 }}>
                {text}
            </div>
        </div>
    );

    if (count !== undefined && count > 0) {
        return (
            <Badge count={count} color="#ff4d4f" style={{ zIndex: 1 }} offset={[-5, 5]}>
                {content}
            </Badge>
        );
    }
    return content;
};

// Buchi Mandal Mock Data mapped exactly to the required data shapes
const mockStoresData = [
    {
        key: '1', storeId: '1', image: 'https://i.pravatar.cc/150?img=11', name: 'Demo Store',
        areaText: 'Areas: None\nZone: Buchireddypalem', owner: 'Demo Owner', joinedDate: '2023-10-06 10:22 PM',
        status: 'Forcefully Closed', rating: 4.5, orders: 120, revenue: 45000, commission: 15, sla: 98
    },
    {
        key: '3', storeId: '3', image: 'https://i.pravatar.cc/150?img=12', name: 'Rever',
        areaText: 'Areas: buchi zone 1\nZone: Buchireddypalem', owner: 'Anand M', joinedDate: '2025-08-24 09:21 PM',
        status: 'Automatic Currently Open', rating: 4.8, orders: 400, revenue: 150000, commission: 10, sla: 99
    },
    {
        key: '4', storeId: '4', image: 'https://i.pravatar.cc/150?img=13', name: 'Cool & Spicy',
        areaText: 'Areas: buchi zone 1\nZone: Buchireddypalem', owner: 'Sukumar', joinedDate: '2025-08-24 11:07 PM',
        status: 'Forcefully Open', rating: 4.2, orders: 310, revenue: 125000, commission: 20, sla: 92
    },
    {
        key: '5', storeId: '5', image: 'https://i.pravatar.cc/150?img=14', name: 'Apsara Badam Milk',
        areaText: 'Areas: buchi zone 1\nZone: Buchireddypalem', owner: 'MADHU KRISHNA S', joinedDate: '2025-08-24 11:39 PM',
        status: 'Automatic Currently Open', rating: 4.9, orders: 500, revenue: 80000, commission: 12, sla: 100
    },
    {
        key: '6', storeId: '6', image: 'https://i.pravatar.cc/150?img=15', name: 'Lassi shop',
        areaText: 'Areas: buchi zone 1\nZone: Buchireddypalem', owner: 'Mohammad Riyazuddin SK', joinedDate: '2025-08-24 11:48 PM',
        status: 'Automatic Currently Open', rating: 4.1, orders: 150, revenue: 45000, commission: 15, sla: 90
    },
    {
        key: '7', storeId: '7', image: 'https://i.pravatar.cc/150?img=16', name: 'Hello Habibi',
        areaText: 'Areas: buchi zone 1\nZone: Buchireddypalem', owner: 'Habibi', joinedDate: '2025-08-24 11:58 PM',
        status: 'Forcefully Closed', rating: 3.5, orders: 80, revenue: 20000, commission: 18, sla: 85
    }
];

export const Stores = () => {
    const { isDarkMode } = useTheme();
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [isSortView, setIsSortView] = useState(false);
    const [storesData, setStoresData] = useState(mockStoresData);

    const dragItem = useRef();
    const dragOverItem = useRef();

    const handleDragStart = (e, position) => {
        dragItem.current = position;
    };

    const handleDragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const handleDrop = (e) => {
        const copyListItems = [...storesData];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setStoresData(copyListItems);
        message.success('Store order updated successfully');
    };

    const [form] = Form.useForm();

    // Status Badge formatting mapping to Feastigo styling
    const getStatusBadge = (status) => {
        if (status === 'Forcefully Closed') return <Tag color="#ff4d4f" style={{ margin: 0, fontWeight: 600, border: 'none', borderRadius: 4 }}>Forcefully Closed</Tag>;
        if (status === 'Forcefully Open') return <Tag color="#13c2c2" style={{ margin: 0, fontWeight: 600, border: 'none', borderRadius: 4 }}>Forcefully Open</Tag>;
        if (status === 'Automatic Currently Open') return (
            <div style={{ background: '#262626', color: '#fff', padding: '4px 8px', borderRadius: 4, display: 'inline-block', fontSize: 10, lineHeight: '1.2', textAlign: 'center', fontWeight: 600 }}>
                Automatic<br />Currently Open
            </div>
        );
        if (status === 'Pending Approval') return <Tag color="#faad14" style={{ margin: 0, fontWeight: 600, border: 'none', borderRadius: 4 }}>Pending Approval</Tag>;
        if (status === 'Suspended') return <Tag color="#8c8c8c" style={{ margin: 0, fontWeight: 600, border: 'none', borderRadius: 4 }}>Suspended</Tag>;
        return <Tag>{status}</Tag>;
    };

    const handleBulkAction = (action) => {
        if (selectedRowKeys.length === 0) {
            return message.warning('Please select at least one store first.');
        }
        message.success(`Successfully applied ${action} to ${selectedRowKeys.length} stores.`);
        setSelectedRowKeys([]);
    };

    const columns = [
        { title: 'Store ID', dataIndex: 'storeId', key: 'storeId', width: 80, align: 'center', render: text => <Text>{text}</Text> },
        { title: 'Image', dataIndex: 'image', key: 'image', width: 70, render: src => <Avatar src={src} shape="square" size={40} /> },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <Text style={{ cursor: 'pointer', color: '#1890ff' }} strong>{text}</Text>,
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Operational Areas',
            dataIndex: 'areaText',
            key: 'areaText',
            render: text => (
                <div style={{ fontSize: 12, lineHeight: '1.4' }}>
                    {text.split('\n').map((line, i) => <div key={i}><Text type={i === 0 ? "secondary" : ""}>{line}</Text></div>)}
                </div>
            )
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
            render: (text) => (
                <Space size={4}>
                    <Text style={{ color: '#1890ff', cursor: 'pointer' }}>{text}</Text>
                    <RightOutlined style={{ fontSize: 10, color: '#ff4d4f' }} />
                </Space>
            )
        },
        {
            title: 'Mange Delivery Partner',
            key: 'partners',
            align: 'center',
            render: () => <Text style={{ color: '#1890ff', cursor: 'pointer', fontSize: 13 }}>Manage Delivery Partner</Text>
        },
        {
            title: 'Joined Date',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
            render: text => <Text type="secondary" style={{ fontSize: 13 }}>{text}</Text>,
            sorter: (a, b) => new Date(a.joinedDate) - new Date(b.joinedDate)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => getStatusBadge(status)
        },
        {
            title: '',
            key: 'actions',
            width: 180,
            render: (_, record) => (
                <Space size={4}>
                    <Button size="small" onClick={() => setIsModalOpen(true)}>Edit</Button>
                    <Button size="small">Items</Button>
                    <Dropdown menu={{
                        items: [
                            { key: '1', label: 'Force Open' },
                            { key: '2', label: 'Force Close' },
                            { key: '3', label: 'Remove Override' },
                        ]
                    }} trigger={['click']}>
                        <Button size="small" icon={<MenuOutlined />} />
                    </Dropdown>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: '0 0px 24px' }}>
            {/* Upper Module Header mapping exact layout requirements */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
                <Title level={4} style={{ margin: 0, fontWeight: 700 }}>Stores Management</Title>

                <Space wrap size={16}>
                    <CustomActionBtn
                        icon={<SwapOutlined />} text={isSortView ? "Back to Table" : "Sort Stores"}
                        active={isSortView}
                        onClick={() => setIsSortView(!isSortView)}
                    />
                    <CustomActionBtn
                        icon={<ExclamationCircleOutlined />} text="Forcely Open" count={4}
                        active={filterStatus === 'Forcefully Open'}
                        onClick={() => setFilterStatus(filterStatus === 'Forcefully Open' ? 'All' : 'Forcefully Open')}
                    />
                    <CustomActionBtn
                        icon={<ExclamationCircleOutlined />} text="Forcely Close" count={18}
                        active={filterStatus === 'Forcefully Closed'}
                        onClick={() => setFilterStatus(filterStatus === 'Forcefully Closed' ? 'All' : 'Forcefully Closed')}
                    />
                    <CustomActionBtn
                        icon={<ExclamationCircleOutlined />} text="Pending Approval" count={25}
                        active={filterStatus === 'Pending Approval'}
                        onClick={() => setFilterStatus(filterStatus === 'Pending Approval' ? 'All' : 'Pending Approval')}
                    />
                    <CustomActionBtn
                        icon={<PlusOutlined />} text="Add New Store"
                        onClick={() => { form.resetFields(); setIsModalOpen(true); }}
                    />
                    <CustomActionBtn
                        icon={<UploadOutlined />} text="Bulk CSV Upload"
                        onClick={() => message.info('Trigger Bulk Upload Modal')}
                    />
                    <CustomActionBtn
                        icon={<ReloadOutlined />} text="Reset All Filters"
                        onClick={() => { setSearchText(''); setFilterStatus('All'); }}
                    />
                </Space>
            </div>

            {isSortView ? (
                <div>
                    <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Text strong style={{ fontSize: 16 }}>Total</Text>
                        <Badge count={storesData.length} style={{ backgroundColor: '#1890ff' }} />
                    </div>
                    <div style={{ background: isDarkMode ? '#141414' : '#fff', padding: 24, borderRadius: 8, border: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0' }}>
                        <Row gutter={[16, 16]}>
                            {storesData.map((store, index) => {
                                const isClosed = store.status.includes('Closed') || store.status.includes('Suspended');
                                const zoneLabel = store.areaText.includes('None') ? 'NA' : store.areaText.split('\n')[0].replace('Areas: ', '');
                                return (
                                    <Col
                                        xs={24} sm={12} md={8} xl={6}
                                        key={store.key}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                        onDragEnd={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <Card
                                            bodyStyle={{ padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}
                                            style={{ borderRadius: 6, cursor: 'grab', background: isDarkMode ? '#1f1f1f' : '#fff', borderColor: isDarkMode ? '#303030' : '#f0f0f0', boxShadow: 'none' }}
                                        >
                                            <img src={store.image} alt={store.name} style={{ width: 64, height: 64, borderRadius: 6, objectFit: 'cover' }} />
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'hidden' }}>
                                                <Text strong style={{ fontSize: 13, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{store.name}</Text>
                                                <div>
                                                    <Tag style={{ margin: 0, padding: '0 8px', borderRadius: 2, border: isDarkMode ? '1px solid #434343' : '1px solid #d9d9d9', background: 'transparent', color: isDarkMode ? '#a6a6a6' : '#595959', fontSize: 11 }}>
                                                        {zoneLabel}
                                                    </Tag>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{
                                                        width: 6, height: 6, borderRadius: '50%',
                                                        backgroundColor: isClosed ? '#ff4d4f' : '#52c41a'
                                                    }} />
                                                    <Text style={{ fontSize: 11, color: isClosed ? '#ff4d4f' : '#52c41a', fontWeight: 500 }}>
                                                        {isClosed ? 'Currently Closed' : 'Currently Open'}
                                                    </Text>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </div>
            ) : (
                <Card
                    bodyStyle={{ padding: 0 }}
                    style={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: isDarkMode ? '0 1px 2px -2px rgba(0,0,0,0.4)' : '0 1px 2px -2px rgba(0,0,0,0.05), 0 3px 6px 0 rgba(0,0,0,0.03)'
                    }}
                >
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0' }}>
                        <Input
                            placeholder="Search with anything..."
                            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                            style={{ width: 300, border: 'none', background: isDarkMode ? '#1f1f1f' : '#f5f5f5' }}
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            allowClear
                        />

                        <Space>
                            <Button icon={<FilterOutlined />} onClick={() => setIsFilterDrawerOpen(true)}>Advanced Filters</Button>
                            <Button type="default" style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }} icon={<DownloadOutlined />}>Export as CSV</Button>
                            <Select defaultValue="10" style={{ width: 70 }}>
                                <Option value="10">10</Option>
                                <Option value="25">25</Option>
                                <Option value="50">50</Option>
                                <Option value="100">100</Option>
                            </Select>
                        </Space>
                    </div>

                    {selectedRowKeys.length > 0 && (
                        <div style={{ padding: '12px 20px', background: '#e6f4ff', borderBottom: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text strong style={{ color: '#0958d9' }}>{selectedRowKeys.length} store(s) selected</Text>
                            <Space>
                                <Button size="small" type="primary" onClick={() => handleBulkAction('Force Open')} ghost>Bulk Force Open</Button>
                                <Button size="small" danger onClick={() => handleBulkAction('Force Close')}>Bulk Force Close</Button>
                                <Button size="small" onClick={() => handleBulkAction('Update Commission')}>Update Commission</Button>
                            </Space>
                        </div>
                    )}

                    <div style={{ padding: '0px 20px 20px' }}>
                        <Table
                            rowSelection={{
                                selectedRowKeys,
                                onChange: (keys) => setSelectedRowKeys(keys),
                            }}
                            columns={columns}
                            dataSource={storesData.filter(item =>
                                (filterStatus === 'All' || item.status === filterStatus) &&
                                (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                    item.owner.toLowerCase().includes(searchText.toLowerCase()) ||
                                    item.storeId.toLowerCase().includes(searchText.toLowerCase()))
                            )}
                            pagination={{ defaultPageSize: 10, showSizeChanger: false }}
                            scroll={{ x: 1200 }}
                            rowHoverable={true}
                        />
                    </div>
                </Card>
            )}

            {/* Advanced Filter Drawer */}
            <Drawer
                title="Advanced Store Filters"
                placement="right"
                onClose={() => setIsFilterDrawerOpen(false)}
                open={isFilterDrawerOpen}
                width={400}
                extra={<Button type="primary" onClick={() => setIsFilterDrawerOpen(false)}>Apply Filters</Button>}
            >
                <Form layout="vertical">
                    <Form.Item label="Operating Zone">
                        <Select mode="multiple" placeholder="Select Zones" defaultValue={['Buchireddypalem']}>
                            <Option value="Buchireddypalem">Buchireddypalem</Option>
                            <Option value="Kavali">Kavali</Option>
                            <Option value="Nellore City">Nellore City</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Store Classification">
                        <Select placeholder="Filter by type">
                            <Option value="veg">Pure Veg</Option>
                            <Option value="non-veg">Non-Veg</Option>
                            <Option value="cafe">Cafe / Beverages</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Commission Bracket (%)">
                        <Slider range defaultValue={[10, 30]} max={50} />
                    </Form.Item>
                    <Form.Item label="SLA Performance (%)">
                        <Slider range defaultValue={[80, 100]} />
                    </Form.Item>
                    <Form.Item label="Store Status">
                        <Checkbox.Group options={['Open', 'Closed', 'Pending', 'Suspended']} defaultValue={['Open']} />
                    </Form.Item>
                    <Divider />
                    <Button block onClick={() => { setIsFilterDrawerOpen(false); message.success('Filters cleared.'); }}>Clear All</Button>
                </Form>
            </Drawer>

            {/* Ultra Professional Store Add/Edit Modal */}
            <Modal
                title={
                    <Space>
                        <ShopOutlined style={{ color: '#1890ff', fontSize: 20 }} />
                        <Text strong style={{ fontSize: 18 }}>Create / Edit Store Operations</Text>
                    </Space>
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width={900}
                footer={[
                    <Button key="draft" onClick={() => setIsModalOpen(false)}>Save as Draft</Button>,
                    <Button key="submit" type="primary" onClick={() => { message.success('Store configuration saved successfully.'); setIsModalOpen(false); }}>
                        Verify & Save
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
                    <Tabs defaultActiveKey="1" tabPosition="left">

                        <TabPane tab={<span><SettingOutlined /> Basic Info</span>} key="1">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Store Name" name="name" rules={[{ required: true }]}>
                                        <Input placeholder="E.g. Buchi Biryani Point" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Owner Name" name="owner" rules={[{ required: true }]}>
                                        <Input placeholder="E.g. Venkatesh Rao" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Owner Contact Number" name="mobile">
                                        <Input placeholder="+91 999999999" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Operating Zone (Geo-fencing)" name="zone">
                                        <Select mode="multiple" placeholder="Allocate Zones">
                                            <Option value="z1">Buchireddypalem Town</Option>
                                            <Option value="z2">Jonnawada Route</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="Full Store Address" name="address">
                                <Input.TextArea rows={2} placeholder="Complete physical address for mapping..." />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item label="Opening Time" name="openTime">
                                        <TimePicker use12Hours format="h:mm a" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Closing Time" name="closeTime">
                                        <TimePicker use12Hours format="h:mm a" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Delivery Radius Limit (km)" name="radius">
                                        <InputNumber min={1} max={50} style={{ width: '100%' }} placeholder="E.g. 5" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><DollarOutlined /> Revenue Options</span>} key="2">
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="Commission Category Override (%)" name="commission" extra="Leave 0 for default category commission">
                                        <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="E.g. 15%" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Sales Tax / GST Applied (%)" name="tax">
                                        <InputNumber min={0} max={40} style={{ width: '100%' }} placeholder="E.g. 5%" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="Minimum Order Value (₹)" name="minOrder" extra="Order cannot be placed below this threshold">
                                        <InputNumber min={0} style={{ width: '100%' }} placeholder="E.g. ₹99" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Platform Fee Override (₹)" name="platformFee">
                                        <InputNumber min={0} style={{ width: '100%' }} placeholder="Applies globally if 0" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider />
                            <Form.Item label="Automated Payout Cycle">
                                <Select defaultValue="weekly">
                                    <Option value="daily">Daily Settlements</Option>
                                    <Option value="weekly">Weekly Settlements</Option>
                                    <Option value="monthly">Monthly Settlements</Option>
                                </Select>
                            </Form.Item>
                        </TabPane>

                        <TabPane tab={<span><ClockCircleOutlined /> Automations</span>} key="3">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: isDarkMode ? '#1f1f1f' : '#fafafa', borderRadius: 8 }}>
                                    <div>
                                        <Text strong>Auto-Accept Incoming Orders</Text>
                                        <div style={{ fontSize: 13 }} className="text-secondary">Vendor app automatically accepts within 60 seconds of ping.</div>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: isDarkMode ? '#1f1f1f' : '#fafafa', borderRadius: 8 }}>
                                    <div>
                                        <Text strong>Auto Disable on High Cancellation</Text>
                                        <div style={{ fontSize: 13 }} className="text-secondary">Triggers if live order cancellation hits SLA threshold set below.</div>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: isDarkMode ? '#1f1f1f' : '#fafafa', borderRadius: 8 }}>
                                    <div>
                                        <Text strong>Priority Surge Listing</Text>
                                        <div style={{ fontSize: 13 }} className="text-secondary">Allow store to participate in weather/event based surge deliveries.</div>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                            <Row style={{ marginTop: 24 }}>
                                <Col span={24}>
                                    <Form.Item label="Standard Prep SLA Limit (Mins)" name="prepTime">
                                        <InputNumber min={5} max={120} style={{ width: '100%' }} placeholder="E.g. 15 Mins" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><SafetyCertificateOutlined /> Documents (KYC)</span>} key="4">
                            <div style={{ marginBottom: 24 }}>
                                <Text strong>FSSAI Registration Document</Text>
                                <Upload.Dragger accept=".pdf,.jpg,.png" maxCount={1} style={{ marginTop: 8 }}>
                                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                    <p className="ant-upload-text">Click or drag FSSAI certificate to this area</p>
                                </Upload.Dragger>
                            </div>
                            <div>
                                <Text strong>Store Owner PAN Card</Text>
                                <Upload maxCount={1}>
                                    <Button icon={<UploadOutlined />} style={{ marginTop: 8 }}>Upload Owner PAN</Button>
                                </Upload>
                            </div>
                        </TabPane>

                    </Tabs>
                </Form>
            </Modal>

        </div>
    );
};
