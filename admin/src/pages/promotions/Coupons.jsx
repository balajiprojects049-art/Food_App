import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Typography, Modal,
    Form, Select, DatePicker, InputNumber, Checkbox, message, Badge, Tooltip, Dropdown
} from 'antd';
import {
    SearchOutlined, PlusOutlined, EditOutlined, MoreOutlined, DownloadOutlined, ReloadOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { mockCoupons, mockRewards, mockRewardClaims } from './promotionsData';

const { Text } = Typography;
const { Option } = Select;

// ─── Coupons ──────────────────────────────────────────────────────────────────
export const Coupons = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockCoupons);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const [form] = Form.useForm();

    const filtered = data.filter(d =>
        !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.code.toLowerCase().includes(search.toLowerCase()) || d.store.toLowerCase().includes(search.toLowerCase())
    );

    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const openAdd = () => { setEditRecord(null); form.resetFields(); setModalOpen(true); };
    const openEdit = (r) => { setEditRecord(r); form.setFieldsValue({ name: r.name, code: r.code, discount: r.discount, type: r.type, minSubtotal: r.minSubtotal }); setModalOpen(true); };

    const handleSave = () => {
        form.validateFields().then(vals => {
            if (editRecord) {
                setData(prev => prev.map(d => d.key === editRecord.key ? { ...d, ...vals } : d));
                message.success('Coupon updated!');
            } else {
                const newCoupon = { ...vals, key: String(Date.now()), status: 'Active', usage: 0, expiryStatus: 'Active', maxDiscount: 'NA' };
                setData(prev => [...prev, newCoupon]);
                message.success('Coupon created!');
            }
            setModalOpen(false);
            form.resetFields();
        });
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', render: t => <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Coupon Applicable Store', dataIndex: 'store', key: 'store',
            render: t => <Tag style={{ whiteSpace: 'nowrap', borderRadius: 3, fontSize: 11, color: '#096dd9', background: '#e6f4ff', border: '1px solid #91caff' }}>{t}</Tag>
        },
        { title: 'Code', dataIndex: 'code', key: 'code', render: t => <Text strong style={{ fontFamily: 'monospace', whiteSpace: 'nowrap', color: '#262626' }}>{t}</Text> },
        {
            title: 'Type', dataIndex: 'type', key: 'type',
            render: t => <Tag style={{ whiteSpace: 'nowrap', borderRadius: 3, fontWeight: 600, fontSize: 11, color: t === 'PERCENTAGE' ? '#531dab' : '#096dd9', background: t === 'PERCENTAGE' ? '#f9f0ff' : '#e6f4ff', border: `1px solid ${t === 'PERCENTAGE' ? '#d3adf7' : '#91caff'}` }}>{t}</Tag>
        },
        {
            title: 'Discount', key: 'discount',
            render: (_, r) => <Text strong>₹ {r.discount}{r.type === 'PERCENTAGE' ? '%' : ''}</Text>
        },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: s => <Tag style={{ whiteSpace: 'nowrap', borderRadius: 3, fontWeight: 600, fontSize: 11, color: '#237804', background: '#f6ffed', border: '1px solid #73d13d' }}>{s}</Tag>
        },
        { title: 'Usage', dataIndex: 'usage', key: 'usage', render: v => <Tag style={{ borderRadius: 3, fontWeight: 600 }}>{v}</Tag> },
        {
            title: 'Expiry Date', key: 'expiry',
            render: (_, r) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ color: '#cf1322', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{r.expiryStatus}</Text>
                    <Text type="secondary" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{r.expiryDate}</Text>
                </Space>
            )
        },
        { title: 'Min Subtotal', dataIndex: 'minSubtotal', key: 'minSubtotal', render: v => <Text style={{ whiteSpace: 'nowrap' }}>{v}.00</Text> },
        { title: 'Max Discount', dataIndex: 'maxDiscount', key: 'maxDiscount', render: v => <Text type={v === 'NA' ? 'secondary' : undefined} style={{ whiteSpace: 'nowrap' }}>{v}</Text> },
        {
            title: '', key: 'actions', width: 80,
            render: (_, r) => <Button type="primary" size="small" style={{ borderRadius: 4, fontSize: 12 }} icon={<EditOutlined />} onClick={() => openEdit(r)}>Edit</Button>
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Space size={8} align="center">
                    <Text style={{ fontWeight: 700, fontSize: 16 }}>Total</Text>
                    <Tooltip><span style={{ width: 20, height: 20, borderRadius: '50%', background: '#d9d9d9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#595959', fontWeight: 700 }}>i</span></Tooltip>
                    <Text strong style={{ fontSize: 16 }}>{data.length} Coupons</Text>
                </Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Add New Coupon</Button>
            </div>

            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '12px 20px', borderBottom: borderStyle }}>
                    <Input placeholder="Search coupons..." prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ width: 260, border: 'none', background: isDarkMode ? '#1f1f1f' : '#f5f5f5', borderRadius: 6 }}
                        value={search} onChange={e => setSearch(e.target.value)} allowClear />
                </div>
                <div style={{ padding: '0 20px 20px' }}>
                    <Table columns={columns} dataSource={filtered} pagination={{ defaultPageSize: 10, showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
                </div>
            </Card>

            {/* Add/Edit Coupon Modal */}
            <Modal
                title={<Text strong>{editRecord ? 'Edit Coupon' : 'Add New Coupon'}</Text>}
                open={modalOpen} onCancel={() => { setModalOpen(false); form.resetFields(); }} width={560}
                footer={[
                    <Button key="cancel" onClick={() => { setModalOpen(false); form.resetFields(); }}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={handleSave}>{editRecord ? 'Update Coupon' : 'Create Coupon'}</Button>
                ]}>
                <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
                    <Form.Item label="Coupon Name" name="name" rules={[{ required: true, message: 'Required' }]}>
                        <Input placeholder="Coupon Name" />
                    </Form.Item>
                    <Form.Item label="Coupon Description" name="description">
                        <Input placeholder="Coupon Description" />
                    </Form.Item>
                    <Form.Item label="Coupon Code" name="code" rules={[{ required: true, message: 'Required' }]}>
                        <Input placeholder="Coupon Code" style={{ fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase' }} />
                    </Form.Item>
                    <Form.Item label="Discount Type" name="type" rules={[{ required: true }]} initialValue="AMOUNT">
                        <Select>
                            <Option value="AMOUNT">Fixed Amount Discount</Option>
                            <Option value="PERCENTAGE">Percentage Discount</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Coupon Discount" name="discount" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} placeholder="Coupon Discount" min={0} />
                    </Form.Item>
                    <Form.Item label="Expiry Date" name="expiryDate" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Coupon Applicable Stores" name="store" rules={[{ required: true }]}>
                        <Select mode="multiple" placeholder="Select stores...">
                            <Option value="Red Box Fast Foods">Red Box Fast Foods</Option>
                            <Option value="Andhra Dairy">Andhra Dairy</Option>
                            <Option value="Multiple Stores">Multiple Stores</Option>
                            <Option value="Hello Habibi">Hello Habibi</Option>
                            <Option value="Buchi Biryani">Buchi Biryani</Option>
                            <Option value="Jana Family Dhaba">Jana Family Dhaba</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="allStores" valuePropName="checked">
                        <Checkbox>Select All Stores</Checkbox>
                    </Form.Item>
                    <Form.Item label="Max number of use in total" name="maxUse" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} placeholder="Max number of use" min={1} />
                    </Form.Item>
                    <Form.Item label="Min Subtotal" name="minSubtotal">
                        <InputNumber style={{ width: '100%' }} placeholder="Min subtotal required for coupon in ₹" min={0} />
                    </Form.Item>
                    <Form.Item label="Subtotal not reached message" name="subtotalMsg">
                        <Input placeholder="Enter message when subtotal not reached..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// ─── Rewards ──────────────────────────────────────────────────────────────────
export const Rewards = () => {
    const { isDarkMode } = useTheme();
    const [data] = useState(mockRewards);
    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };

    const levelColor = { Gold: '#d4b106', Silver: '#8c8c8c', Bronze: '#d46b08', Platinum: '#531dab' };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', render: v => <Text type="secondary" style={{ fontSize: 12 }}>{v}</Text> },
        { title: 'Level', dataIndex: 'level', key: 'level', render: l => <Tag style={{ fontWeight: 700, borderRadius: 3, color: levelColor[l], background: `${levelColor[l]}18`, border: `1px solid ${levelColor[l]}44`, whiteSpace: 'nowrap' }}>{l}</Tag> },
        { title: 'Name', dataIndex: 'name', key: 'name', render: t => <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Type', dataIndex: 'type', key: 'type', render: t => <Text style={{ whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Points Required', dataIndex: 'pointsRequired', key: 'pointsRequired', sorter: (a, b) => a.pointsRequired - b.pointsRequired, render: v => <Text strong style={{ color: '#722ed1', whiteSpace: 'nowrap' }}>⭐ {v}</Text> },
        { title: 'Value', dataIndex: 'value', key: 'value', render: v => <Text strong style={{ color: '#237804', whiteSpace: 'nowrap' }}>{v}</Text> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => <Tag style={{ whiteSpace: 'nowrap', borderRadius: 3, fontWeight: 600, fontSize: 11, color: s === 'Active' ? '#237804' : '#8c8c8c', background: s === 'Active' ? '#f6ffed' : '#f5f5f5', border: `1px solid ${s === 'Active' ? '#73d13d' : '#d9d9d9'}` }}>{s}</Tag> },
        { title: 'Repeatable', dataIndex: 'repeatable', key: 'repeatable', render: v => <Tag style={{ borderRadius: 3, fontSize: 11, fontWeight: 600, color: v ? '#096dd9' : '#8c8c8c', background: v ? '#e6f4ff' : '#f5f5f5', border: `1px solid ${v ? '#91caff' : '#d9d9d9'}` }}>{v ? 'Yes' : 'No'}</Tag> },
        { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'End Date', dataIndex: 'endDate', key: 'endDate', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Actions', key: 'actions', width: 80,
            render: () => <Button size="small" style={{ borderRadius: 4, fontSize: 12 }} icon={<EditOutlined />}>Edit</Button>
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>REWARDS MANAGEMENT</Text>
                <Button type="primary" icon={<PlusOutlined />}>Add New Reward</Button>
            </div>
            <Card style={cardBg} bodyStyle={{ padding: '20px 20px' }}>
                <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
            </Card>
        </div>
    );
};

// ─── Reward Claims ────────────────────────────────────────────────────────────
export const RewardClaims = () => {
    const { isDarkMode } = useTheme();
    const [data, setData] = useState(mockRewardClaims);
    const [statusFilter, setStatusFilter] = useState('All');
    const cardBg = { borderRadius: 8, border: 'none', boxShadow: isDarkMode ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' };
    const borderStyle = isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0';

    const filtered = statusFilter === 'All' ? data : data.filter(d => d.status === statusFilter);

    const statusMeta = {
        Pending: { color: '#d46b08', bg: '#fff7e6', border: '#ffd591' },
        Processed: { color: '#237804', bg: '#f6ffed', border: '#73d13d' },
        Rejected: { color: '#cf1322', bg: '#fff1f0', border: '#ffa39e' },
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', render: v => <Text type="secondary">{v}</Text> },
        { title: 'Request ID', dataIndex: 'requestId', key: 'requestId', render: t => <Text style={{ color: '#1890ff', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'User', dataIndex: 'user', key: 'user', render: t => <Text style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Reward', dataIndex: 'reward', key: 'reward', render: t => <Text style={{ whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Points', dataIndex: 'points', key: 'points', render: v => <Text strong style={{ color: '#722ed1', whiteSpace: 'nowrap' }}>⭐ {v}</Text> },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: s => { const m = statusMeta[s] || { color: '#595959', bg: '#f5f5f5', border: '#d9d9d9' }; return <Tag style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}`, borderRadius: 3, fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap' }}>{s}</Tag>; }
        },
        { title: 'Submitted', dataIndex: 'submitted', key: 'submitted', render: t => <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        { title: 'Processed', dataIndex: 'processed', key: 'processed', render: t => <Text type={t === '—' ? 'secondary' : undefined} style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</Text> },
        {
            title: 'Actions', key: 'actions', width: 160,
            render: (_, r) => (
                <Space size={4}>
                    {r.status === 'Pending' && <>
                        <Button size="small" type="primary" style={{ borderRadius: 4, fontSize: 12 }} onClick={() => setData(prev => prev.map(d => d.key === r.key ? { ...d, status: 'Processed', processed: 'Just now' } : d))}>Approve</Button>
                        <Button size="small" danger style={{ borderRadius: 4, fontSize: 12 }} onClick={() => setData(prev => prev.map(d => d.key === r.key ? { ...d, status: 'Rejected', processed: 'Just now' } : d))}>Reject</Button>
                    </>}
                    {r.status !== 'Pending' && <Button size="small" style={{ borderRadius: 4, fontSize: 12 }}>View</Button>}
                </Space>
            )
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>REWARD CLAIMS MANAGEMENT</Text>
                <Button icon={<DownloadOutlined />} style={{ background: '#e6f4ff', borderColor: '#91caff', color: '#0958d9' }}>Export CSV</Button>
            </div>
            <Card style={cardBg} bodyStyle={{ padding: 0 }}>
                <div style={{ padding: '12px 20px', borderBottom: borderStyle }}>
                    <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 180 }}>
                        <Option value="All">All Status</Option>
                        <Option value="Pending">Pending</Option>
                        <Option value="Processed">Processed</Option>
                        <Option value="Rejected">Rejected</Option>
                    </Select>
                </div>
                <div style={{ padding: '0 20px 20px' }}>
                    <Table columns={columns} dataSource={filtered} pagination={{ defaultPageSize: 10, showTotal: (t, r) => `Showing ${r[0]}-${r[1]} of ${t}` }} scroll={{ x: 'max-content' }} rowHoverable size="middle" />
                </div>
            </Card>
        </div>
    );
};
