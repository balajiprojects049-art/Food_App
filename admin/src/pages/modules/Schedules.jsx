import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Typography, Switch, Modal, Form, Input, InputNumber, Select, TimePicker, message, Tooltip, Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ClockCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockTimeSlots, mockRadiusSchedules, mockPayoutSchedules } from './modulesData';
import dayjs from 'dayjs';

const { Text } = Typography;
const { Option } = Select;

// ─── Pickup & Drop Settings ────────────────────────────────────────────────────
export const PickupDropSettings = () => {
    const { isDarkMode } = useTheme();
    const [pickupEnabled, setPickupEnabled] = useState(true);
    const [chargeType, setChargeType] = useState('Dynamic Charge');

    const tasks = ['Documents', 'Tools', 'Goods', 'Lunch Box', 'Bike Taxi', 'Printing', 'Task Name 7', 'Task Name 8', 'Task Name 9', 'Task Name 10'];
    const taskIcons = ['📄', '🔧', '📦', '🍱', '🛵', '🖨️', '⊞', '⊞', '⊞', '⊞'];

    const cardBg = {
        borderRadius: 8, border: isDarkMode ? '1px solid #303030' : '1px solid #e8e8e8',
        boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
        marginBottom: 20,
    };
    const inputStyle = { width: '100%', borderRadius: 6 };
    const labelStyle = { display: 'block', marginBottom: 8, fontWeight: 500, fontSize: 13 };
    const rowStyle = { display: 'flex', gap: 16, borderBottom: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0', paddingBottom: 16, marginBottom: 16, alignItems: 'center' };

    return (
        <div style={{ paddingBottom: 24 }}>
            <Text style={{ fontWeight: 700, fontSize: 16, display: 'block', marginBottom: 20 }}>Pickup &amp; Drop</Text>
            <Card style={cardBg} bodyStyle={{ padding: 24 }}>
                <Text strong style={{ fontSize: 15, display: 'block', marginBottom: 20 }}>Pickup &amp; Drop</Text>

                <div style={rowStyle}>
                    <Text style={{ ...labelStyle, marginBottom: 0, width: 220 }}>Pickup &amp; Drop</Text>
                    <Switch checked={pickupEnabled} onChange={setPickupEnabled} />
                </div>
                <div style={rowStyle}>
                    <Text style={{ ...labelStyle, marginBottom: 0, width: 220 }}>Name</Text>
                    <Input defaultValue="Pickups" style={{ ...inputStyle, maxWidth: 400 }} />
                </div>

                <Divider style={{ margin: '16px 0' }} />
                <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>Delivery Settings</Text>

                <div style={rowStyle}>
                    <Text style={{ ...labelStyle, marginBottom: 0, width: 220 }}>Max Allowed Distance (in km)</Text>
                    <InputNumber defaultValue={15} style={{ maxWidth: 400, width: '100%' }} />
                </div>
                <div style={rowStyle}>
                    <Text style={{ ...labelStyle, marginBottom: 0, width: 220 }}>Delivery Charge Type</Text>
                    <Select value={chargeType} onChange={setChargeType} style={{ maxWidth: 400, width: '100%' }}>
                        <Option value="Dynamic Charge">Dynamic Charge</Option>
                        <Option value="Fixed Charge">Fixed Charge</Option>
                    </Select>
                </div>

                {chargeType === 'Dynamic Charge' && (
                    <div style={{ background: isDarkMode ? '#141414' : '#fafafa', border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`, borderRadius: 6, padding: 16, marginBottom: 16 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 8 }}>
                            {['Base Delivery Charge', 'Base Delivery Distance', 'Extra Delivery Charge', 'Extra Delivery Distance'].map((label, i) => (
                                <div key={i}>
                                    <Text style={{ ...labelStyle, fontSize: 12, color: '#8c8c8c' }}>{label}</Text>
                                    <InputNumber defaultValue={i === 0 ? 20 : i === 1 ? 1 : i === 2 ? 10 : 1} style={{ width: '100%' }} />
                                </div>
                            ))}
                        </div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Base delivery charges will be applied to the base delivery distance. And for every extra delivery distance, extra delivery charge will be applied.</Text>
                    </div>
                )}

                <Divider style={{ margin: '16px 0' }} />
                <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 16 }}>Tasks</Text>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {tasks.map((task, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`, borderRadius: 6 }}>
                            <span style={{ fontSize: 18, width: 24 }}>{taskIcons[i]}</span>
                            <Input defaultValue={task} style={{ flex: 1 }} />
                            <Button size="small" style={{ borderRadius: 4, fontSize: 11, whiteSpace: 'nowrap' }}>Choose Task Icon</Button>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 20, textAlign: 'right' }}>
                    <Button type="primary" size="large" style={{ borderRadius: 6, paddingLeft: 28, paddingRight: 28 }} onClick={() => message.success('Settings saved!')}>SAVE DETAILS</Button>
                </div>
            </Card>
        </div>
    );
};

// ─── Delivery Time Slots ───────────────────────────────────────────────────────
export const DeliveryTimeSlots = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockTimeSlots);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [form] = Form.useForm();

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const filtered = data.filter(d => !search || d.title.toLowerCase().includes(search.toLowerCase()));

    const handleSave = () => {
        form.validateFields().then(vals => {
            const s = vals.startTime ? dayjs(vals.startTime).format('HH:mm') : '--:--';
            const e = vals.endTime ? dayjs(vals.endTime).format('HH:mm') : '--:--';
            const l = vals.lastOrderTime ? dayjs(vals.lastOrderTime).format('HH:mm') : '--:--';
            const title = `${s} to ${e}`;
            setData(prev => [...prev, { key: String(Date.now()), id: prev.length + 1, title, adminLabel: vals.adminLabel, startTime: s, endTime: e, lastOrderTime: l, createdAt: 'Just now' }]);
            message.success('Time slot created!');
            setModalOpen(false);
            form.resetFields();
        });
    };

    const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title', render: t => <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Admin Title', dataIndex: 'adminLabel', key: 'adminLabel', render: t => <Text style={{ whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Start Time', dataIndex: 'startTime', key: 'startTime', render: t => <Tag icon={<ClockCircleOutlined />} style={{ borderRadius: 3, fontWeight: 600, fontSize: 11, color: '#237804', background: '#f6ffed', border: '1px solid #73d13d', whiteSpace: 'nowrap' }}>{t}</Tag> },
        { title: 'End Time', dataIndex: 'endTime', key: 'endTime', render: t => <Tag icon={<ClockCircleOutlined />} style={{ borderRadius: 3, fontWeight: 600, fontSize: 11, color: '#cf1322', background: '#fff1f0', border: '1px solid #ffa39e', whiteSpace: 'nowrap' }}>{t}</Tag> },
        { title: 'Last Order Time', dataIndex: 'lastOrderTime', key: 'lastOrderTime', render: t => <Tag style={{ borderRadius: 3, fontWeight: 600, fontSize: 11, color: '#d46b08', background: '#fff7e6', border: '1px solid #ffd591', whiteSpace: 'nowrap' }}>{t}</Tag> },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: '', key: 'actions', width: 100,
            render: (_, r) => (
                <Space size={4}>
                    <Button size="small" style={{ borderRadius: 4, fontSize: 12 }} icon={<EditOutlined />}>Edit</Button>
                    <Switch size="small" defaultChecked />
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Space size={8}>
                    <Text style={{ fontWeight: 700, fontSize: 16 }}>TOTAL</Text>
                    <Tooltip><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700 }}>i</span></Tooltip>
                    <Text strong style={{ fontSize: 16 }}>{data.length} Delivery Time Slots</Text>
                </Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setModalOpen(true); }}>Add New Delivery Time Slot</Button>
            </div>
            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '12px 20px', borderBottom: borderStyle }}>
                    <Input placeholder="Search with delivery time slot title..." value={search} onChange={e => setSearch(e.target.value)} allowClear style={{ width: 300, background: isDarkMode ? '#1f1f1f' : '#f5f5f5', border: 'none', borderRadius: 6 }} />
                </div>
                <div style={{ padding: '0 20px 20px' }}>
                    <Table columns={columns} dataSource={filtered} pagination={false} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
                </div>
            </Card>

            <Modal title={<Text strong>Add New Delivery Time Slot</Text>} open={modalOpen} onCancel={() => { setModalOpen(false); form.resetFields(); }} width={520}
                footer={[
                    <Button key="save" type="primary" onClick={handleSave}>SAVE</Button>
                ]}>
                <Form form={form} layout="vertical" style={{ marginTop: 12 }}>
                    <Form.Item label={<Text strong>*Title:</Text>} name="title" rules={[{ required: true }]}>
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item label={<Text strong>*Admin Label:</Text>} name="adminLabel" rules={[{ required: true }]}>
                        <Input placeholder="Admin Label" />
                    </Form.Item>
                    <Form.Item label={<Text strong>*Start Time:</Text>} name="startTime" rules={[{ required: true }]}>
                        <TimePicker style={{ width: '100%' }} format="HH:mm" />
                    </Form.Item>
                    <Form.Item label={<Text strong>*End Time:</Text>} name="endTime" rules={[{ required: true }]}>
                        <TimePicker style={{ width: '100%' }} format="HH:mm" />
                    </Form.Item>
                    <Form.Item label={<Text strong>*Last Order Time:</Text>} name="lastOrderTime" rules={[{ required: true }]}>
                        <TimePicker style={{ width: '100%' }} format="HH:mm" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// ─── Delivery Radius Schedules ─────────────────────────────────────────────────
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const DeliveryRadiusSchedules = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockRadiusSchedules);
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [daySlots, setDaySlots] = useState(DAYS.reduce((acc, d) => ({ ...acc, [d]: [] }), {}));

    const addSlot = (day) => setDaySlots(prev => ({ ...prev, [day]: [...prev[day], { opening: '', closing: '', radius: '' }] }));
    const applyToAll = (day) => {
        if (daySlots[day].length === 0) return;
        const slots = daySlots[day];
        setDaySlots(prev => DAYS.reduce((acc, d) => ({ ...acc, [d]: [...slots] }), {}));
        message.success('Applied to all days!');
    };

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };

    const handleSave = () => {
        form.validateFields().then(vals => {
            setData(prev => [...prev, { key: String(Date.now()), id: prev.length + 1, name: vals.name, description: vals.description || '', status: 'Active', restaurants: 0, createdAt: 'Just now' }]);
            message.success('Schedule created!');
            setModalOpen(false);
            form.resetFields();
            setDaySlots(DAYS.reduce((acc, d) => ({ ...acc, [d]: [] }), {}));
        });
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', render: t => <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => <Tag style={{ borderRadius: 3, fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap', color: s === 'Active' ? '#237804' : '#8c8c8c', background: s === 'Active' ? '#f6ffed' : '#f5f5f5', border: `1px solid ${s === 'Active' ? '#73d13d' : '#d9d9d9'}` }}>{s}</Tag> },
        { title: 'Description', dataIndex: 'description', key: 'description', render: t => <Text style={{ fontSize: 13 }}>{t || '—'}</Text> },
        { title: 'Restaurants', dataIndex: 'restaurants', key: 'restaurants', render: v => <Tag style={{ borderRadius: 3, fontWeight: 600 }}>{v}</Tag> },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Actions', key: 'actions', width: 80,
            render: () => <Button size="small" style={{ borderRadius: 4, fontSize: 12 }} icon={<EditOutlined />}>Edit</Button>
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Space size={8}>
                    <Text style={{ fontWeight: 700, fontSize: 16 }}>TOTAL</Text>
                    <Tooltip><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700 }}>i</span></Tooltip>
                    <Text strong style={{ fontSize: 16 }}>{data.length} Delivery Radius Schedules</Text>
                </Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setModalOpen(true); setDaySlots(DAYS.reduce((acc, d) => ({ ...acc, [d]: [] }), {})); }}>Add New Schedule</Button>
            </div>
            <Card style={cardBg} bodyStyle={{ padding: 20 }}>
                <div style={{ padding: '0 0 12px', marginBottom: 12 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        <span style={{ color: '#1890ff', marginRight: 4 }}>Workflow:</span>
                        Create schedules with Mon-Sun time slots + radius. Assign to stores in Store Edit.
                    </Text>
                </div>
                <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
            </Card>

            <Modal title={<Text strong>Add New Delivery Radius Schedule</Text>} open={modalOpen} onCancel={() => { setModalOpen(false); form.resetFields(); }} width={680}
                style={{ top: 20 }}
                footer={[
                    <Button key="cancel" onClick={() => { setModalOpen(false); form.resetFields(); }}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>SAVE</Button>
                ]}>
                <Form form={form} layout="vertical" style={{ marginTop: 12 }}>
                    <Form.Item label="Name:" name="name" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Standard Radius Schedule" />
                    </Form.Item>
                    <Form.Item label="Description:" name="description">
                        <Input placeholder="Optional description" />
                    </Form.Item>
                </Form>

                <Divider>
                    <Text style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 600 }}>TIME SLOTS WITH DELIVERY RADIUS (MON-SUN)</Text>
                </Divider>
                <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>Each slot: Opening time, Closing time, Radius (km). Assign to stores in Store Edit.</Text>

                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <Text style={{ flex: 1, fontWeight: 600, fontSize: 12 }}>Opening</Text>
                    <Text style={{ flex: 1, fontWeight: 600, fontSize: 12 }}>Closing</Text>
                    <Text style={{ flex: 1, fontWeight: 600, fontSize: 12 }}>Radius (km)</Text>
                </div>

                <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                    {DAYS.map(day => (
                        <div key={day} style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <Text strong style={{ fontSize: 15 }}>{day}</Text>
                                {day === 'Monday' && (
                                    <Button size="small" type="primary" style={{ background: '#13c2c2', borderColor: '#13c2c2', borderRadius: 4, fontSize: 12 }} onClick={() => applyToAll(day)}>Apply to all days</Button>
                                )}
                            </div>
                            {daySlots[day].map((_, i) => (
                                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                                    <TimePicker style={{ flex: 1 }} format="HH:mm" size="small" />
                                    <TimePicker style={{ flex: 1 }} format="HH:mm" size="small" />
                                    <InputNumber style={{ flex: 1 }} placeholder="km" size="small" min={0} />
                                </div>
                            ))}
                            <Button size="small" icon={<PlusOutlined />} style={{ borderRadius: 4, fontSize: 12, marginTop: 4 }} onClick={() => addSlot(day)}>Add Slot</Button>
                            <Divider style={{ margin: '12px 0 0' }} />
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

// ─── Payout Schedules ──────────────────────────────────────────────────────────
export const PayoutSchedules = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockPayoutSchedules);
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };

    const handleSave = () => {
        form.validateFields().then(vals => {
            setData(prev => [...prev, { ...vals, key: String(Date.now()), id: prev.length + 1, status: 'Active', createdAt: 'Just now' }]);
            message.success('Payout schedule created!');
            setModalOpen(false);
            form.resetFields();
        });
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', render: t => <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => <Tag style={{ borderRadius: 3, fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap', color: s === 'Active' ? '#237804' : '#8c8c8c', background: s === 'Active' ? '#f6ffed' : '#f5f5f5', border: `1px solid ${s === 'Active' ? '#73d13d' : '#d9d9d9'}` }}>{s}</Tag> },
        { title: 'Description', dataIndex: 'description', key: 'description', render: t => <Text style={{ fontSize: 13 }}>{t}</Text> },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Actions', key: 'actions', width: 80,
            render: () => <Button size="small" style={{ borderRadius: 4, fontSize: 12 }} icon={<EditOutlined />}>Edit</Button>
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>PAYOUT SCHEDULES</Text>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setModalOpen(true); }}>Add New Schedule</Button>
            </div>
            <Card style={cardBg} bodyStyle={{ padding: 20 }}>
                <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
            </Card>

            <Modal title={<Text strong>Add New Payout Schedule</Text>} open={modalOpen} onCancel={() => { setModalOpen(false); form.resetFields(); }} width={480}
                footer={[
                    <Button key="cancel" onClick={() => { setModalOpen(false); form.resetFields(); }}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>SAVE</Button>
                ]}>
                <Form form={form} layout="vertical" style={{ marginTop: 12 }}>
                    <Form.Item label="Name:" name="name" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Weekly Payout" />
                    </Form.Item>
                    <Form.Item label="Description:" name="description">
                        <Input placeholder="Optional description" />
                    </Form.Item>
                    <Form.Item label="Cycle:" name="cycle" rules={[{ required: true }]}>
                        <Select placeholder="Select payout cycle">
                            <Option value="daily">Daily</Option>
                            <Option value="weekly">Weekly</Option>
                            <Option value="monthly">Monthly</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
